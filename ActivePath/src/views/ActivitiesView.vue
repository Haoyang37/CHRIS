<template>
  <div class="activities-page">
    <div class="page-header">
      <h1>Activities</h1>
      <p>Find and join fitness activities in your area</p>
    </div>

    <!-- Simple Filter -->
    <div class="filter-section">
      <div class="filter-group">
        <label>Activity Type</label>
        <select v-model="selectedType" class="filter-select">
          <option value="">All Types</option>
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
          <option value="swimming">Swimming</option>
          <option value="yoga">Yoga</option>
          <option value="gym">Gym</option>
        </select>
      </div>
    </div>

    <!-- Activities List -->
    <div class="activities-list">
      <div 
        v-for="activity in filteredActivities" 
        :key="activity.id"
        class="activity-card"
      >
        <div class="activity-icon" :class="activity.type">
          {{ getActivityIcon(activity.type) }}
        </div>
        <div class="activity-content">
          <h3>{{ activity.title }}</h3>
          <p>{{ activity.description }}</p>
          <div class="activity-details">
            <span>📍 {{ activity.location }}</span>
            <span>🕒 {{ activity.time }}</span>
            <span>👥 {{ activity.participants }} people</span>
            <span v-if="activity.joinedMembers.length > 0" class="joined-members">
              👤 {{ activity.joinedMembers.join(', ') }}
            </span>
          </div>
          
          <!-- Rating Section -->
          <div class="rating-section">
            <div class="rating-label">Rate this activity:</div>
            <div class="star-rating">
              <span 
                v-for="star in 5" 
                :key="star"
                class="star"
                :class="{ 
                  active: star <= activity.rating,
                  hover: hoverRating >= star && hoverRating > 0
                }"
                @click="rateActivity(activity, star)"
                @mouseenter="hoverRating = star"
                @mouseleave="hoverRating = 0"
              >
                <span class="star-icon">★</span>
              </span>
            </div>
            <div class="rating-display">
              {{ activity.rating }}/5 stars
            </div>
          </div>
          
          <button class="join-btn" @click="openJoinDialog(activity)">
            Join Activity
          </button>
        </div>
      </div>
    </div>

    <!-- Join Dialog -->
    <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
      <div class="dialog" @click.stop>
        <div class="dialog-header">
          <h3>Join {{ selectedActivity?.title }}</h3>
          <button class="close-btn" @click="closeDialog">×</button>
        </div>
        <div class="dialog-content">
          <div class="form-group">
            <label for="memberName">Your Name</label>
            <input
              id="memberName"
              v-model="memberName"
              type="text"
              placeholder="Enter your name"
              @keyup.enter="joinActivity"
            />
          </div>
          <div class="dialog-buttons">
            <button class="cancel-btn" @click="closeDialog">Cancel</button>
            <button class="confirm-btn" @click="joinActivity" :disabled="!memberName.trim()">
              Join Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive data
const selectedType = ref('')
const showDialog = ref(false)
const selectedActivity = ref<any>(null)
const memberName = ref('')
const hoverRating = ref(0)

// Activity data
const activities = ref([
  {
    id: 1,
    title: 'Morning Running Club',
    description: 'Weekly running sessions suitable for all levels',
    type: 'running',
    location: 'Central Park',
    time: '06:00 - 07:00',
    participants: 15,
    joinedMembers: [],
    rating: 0
  },
  {
    id: 2,
    title: 'Yoga Class',
    description: 'Relaxing yoga session for mind and body',
    type: 'yoga',
    location: 'Community Center',
    time: '18:00 - 19:00',
    participants: 20,
    joinedMembers: [],
    rating: 0
  },
  {
    id: 3,
    title: 'Gym Workout',
    description: 'Strength training and cardio session',
    type: 'gym',
    location: 'Fitness Center',
    time: '19:00 - 20:30',
    participants: 10,
    joinedMembers: [],
    rating: 0
  }
])

