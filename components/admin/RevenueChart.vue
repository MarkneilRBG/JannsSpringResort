<template>
  <div class="card p-3">
    
    <!-- HEADER -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      
      <div>
        <h6 class="mb-0">Revenue Overview</h6>
        <small class="text-muted">Track earnings</small>
      </div>

      <!-- FILTERS -->
      <div class="d-flex gap-2">

        <!-- TYPE -->
        <select v-model="filter" class="form-select w-auto">
          <option value="week">Daily</option>
          <option value="year">Monthly</option>
        </select>

        <!-- MONTH (for DAILY) -->
        <select v-if="filter === 'week'" v-model="selectedMonth" class="form-select w-auto">
          <option v-for="(m, i) in months" :key="i" :value="i">
            {{ m }}
          </option>
        </select>

        <!-- CABIN -->
        <select v-model="selectedCabin" class="form-select w-auto">
          <option value="all">All Cabins</option>
          <option value="Malobago">Malobago</option>
          <option value="Talisay">Talisay</option>
        </select>

      </div>
    </div>

    <!-- TOTAL -->
    <div class="mb-2">
      <h5 class="fw-bold mb-0">₱{{ totalRevenue.toLocaleString() }}</h5>
      <small class="text-muted">Total Revenue</small>
    </div>

    <!-- CHART -->
    <Bar :data="chartData" :options="chartOptions" />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)

/* STATE */
const filter = ref('week') // week = Daily
const selectedMonth = ref(new Date().getMonth())
const selectedCabin = ref('all')

/* DATA */
const bookings = [
  { date: '2026-01-10', price: 2000, cabin: 'Malobago' },
  { date: '2026-01-15', price: 1800, cabin: 'Talisay' },
  { date: '2026-02-05', price: 1500, cabin: 'Talisay' },
  { date: '2026-03-20', price: 1800, cabin: 'Malobago' },
  { date: '2026-04-01', price: 1500, cabin: 'Malobago' },
  { date: '2026-04-03', price: 2000, cabin: 'Talisay' }
]

/* FILTER */
const filteredBookings = computed(() => {
  if (selectedCabin.value === 'all') return bookings
  return bookings.filter(b => b.cabin === selectedCabin.value)
})

/* TOTAL */
const totalRevenue = computed(() => {
  return filteredBookings.value.reduce((sum, b) => sum + b.price, 0)
})

const months = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
]

/* DAILY (BY MONTH) */
const generateDailyByMonth = (monthIndex) => {
  const year = new Date().getFullYear()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

  const result = Array(daysInMonth).fill(0)

  filteredBookings.value.forEach(b => {
    const d = new Date(b.date)

    if (d.getMonth() === monthIndex) {
      result[d.getDate() - 1] += b.price
    }
  })

  return result
}

/* MONTHLY (YEAR VIEW) */
const generateYearlyRevenue = () => {
  const result = Array(12).fill(0)

  filteredBookings.value.forEach(b => {
    const d = new Date(b.date)
    result[d.getMonth()] += b.price
  })

  return result
}

/* CHART DATA */
const chartData = computed(() => {

  const baseDataset = {
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    barThickness: 20
  }

  // MONTHLY VIEW (Jan–Dec)
  if (filter.value === 'year') {
    return {
      labels: months,
      datasets: [{
        ...baseDataset,
        data: generateYearlyRevenue()
      }]
    }
  }

  // DAILY VIEW (1–31 of selected month)
  const daysInMonth = new Date(
    new Date().getFullYear(),
    selectedMonth.value + 1,
    0
  ).getDate()

  return {
    labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
    datasets: [{
      ...baseDataset,
      data: generateDailyByMonth(selectedMonth.value)
    }]
  }
})

/* OPTIONS */
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `₱${ctx.raw.toLocaleString()}`
      }
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 14px;
  border: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

:deep(canvas) {
  max-height: 300px;
}
</style>