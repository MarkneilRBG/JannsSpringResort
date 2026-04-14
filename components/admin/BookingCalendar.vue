<template>
  <div class="card p-3">
    <h6 class="mb-3">Booking Calendar</h6>

    <!-- CABIN SELECT -->
    <select v-model="selectedCabin" class="form-select mb-3 w-auto">
      <option value="Malobago">Malobago</option>
      <option value="Talisay">Talisay</option>
    </select>

    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const props = defineProps({
  bookings: {
    type: Array,
    default: () => []
  }
})

const selectedCabin = ref('Talisay')

/* =========================
   🔥 FIX TIMEZONE (NO UTC SHIFT)
========================= */
const parseLocal = (dt) => {
  if (!dt) return null
  const clean = dt.replace("T", " ").replace("Z", "").split(".")[0]
  return new Date(clean)
}

/* =========================
   FORMAT TIME
========================= */
const formatTime = (dt) => {
  const d = parseLocal(dt)
  if (!d) return ''
  return d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/* =========================
   COLOR STATUS
========================= */
const getColor = (b) => {
  if (b.paid >= b.amount) return '#10b981'   // green
  if (b.paid > 0) return '#f59e0b'           // yellow
  return '#dc3545'                           // red
}

/* =========================
   🔥 HOTEL STYLE EVENTS
========================= */
const events = computed(() => {
  return (props.bookings || [])
    .filter(b =>
      (b.cabin || '')
        .toLowerCase()
        .includes(selectedCabin.value.toLowerCase())
    )
    .map(b => ({
      id: b.id,

      title: b.name,

      start: parseLocal(b.start_datetime),
      end: parseLocal(b.end_datetime),

      display: 'block', // 🔥 makes it a span bar

      backgroundColor: getColor(b),
      borderColor: getColor(b),

      extendedProps: {
        fullName: b.name,
        startTime: formatTime(b.start_datetime),
        endTime: formatTime(b.end_datetime)
      }
    }))
})

/* =========================
   CALENDAR OPTIONS
========================= */
const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  height: 'auto',

  timeZone: 'local', // 🔥 CRITICAL

  events: events.value,

  eventDisplay: 'block',
  dayMaxEvents: true,

  eventContent(info) {
    const { fullName, startTime, endTime } = info.event.extendedProps

    return {
      html: `
        <div style="font-size:11px;">
          <strong>${fullName}</strong><br/>
          <span>${startTime} → ${endTime}</span>
        </div>
      `
    }
  }
}))
</script>

<style scoped>
.fc {
  font-size: 13px;
}

.fc-event {
  border-radius: 6px !important;
  padding: 2px 4px !important;
}
</style>