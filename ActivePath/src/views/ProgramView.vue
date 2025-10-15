<template>
  <div class="program-page">

    <!-- Popular Programs -->
    <div class="popular-programs">
      <h3>🎯 Popular Programs</h3>
      <div class="programs-grid">
        <div 
          v-for="program in popularPrograms" 
          :key="program.id"
          class="program-card"
          @click="selectPopularProgram(program)"
        >
          <h4>{{ program.name }}</h4>
          <p>{{ program.description }}</p>
          <span class="program-type">{{ program.type }}</span>
        </div>
      </div>
    </div>

    <div class="map-container">
      <!-- Search Panel -->
      <div class="search-panel">
        <div class="search-section">
          <h3>📍 Location Search</h3>
          <div class="search-input-group">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search for a location in Melbourne..."
              class="search-input"
              @keyup.enter="searchLocation"
            >
            <button class="search-btn" @click="searchLocation">
              🔍 Search
            </button>
          </div>
        </div>

        <div class="location-info" v-if="selectedLocation">
          <h3>📍 Selected Location</h3>
          <div class="location-details">
            <p><strong>{{ selectedLocation.name }}</strong></p>
            <p>{{ selectedLocation.address }}</p>
            <div class="location-actions">
              <button class="action-btn" @click="centerOnLocation">
                📍 Center Map
              </button>
              <button class="action-btn primary" @click="startNavigation" v-if="userLocation">
                🧭 Navigate
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- Map -->
      <div class="map-wrapper">
        <div id="melbourne-map" class="map"></div>
        <div class="map-controls">
          <button class="control-btn" @click="centerOnUser" v-if="userLocation">
            📍 My Location
          </button>
          <button class="control-btn" @click="clearNavigation">
            🗑️ Clear Route
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import 'leaflet/dist/leaflet.css'

// Map and location states
const userLocation = ref<{ lat: number; lng: number } | null>(null)
const selectedLocation = ref<{
  name: string
  address: string
  lat: number
  lng: number
} | null>(null)
const searchQuery = ref('')

// Map instance
let map: any = null
let userMarker: any = null
let selectedMarker: any = null
let routeLine: any = null

// Popular programs in Melbourne
const popularPrograms = ref([
  {
    id: 1,
    name: 'Morning Yoga Program',
    description: 'Start your day with peaceful yoga sessions',
    type: 'Fitness',
    lat: -37.8183,
    lng: 144.9691
  },
  {
    id: 2,
    name: 'City Walking Tours',
    description: 'Explore Melbourne with guided walking tours',
    type: 'Outdoor',
    lat: -37.8304,
    lng: 144.9796
  },
  {
    id: 3,
    name: 'Sports Training Camp',
    description: 'Professional sports training and coaching',
    type: 'Sports',
    lat: -37.8199,
    lng: 144.9834
  }
])

onMounted(async () => {
  // Wait for DOM to be fully rendered
  await nextTick()
  // Add a small delay to ensure the map container is ready
  setTimeout(() => {
    initializeMap()
    getUserLocation()
  }, 100)
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})