// Computed properties
const filteredActivities = computed(() => {
  if (!selectedType.value) return activities.value
  return activities.value.filter(activity => activity.type === selectedType.value)
})

// Methods
const getActivityIcon = (type: string) => {
  const icons: { [key: string]: string } = {
    running: '🏃‍♂️',
    cycling: '🚴‍♂️',
    swimming: '🏊‍♂️',
    yoga: '🧘‍♀️',
    gym: '💪'
  }
  return icons[type] || '🎯'
}

const openJoinDialog = (activity: any) => {
  selectedActivity.value = activity
  memberName.value = ''
  showDialog.value = true
}

const closeDialog = () => {
  showDialog.value = false
  selectedActivity.value = null
  memberName.value = ''
}

const joinActivity = () => {
  if (!memberName.value.trim() || !selectedActivity.value) return
  
  // Add member to the activity
  if (!selectedActivity.value.joinedMembers.includes(memberName.value.trim())) {
    selectedActivity.value.joinedMembers.push(memberName.value.trim())
  }
  
  // Show success message
  alert(`Welcome ${memberName.value}! You have joined ${selectedActivity.value.title}`)
  
  // Close dialog
  closeDialog()
}

const rateActivity = (activity: any, rating: number) => {
  activity.rating = rating
  // Show rating confirmation
  alert(`You rated "${activity.title}" ${rating} star${rating > 1 ? 's' : ''}!`)
}
</script>

<style scoped>
.activities-page {
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
}

.page-header p {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
}

.filter-section {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-8);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.filter-group label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.filter-select {
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  background: white;
  min-width: 200px;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
}

.activity-card {
  display: flex;
  gap: var(--spacing-6);
  background: white;
  padding: var(--spacing-6);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  transition: var(--transition-normal);
}

.activity-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.activity-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: var(--radius-xl);
  font-size: var(--font-size-3xl);
  flex-shrink: 0;
}

.activity-icon.running {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.activity-icon.cycling {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.activity-icon.swimming {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.activity-icon.yoga {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.activity-icon.gym {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.activity-content {
  flex: 1;
}

.activity-content h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-2);
  color: var(--text-primary);
}

.activity-content p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-4);
  line-height: 1.6;
}

.activity-details {
  display: flex;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
  flex-wrap: wrap;
}

.activity-details span {
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}

.joined-members {
  color: var(--primary-color) !important;
  font-weight: 600;
}

/* Rating Section Styles */
.rating-section {
  margin: var(--spacing-4) 0;
  padding: var(--spacing-4);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
}

.rating-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-2);
}

.star-rating {
  display: flex;
  gap: var(--spacing-1);
  margin-bottom: var(--spacing-2);
}

.star {
  cursor: pointer;
  transition: var(--transition-normal);
  display: inline-block;
  position: relative;
}

.star-icon {
  font-size: var(--font-size-xl);
  color: #ddd;
  transition: var(--transition-normal);
  display: block;
}

.star:hover {
  transform: scale(1.1);
}

.star.hover .star-icon {
  color: #ffd700;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.5);
}

.star.active .star-icon {
  color: #ffd700;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.8);
}

.rating-display {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

.join-btn {
  background: var(--primary-gradient);
  color: white;
  border: none;
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-lg);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-normal);
}

.join-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Dialog Styles */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-4);
}

.dialog {
  background: white;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-2xl);
  max-width: 400px;
  width: 100%;
  animation: dialogSlideIn 0.3s ease-out;
}

@keyframes dialogSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-6) var(--spacing-6) 0;
}

.dialog-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: var(--font-size-xl);
}

.close-btn {
  background: none;
  border: none;
  font-size: var(--font-size-2xl);
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  transition: var(--transition-normal);
}

.close-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.dialog-content {
  padding: var(--spacing-6);
}

.form-group {
  margin-bottom: var(--spacing-6);
}

.form-group label {
  display: block;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-sm);
}

.form-group input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: var(--transition-normal);
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.dialog-buttons {
  display: flex;
  gap: var(--spacing-3);
}

