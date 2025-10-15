<template>
  <div class="admin-page">
    <div class="page-header">
      <h1>Admin Dashboard</h1>
      <p>Activity Management Panel</p>
    </div>

    <!-- Activity Management -->
    <div class="activity-management">
      <div class="section-header">
        <h2>Activity Management</h2>
        <button class="export-btn" @click="exportToCSV">
          📊 Export CSV
        </button>
      </div>
      
      <div class="filter-section">
        <div class="filter-options">
          <select v-model="selectedCategory" class="filter-select" @change="resetPagination">
            <option value="">All Categories</option>
            <option value="sports">Sports</option>
            <option value="fitness">Fitness</option>
            <option value="outdoor">Outdoor</option>
            <option value="social">Social</option>
            <option value="educational">Educational</option>
          </select>
          
          <select v-model="selectedStatus" class="filter-select" @change="resetPagination">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <!-- Activity List -->
      <div class="activity-list">
        <div v-if="filteredActivities.length === 0" class="no-results">
          <div class="no-results-icon">🎯</div>
          <p>No activities found</p>
        </div>
        
        <div v-else>
          <div class="table-info">
            <p>{{ paginationInfo }}</p>
          </div>
          
          <div class="activity-table">
            <table>
              <thead>
                <tr>
                  <th>Activity Name</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Participants</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="activity in paginatedActivities" :key="activity.id">
                  <td>{{ activity.name }}</td>
                  <td>{{ activity.category }}</td>
                  <td>{{ activity.location }}</td>
                  <td>{{ activity.date }}</td>
                  <td>{{ activity.participants }}/{{ activity.maxParticipants }}</td>
                  <td>
                    <span class="activity-status" :class="activity.status">{{ activity.status }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination -->
          <div class="pagination" v-if="totalPages > 1">
            <button 
              class="pagination-btn" 
              @click="prevPage" 
              :disabled="currentPage === 1"
            >
              ← Previous
            </button>
            
            <div class="pagination-pages">
              <button 
                v-for="page in totalPages" 
                :key="page"
                class="pagination-page"
                :class="{ active: page === currentPage }"
                @click="goToPage(page)"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              class="pagination-btn" 
              @click="nextPage" 
              :disabled="currentPage === totalPages"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Filter states
const selectedCategory = ref('')
const selectedStatus = ref('')

// Pagination states
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Sample activities data (in real app, this would come from API)
const activities = ref([
  {
    id: '1',
    name: 'Morning Yoga Class',
    category: 'fitness',
    location: 'Central Park',
    date: '2024-01-15',
    participants: 12,
    maxParticipants: 20,
    status: 'active'
  },
  {
    id: '2',
    name: 'Basketball Tournament',
    category: 'sports',
    location: 'Sports Complex',
    date: '2024-01-20',
    participants: 16,
    maxParticipants: 16,
    status: 'active'
  },
  {
    id: '3',
    name: 'Hiking Adventure',
    category: 'outdoor',
    location: 'Mountain Trail',
    date: '2024-01-18',
    participants: 8,
    maxParticipants: 15,
    status: 'pending'
  },
  {
    id: '4',
    name: 'Book Club Meeting',
    category: 'educational',
    location: 'Library',
    date: '2024-01-12',
    participants: 6,
    maxParticipants: 10,
    status: 'completed'
  },
  {
    id: '5',
    name: 'Swimming Training',
    category: 'fitness',
    location: 'City Pool',
    date: '2024-01-25',
    participants: 18,
    maxParticipants: 25,
    status: 'active'
  },
  {
    id: '6',
    name: 'Football Match',
    category: 'sports',
    location: 'Football Stadium',
    date: '2024-01-22',
    participants: 22,
    maxParticipants: 22,
    status: 'active'
  },
  {
    id: '7',
    name: 'Rock Climbing',
    category: 'outdoor',
    location: 'Climbing Wall',
    date: '2024-01-28',
    participants: 6,
    maxParticipants: 12,
    status: 'pending'
  },
  {
    id: '8',
    name: 'Cooking Workshop',
    category: 'educational',
    location: 'Community Center',
    date: '2024-01-14',
    participants: 15,
    maxParticipants: 20,
    status: 'completed'
  },
  {
    id: '9',
    name: 'Running Club',
    category: 'fitness',
    location: 'Park Track',
    date: '2024-01-30',
    participants: 25,
    maxParticipants: 30,
    status: 'active'
  },
  {
    id: '10',
    name: 'Tennis Tournament',
    category: 'sports',
    location: 'Tennis Courts',
    date: '2024-01-26',
    participants: 8,
    maxParticipants: 16,
    status: 'active'
  },
  {
    id: '11',
    name: 'Beach Volleyball',
    category: 'outdoor',
    location: 'Beach Sports Area',
    date: '2024-02-01',
    participants: 12,
    maxParticipants: 16,
    status: 'pending'
  },
  {
    id: '12',
    name: 'Photography Class',
    category: 'educational',
    location: 'Art Studio',
    date: '2024-01-16',
    participants: 8,
    maxParticipants: 12,
    status: 'completed'
  },
  {
    id: '13',
    name: 'Cycling Group',
    category: 'fitness',
    location: 'City Streets',
    date: '2024-02-03',
    participants: 20,
    maxParticipants: 25,
    status: 'active'
  },
  {
    id: '14',
    name: 'Badminton League',
    category: 'sports',
    location: 'Sports Hall',
    date: '2024-01-29',
    participants: 16,
    maxParticipants: 16,
    status: 'active'
  },
  {
    id: '15',
    name: 'Nature Walk',
    category: 'outdoor',
    location: 'Forest Trail',
    date: '2024-02-05',
    participants: 10,
    maxParticipants: 15,
    status: 'pending'
  },
  {
    id: '16',
    name: 'Language Exchange',
    category: 'social',
    location: 'Coffee Shop',
    date: '2024-01-21',
    participants: 12,
    maxParticipants: 20,
    status: 'completed'
  },
  {
    id: '17',
    name: 'Gym Workout',
    category: 'fitness',
    location: 'Fitness Center',
    date: '2024-02-07',
    participants: 14,
    maxParticipants: 20,
    status: 'active'
  },
  {
    id: '18',
    name: 'Soccer Training',
    category: 'sports',
    location: 'Soccer Field',
    date: '2024-01-31',
    participants: 18,
    maxParticipants: 22,
    status: 'active'
  },
  {
    id: '19',
    name: 'Camping Trip',
    category: 'outdoor',
    location: 'National Park',
    date: '2024-02-10',
    participants: 8,
    maxParticipants: 12,
    status: 'pending'
  },
  {
    id: '20',
    name: 'Chess Club',
    category: 'educational',
    location: 'Community Library',
    date: '2024-01-17',
    participants: 6,
    maxParticipants: 10,
    status: 'completed'
  }
])

// Computed property for filtered activities
const filteredActivities = computed(() => {
  return activities.value.filter(activity => {
    const matchesCategory = !selectedCategory.value || activity.category === selectedCategory.value
    const matchesStatus = !selectedStatus.value || activity.status === selectedStatus.value
    
    return matchesCategory && matchesStatus
  })
})

// Computed property for paginated activities
const paginatedActivities = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredActivities.value.slice(start, end)
})

