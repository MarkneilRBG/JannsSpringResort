<template>
  <div class="calendar">
    
    <!-- Header -->
    <div class="calendar-header">
      {{ title }}
    </div>

    <!-- Days of week -->
    <div class="calendar-grid calendar-days">
      <div 
        class="day day-label" 
        v-for="d in daysOfWeek" 
        :key="d"
      >
        {{ d }}
      </div>
    </div>

    <!-- Dates -->
    <div class="calendar-grid">
      <div
        v-for="day in days"
        :key="day"
        class="day"
      >
        {{ day }}
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps({
  title: String,
  days: Array
})

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
</script>

<style scoped>
.calendar {
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
}

/* Header */
.calendar-header {
  background: #8c8c8c;
  color: #fff;
  padding: 12px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
}

/* Grid */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

/* Days label row */
.calendar-days {
  border-bottom: 1px solid #ddd;
}

/* Day cells */
.day {
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  height: 70px;
  font-size: 14px;
  color: #333;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* Remove last column border */
.day:nth-child(7n) {
  border-right: none;
}

/* Day labels (SUN, MON...) */
.day-label {
  background: #f5f5f5;
  font-weight: 600;
  height: 50px;
}

/* Hover effect (optional but nice) */
.day:hover {
  background: #f0f0f0;
  cursor: pointer;
}
</style>