.cancel-btn {
  flex: 1;
  padding: var(--spacing-3) var(--spacing-4);
  border: 2px solid var(--border-color);
  background: white;
  color: var(--text-secondary);
  border-radius: var(--radius-lg);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-normal);
}

.cancel-btn:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

.confirm-btn {
  flex: 1;
  padding: var(--spacing-3) var(--spacing-4);
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-normal);
}

.confirm-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.confirm-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
  .activities-page {
    padding: var(--spacing-6) var(--spacing-3);
  }
  
  .page-header {
    margin-bottom: var(--spacing-8);
  }
  
  .page-header h1 {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--spacing-3);
  }
  
  .page-header p {
    font-size: var(--font-size-lg);
  }
  
  .filter-section {
    margin-bottom: var(--spacing-6);
  }
  
  .filter-select {
    min-width: 180px;
  }
  
  .activity-card {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-4);
  }
  
  .activity-details {
    justify-content: center;
    gap: var(--spacing-3);
  }
  
  .rating-section {
    margin: var(--spacing-3) 0;
    padding: var(--spacing-3);
  }
  
  .star-rating {
    justify-content: center;
    gap: var(--spacing-2);
  }
  
  .star {
    font-size: var(--font-size-lg);
  }
  
  .dialog {
    margin: var(--spacing-4);
    max-width: 350px;
  }
  
  .dialog-header {
    padding: var(--spacing-4) var(--spacing-4) 0;
  }
  
  .dialog-content {
    padding: var(--spacing-4);
  }
}

@media (max-width: 480px) {
  .activities-page {
    padding: var(--spacing-4) var(--spacing-2);
  }
  
  .page-header {
    margin-bottom: var(--spacing-6);
  }
  
  .page-header h1 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-2);
  }
  
  .page-header p {
    font-size: var(--font-size-base);
  }
  
  .filter-section {
    margin-bottom: var(--spacing-4);
  }
  
  .filter-select {
    min-width: 160px;
    padding: var(--spacing-2) var(--spacing-3);
  }
  
  .activities-list {
    gap: var(--spacing-4);
  }
  
  .activity-card {
    padding: var(--spacing-4);
    gap: var(--spacing-3);
  }
  
  .activity-icon {
    width: 60px;
    height: 60px;
    font-size: var(--font-size-2xl);
  }
  
  .activity-content h3 {
    font-size: var(--font-size-lg);
  }
  
  .activity-content p {
    font-size: var(--font-size-sm);
  }
  
  .activity-details {
    gap: var(--spacing-2);
    flex-direction: column;
    align-items: center;
  }
  
  .activity-details span {
    font-size: var(--font-size-xs);
  }
  
  .rating-section {
    margin: var(--spacing-2) 0;
    padding: var(--spacing-2);
  }
  
  .rating-label {
    font-size: var(--font-size-xs);
    text-align: center;
  }
  
  .star {
    font-size: var(--font-size-base);
  }
  
  .rating-display {
    font-size: var(--font-size-xs);
    text-align: center;
  }
  
  .join-btn {
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--font-size-sm);
  }
  
  .dialog {
    margin: var(--spacing-2);
    max-width: 320px;
  }
  
  .dialog-header h3 {
    font-size: var(--font-size-lg);
  }
  
  .dialog-buttons {
    flex-direction: column;
    gap: var(--spacing-2);
  }
  
  .cancel-btn,
  .confirm-btn {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 360px) {
  .page-header h1 {
    font-size: var(--font-size-xl);
  }
  
  .page-header p {
    font-size: var(--font-size-sm);
  }
  
  .activity-card {
    padding: var(--spacing-3);
  }
  
  .activity-icon {
    width: 50px;
    height: 50px;
    font-size: var(--font-size-xl);
  }
  
  .activity-content h3 {
    font-size: var(--font-size-base);
  }
  
  .activity-content p {
    font-size: 12px;
  }
  
  .dialog {
    max-width: 280px;
  }
}
</style> 