// Computed property for total pages
const totalPages = computed(() => {
  return Math.ceil(filteredActivities.value.length / itemsPerPage.value)
})

// Computed property for pagination info
const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value + 1
  const end = Math.min(currentPage.value * itemsPerPage.value, filteredActivities.value.length)
  return `${start}-${end} of ${filteredActivities.value.length} activities`
})

// Pagination methods
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Export function
const exportToCSV = () => {
  const headers = ['Activity Name', 'Category', 'Location', 'Date', 'Participants', 'Status']
  const csvContent = [
    headers.join(','),
    ...filteredActivities.value.map(activity => [
      `"${activity.name}"`,
      `"${activity.category}"`,
      `"${activity.location}"`,
      `"${activity.date}"`,
      `"${activity.participants}/${activity.maxParticipants}"`,
      `"${activity.status}"`
    ].join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `activities_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Reset pagination when filters change
const resetPagination = () => {
  currentPage.value = 1
}

</script>

<style scoped>
.admin-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-8) var(--spacing-4);
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-12);
}

.page-header h1 {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-4);
  color: var(--text-primary);
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-header p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
}

/* Activity Management */
.activity-management {
  margin-bottom: var(--spacing-12);
}

/* Section Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6);
}

.section-header h2 {
  font-size: var(--font-size-2xl);
  margin: 0;
  color: var(--text-primary);
}

.export-btn {
  background: var(--primary-gradient);
  color: white;
  border: none;
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  transition: var(--transition-normal);
}

.export-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Filter Section */
.filter-section {
  background: white;
  padding: var(--spacing-6);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-8);
}

.filter-options {
  display: flex;
  gap: var(--spacing-4);
}

.filter-select {
  padding: var(--spacing-2) var(--spacing-3);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  background: white;
  cursor: pointer;
  transition: var(--transition-normal);
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

/* Activity List */
.activity-list {
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  overflow: hidden;
}

.no-results {
  text-align: center;
  padding: var(--spacing-12);
  color: var(--text-muted);
}

.no-results-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-4);
}

/* Activity Table */
.activity-table {
  overflow-x: auto;
}

.activity-table table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.activity-table th,
.activity-table td {
  padding: var(--spacing-4);
  text-align: left;
  border-bottom: 1px solid var(--border-light);
}

.activity-table th {
  background: var(--bg-secondary);
  font-weight: 600;
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.activity-table td {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.activity-table tr:hover {
  background: var(--bg-tertiary);
}

.activity-status {
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
}

.activity-status.active {
  background: #dcfce7;
  color: #166534;
}

.activity-status.pending {
  background: #fef3c7;
  color: #92400e;
}

.activity-status.completed {
  background: #e0e7ff;
  color: #3730a3;
}

.activity-status.cancelled {
  background: #fee2e2;
  color: #991b1b;
}

/* Table Info */
.table-info {
  background: var(--bg-secondary);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  border-bottom: 1px solid var(--border-light);
}

.table-info p {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4);
  background: white;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  border-top: 1px solid var(--border-light);
}

.pagination-btn {
  background: white;
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-weight: 600;
  transition: var(--transition-normal);
}

.pagination-btn:hover:not(:disabled) {
  border-color: var(--primary-color);
  background: var(--bg-secondary);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-pages {
  display: flex;
  gap: var(--spacing-1);
}

.pagination-page {
  background: white;
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-weight: 600;
  min-width: 40px;
  transition: var(--transition-normal);
}

.pagination-page:hover {
  border-color: var(--primary-color);
  background: var(--bg-secondary);
}

.pagination-page.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}


/* Responsive Design */
@media (max-width: 768px) {
  .admin-page {
    padding: var(--spacing-6) var(--spacing-3);
  }
  
  .page-header {
    margin-bottom: var(--spacing-8);
  }
  
  .page-header h1 {
    font-size: var(--font-size-3xl);
  }
  
  .filter-options {
    flex-direction: column;
  }
  
  .activity-table {
    font-size: var(--font-size-xs);
  }
  
  .activity-table th,
  .activity-table td {
    padding: var(--spacing-2);
  }
  
  .section-header {
    flex-direction: column;
    gap: var(--spacing-4);
    align-items: stretch;
  }
  
  .pagination {
    flex-direction: column;
    gap: var(--spacing-3);
  }
  
  .pagination-pages {
    order: -1;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .admin-page {
    padding: var(--spacing-4) var(--spacing-2);
  }
  
  .page-header h1 {
    font-size: var(--font-size-2xl);
  }
  
  .activity-table th,
  .activity-table td {
    padding: var(--spacing-1);
    font-size: var(--font-size-xs);
  }
}
</style>