// Initialize the map
const initializeMap = async () => {
  // Import Leaflet dynamically
  try {
    const L = await import('leaflet')
    const Leaflet = L.default
    // Check if map container exists
    const mapContainer = document.getElementById('melbourne-map')
    if (!mapContainer) {
      console.error('Map container not found')
      return
    }

    // Initialize map centered on Melbourne
    map = Leaflet.map('melbourne-map', {
      center: [-37.8136, 144.9631],
      zoom: 13,
      zoomControl: true
    })

    // Add tile layer (OpenStreetMap)
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map)

    // Invalidate size to ensure proper rendering
    setTimeout(() => {
      if (map) {
        map.invalidateSize()
      }
    }, 100)

    // Add click event to map
    map.on('click', (e: any) => {
      const lat = e.latlng.lat
      const lng = e.latlng.lng
      
      // Create a marker at clicked location
      if (selectedMarker) {
        map.removeLayer(selectedMarker)
      }
      
      selectedMarker = Leaflet.marker([lat, lng]).addTo(map)
        .bindPopup(`<b>Selected Location</b><br>Lat: ${lat.toFixed(4)}<br>Lng: ${lng.toFixed(4)}`)
        .openPopup()
      
      selectedLocation.value = {
        name: `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
        address: 'Custom selected location',
        lat,
        lng
      }
    })
  } catch (error) {
    console.error('Failed to load Leaflet:', error)
  }
}

// Get user's current location
const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        
        if (map) {
          addUserMarker()
        }
      },
      (error) => {
        console.error('Error getting location:', error)
        // Fallback to Melbourne CBD if location access denied
        userLocation.value = {
          lat: -37.8136,
          lng: 144.9631
        }
        if (map) {
          addUserMarker()
        }
      }
    )
  }
}

// Add user marker to map
const addUserMarker = async () => {
  if (!map || !userLocation.value) return
  
  try {
    const L = await import('leaflet')
    const Leaflet = L.default
    if (userMarker) {
      map.removeLayer(userMarker)
    }
    
    if (userLocation.value) {
      userMarker = Leaflet.marker([userLocation.value.lat, userLocation.value.lng])
        .addTo(map)
        .bindPopup('<b>Your Location</b><br>You are here!')
    }
    
    // Add pulsing effect
    if (userMarker) {
      const pulsingIcon = Leaflet.divIcon({
        className: 'pulsing-marker',
        html: '<div class="pulsing-dot"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      })
      
      userMarker.setIcon(pulsingIcon)
    }
    
    // Invalidate size after adding marker
    setTimeout(() => {
      if (map) {
        map.invalidateSize()
      }
    }, 50)
  } catch (error) {
    console.error('Failed to add user marker:', error)
  }
}

// Search for a location
const searchLocation = () => {
  if (!searchQuery.value.trim()) return
  
  // Simple search simulation (in real app, use a geocoding service)
  const searchResults = [
    { name: 'Melbourne Central', address: 'Melbourne Central, VIC 3000', lat: -37.8103, lng: 144.9628 },
    { name: 'Flinders Street Station', address: 'Flinders Street, Melbourne VIC 3000', lat: -37.8183, lng: 144.9671 },
    { name: 'Crown Casino', address: 'Crown Entertainment Complex, Southbank VIC 3006', lat: -37.8229, lng: 144.9645 },
    { name: 'Eureka Tower', address: '7 Riverside Quay, Southbank VIC 3006', lat: -37.8213, lng: 144.9652 },
    { name: 'Royal Exhibition Building', address: '9 Nicholson St, Carlton VIC 3053', lat: -37.8047, lng: 144.9714 }
  ]
  
  // Find matching location
  const found = searchResults.find(location => 
    location.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
  
  if (found) {
    selectLocation(found)
  } else {
    alert('Location not found. Please try a different search term.')
  }
}

// Select a location
const selectLocation = async (location: any) => {
  selectedLocation.value = location
  
  if (!map) return
  
  try {
    const L = await import('leaflet')
    const Leaflet = L.default
    // Remove existing selected marker
    if (selectedMarker) {
      map.removeLayer(selectedMarker)
    }
    
    // Add new marker
    selectedMarker = Leaflet.marker([location.lat, location.lng])
      .addTo(map)
      .bindPopup(`<b>${location.name}</b><br>${location.address}`)
      .openPopup()
    
    // Center map on selected location
    map.setView([location.lat, location.lng], 15)
    
    // Invalidate size after view change
    setTimeout(() => {
      if (map) {
        map.invalidateSize()
      }
    }, 50)
  } catch (error) {
    console.error('Failed to select location:', error)
  }
}

// Select popular program
const selectPopularProgram = (program: any) => {
  selectLocation({
    name: program.name,
    address: program.description,
    lat: program.lat,
    lng: program.lng
  })
}

// Center on user location
const centerOnUser = () => {
  if (map && userLocation.value) {
    map.setView([userLocation.value.lat, userLocation.value.lng], 15)
    setTimeout(() => {
      if (map) {
        map.invalidateSize()
      }
    }, 50)
  }
}

// Center on selected location
const centerOnLocation = () => {
  if (map && selectedLocation.value) {
    map.setView([selectedLocation.value.lat, selectedLocation.value.lng], 15)
    setTimeout(() => {
      if (map) {
        map.invalidateSize()
      }
    }, 50)
  }
}

// Start navigation
const startNavigation = async () => {
  if (!userLocation.value || !selectedLocation.value || !map) return
  
  try {
    const L = await import('leaflet')
    const Leaflet = L.default
    // Remove existing route
    if (routeLine) {
      map.removeLayer(routeLine)
    }
    
    // Create route line
    if (userLocation.value && selectedLocation.value) {
      const route = [
        [userLocation.value.lat, userLocation.value.lng],
        [selectedLocation.value.lat, selectedLocation.value.lng]
      ]
      
      routeLine = Leaflet.polyline(route, {
        color: '#2563eb',
        weight: 4,
        opacity: 0.8
      }).addTo(map)
      
      // Add route markers
      const startMarker = Leaflet.marker([userLocation.value.lat, userLocation.value.lng])
        .bindPopup('<b>Start</b><br>Your Location')
      
      const endMarker = Leaflet.marker([selectedLocation.value.lat, selectedLocation.value.lng])
        .bindPopup(`<b>Destination</b><br>${selectedLocation.value.name}`)
    }
    
    // Fit map to show entire route
    if (routeLine && userLocation.value && selectedLocation.value) {
      const startMarker = Leaflet.marker([userLocation.value.lat, userLocation.value.lng])
      const endMarker = Leaflet.marker([selectedLocation.value.lat, selectedLocation.value.lng])
      const group = new Leaflet.featureGroup([routeLine, startMarker, endMarker])
      map.fitBounds(group.getBounds().pad(0.1))
    }
    
    // Invalidate size after route change
    setTimeout(() => {
      if (map) {
        map.invalidateSize()
      }
    }, 50)
  } catch (error) {
    console.error('Failed to start navigation:', error)
  }
}

// Clear navigation
const clearNavigation = () => {
  if (routeLine) {
    map.removeLayer(routeLine)
    routeLine = null
  }
}

// Update user location
const updateUserLocation = () => {
  getUserLocation()
}
</script>

<style scoped>
.program-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-8) var(--spacing-4);
}

.map-container {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-12);
  height: 600px;
}

.search-panel {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
  overflow-y: auto;
}

.search-section {
  margin-bottom: var(--spacing-6);
}

.search-section h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-4);
  color: var(--text-primary);
}

.search-input-group {
  display: flex;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-4);
}

.search-input {
  flex: 1;
  padding: var(--spacing-3);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.search-btn {
  background: var(--primary-gradient);
  color: white;
  border: none;
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-weight: 600;
  white-space: nowrap;
}

.search-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.location-info {
  background: var(--bg-secondary);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-4);
}

.location-info h3 {
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-3);
  color: var(--text-primary);
}

.location-details p {
  margin: 0 0 var(--spacing-2) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.location-actions {
  display: flex;
  gap: var(--spacing-2);
  margin-top: var(--spacing-3);
}

.action-btn {
  background: white;
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-size: var(--font-size-xs);
  font-weight: 600;
  transition: var(--transition-normal);
}

.action-btn:hover {
  border-color: var(--primary-color);
  background: var(--bg-secondary);
}

.action-btn.primary {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.action-btn.primary:hover {
  background: var(--primary-dark);
}

.map-wrapper {
  position: relative;
  background: white;
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.map {
  width: 100%;
  height: 100%;
  min-height: 400px;
  z-index: 1;
}

/* Ensure map tiles load properly */
:deep(.leaflet-container) {
  width: 100%;
  height: 100%;
  min-height: 400px;
}

:deep(.leaflet-tile) {
  width: 256px;
  height: 256px;
}

:deep(.leaflet-tile-container) {
  position: absolute;
  left: 0;
  top: 0;
}

/* Fix for Leaflet default marker icons */
:deep(.leaflet-default-icon-path) {
  background-image: url('https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png');
}

.map-controls {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  z-index: 1000;
}

.control-btn {
  background: white;
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-size: var(--font-size-xs);
  font-weight: 600;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-normal);
}

.control-btn:hover {
  border-color: var(--primary-color);
  background: var(--bg-secondary);
}

.popular-programs {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-8);
}

.popular-programs h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-6);
  color: var(--text-primary);
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-4);
}

@media (max-width: 1024px) {
  .programs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.program-card {
  background: var(--bg-secondary);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: var(--transition-normal);
  border: 2px solid transparent;
}

.program-card:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.program-card h4 {
  margin: 0 0 var(--spacing-2) 0;
  color: var(--text-primary);
  font-size: var(--font-size-base);
}

.program-card p {
  margin: 0 0 var(--spacing-3) 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.program-type {
  background: var(--primary-color);
  color: white;
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

/* Pulsing marker animation */
:deep(.pulsing-marker) {
  animation: pulse 2s infinite;
}

:deep(.pulsing-dot) {
  width: 20px;
  height: 20px;
  background: var(--primary-color);
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .map-container {
    grid-template-columns: 1fr;
    height: auto;
  }
  
  .search-panel {
    order: 2;
    height: auto;
  }
  
  .map-wrapper {
    order: 1;
    height: 400px;
  }
}

@media (max-width: 768px) {
  .program-page {
    padding: var(--spacing-6) var(--spacing-3);
  }
  
  .map-wrapper {
    height: 300px;
  }
  
  .search-input-group {
    flex-direction: column;
  }
  
  .location-actions {
    flex-direction: column;
  }
  
  .map-controls {
    position: static;
    flex-direction: row;
    justify-content: center;
    margin-top: var(--spacing-4);
  }
  
  .programs-grid {
    grid-template-columns: 1fr;
  }
}
</style> 