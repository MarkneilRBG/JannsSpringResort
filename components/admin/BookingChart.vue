<template>
  <div class="card p-3">
    <h6 class="mb-3">Booking Trends</h6>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

/* SAMPLE DATA */
const chartData = {
  labels: ['Apr 1', 'Apr 2', 'Apr 3', 'Apr 4', 'Apr 5', 'Apr 6'],
  datasets: [
    {
      label: 'Bookings',
      data: [5, 10, 8, 15, 12, 18],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.1)',
      tension: 0.4,
      fill: true
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
}
</script>