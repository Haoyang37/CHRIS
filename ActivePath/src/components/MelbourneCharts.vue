<template>
  <div class="melbourne-charts">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading Melbourne sports data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <div class="error-icon">⚠️</div>
      <h3>Failed to load data</h3>
      <p>{{ error }}</p>
      <button @click="loadData" class="retry-btn">Retry</button>
    </div>

    <!-- Charts Container -->
    <div v-else class="charts-container">

      <!-- Chart Navigation -->
      <div class="chart-navigation">
        <button 
          v-for="chart in chartTypes" 
          :key="chart.key"
          @click="setActiveChart(chart.key)"
          :class="{ active: activeChart === chart.key }"
          class="chart-btn"
        >
          {{ chart.icon }} {{ chart.label }}
        </button>
      </div>

      <!-- Active Chart -->
      <div class="chart-wrapper">
        <div class="chart-header">
          <h3>{{ getActiveChartInfo().title }}</h3>
          <p>{{ getActiveChartInfo().description }}</p>
        </div>
        
        <div class="chart-container">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { Chart, registerables } from 'chart.js'
import { 
  fetchMelbourneData, 
  type ActivityData, 
  type ChartData 
} from '../services/melbourneDataService'

// Register Chart.js components
Chart.register(...registerables)

// Reactive data
const loading = ref(true)
const error = ref('')
const activities = ref<ActivityData[]>([])
const stats = ref<any>({})
const participationData = ref<ChartData>({ labels: [], datasets: [] })
const popularityData = ref<ChartData>({ labels: [], datasets: [] })

// Chart state
const activeChart = ref('participation')
const chartCanvas = ref<HTMLCanvasElement>()
let chartInstance: Chart | null = null

// Chart types configuration
const chartTypes = [
  {
    key: 'participation',
    label: 'Participation',
    icon: '👥',
    title: 'Activity Participation in Melbourne',
    description: 'Number of participants for popular sports and outdoor activities'
  },
  {
    key: 'popularity',
    label: 'Popularity',
    icon: '⭐',
    title: 'Activity Popularity Scores',
    description: 'Popularity ratings (0-100) for different activities'
  }
]


// Methods

const getActiveChartInfo = () => {
  return chartTypes.find(chart => chart.key === activeChart.value) || chartTypes[0]
}

const getActiveChartData = (): ChartData => {
  switch (activeChart.value) {
    case 'participation':
      return participationData.value
    case 'popularity':
      return popularityData.value
    default:
      return participationData.value
  }
}

const createChart = () => {
  if (!chartCanvas.value) return

  // Destroy existing chart
  if (chartInstance) {
    chartInstance.destroy()
  }

  const data = getActiveChartData()
  const chartInfo = getActiveChartInfo()

  // Determine chart type based on active chart
  let chartType: any = 'bar'

  chartInstance = new Chart(chartCanvas.value, {
    type: chartType,
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: chartInfo.title,
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        legend: {
          display: false,
          position: 'bottom'
        },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          display: true,
          grid: {
            display: false
          }
        },
        y: {
          display: true,
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    }
  })
}

const setActiveChart = (chartKey: string) => {
  activeChart.value = chartKey
  nextTick(() => {
    createChart()
  })
}

const loadData = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const data = await fetchMelbourneData()
    
    activities.value = data.activities
    stats.value = data.stats
    participationData.value = data.participationData
    popularityData.value = data.popularityData
    
    // Create initial chart
    await nextTick()
    createChart()
    
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load data'
    console.error('Error loading Melbourne data:', err)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadData()
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped>
.melbourne-charts {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-4);
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-16);
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-light);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-4);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error State */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-16);
  text-align: center;
}

.error-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-4);
}

.retry-btn {
  background: var(--primary-gradient);
  color: white;
  border: none;
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-weight: 600;
  margin-top: var(--spacing-4);
  transition: var(--transition-normal);
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}


/* Chart Navigation */
.chart-navigation {
  display: flex;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-6);
  flex-wrap: wrap;
}

.chart-btn {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  color: var(--text-secondary);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-lg);
  cursor: pointer;
  font-weight: 600;
  transition: var(--transition-normal);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.chart-btn:hover {
  background: var(--bg-tertiary);
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.chart-btn.active {
  background: var(--primary-gradient);
  color: white;
  border-color: transparent;
  box-shadow: var(--shadow-sm);
}

/* Chart Wrapper */
.chart-wrapper {
  background: var(--bg-secondary);
  padding: var(--spacing-6);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--spacing-8);
}

.chart-header {
  margin-bottom: var(--spacing-6);
  text-align: center;
}

.chart-header h3 {
  margin: 0 0 var(--spacing-2) 0;
  color: var(--text-primary);
  font-size: var(--font-size-xl);
}

.chart-header p {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
}


/* Responsive Design */
@media (max-width: 768px) {
  .melbourne-charts {
    padding: var(--spacing-2);
  }
  
  .chart-navigation {
    justify-content: center;
  }
  
  .chart-btn {
    padding: var(--spacing-2) var(--spacing-3);
    font-size: var(--font-size-sm);
  }
  
  .chart-container {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .chart-navigation {
    flex-direction: column;
  }
  
  .chart-btn {
    justify-content: center;
  }
}
</style>
