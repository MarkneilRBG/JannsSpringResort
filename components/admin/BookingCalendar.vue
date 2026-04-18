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
   TIME FIX
========================= */
const parseLocal = (dt) => {
  if (!dt) return null
  return new Date(dt.replace("T", " ").replace("Z", "").split(".")[0])
}

const formatTime = (dt) => {
  const d = parseLocal(dt)
  if (!d) return ''
  return d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/* =========================
   STATUS
========================= */
const getStatus = (b) => {
  const status = b.status?.toLowerCase()

  if (status === 'cancelled' || status === 'canceled') return 'cancelled'
  if (b.paid >= b.amount) return 'paid'
  if (b.paid > 0) return 'partial'
  return 'reserved'
}

/* =========================
   COLOR
========================= */
const getColor = (status) => {
  return {
    paid: '#10b981',      // green
    partial: '#f59e0b',   // yellow
    reserved: '#3b82f6',  // blue
    cancelled: '#fecaca'  // soft red
  }[status]
}

/* =========================
   EVENTS
========================= */
const events = computed(() => {
  return (props.bookings || [])
    .filter(b =>
      (b.cabin || '')
        .toLowerCase()
        .includes(selectedCabin.value.toLowerCase())
    )
    .map(b => {
      const status = getStatus(b)

      return {
        id: b.id,

        start: parseLocal(b.start_datetime),
        end: parseLocal(b.end_datetime),

        display: 'block',

        backgroundColor: getColor(status),
        borderColor: getColor(status),

        extendedProps: {
          ...b,
          status,
          startTime: formatTime(b.start_datetime),
          endTime: formatTime(b.end_datetime)
        }
      }
    })
})

/* =========================
   CALENDAR OPTIONS
========================= */
const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  height: 'auto',

  timeZone: 'local',

  events: events.value,

  dayMaxEvents: true,

  /* CLEAN AIRBNB UI */
  eventContent(info) {
    const b = info.event.extendedProps

    return {
      html: `
        <div class="event-clean ${b.status}">
          
          <div class="event-name">
            ${b.name}
          </div>

          <div class="event-time">
            ${b.startTime} → ${b.endTime}
          </div>

          ${
            b.status === 'cancelled'
              ? `<div class="event-status">Cancelled</div>`
              : ''
          }

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

/* =========================
   EVENT STYLE
========================= */
.event-clean {
  padding: 4px 6px;
  border-radius: 6px;
  font-size: 11px;
  line-height: 1.2;
  transition: 0.2s;
}

/* NAME */
.event-name {
  font-weight: 600;
}

/* TIME */
.event-time {
  font-size: 10px;
  opacity: 0.9;
}

/* STATUS */
.event-status {
  font-size: 9px;
}

/* 🟢 PAID */
.event-clean.paid {
  color: white;
}

/* 🟡 PARTIAL */
.event-clean.partial {
  color: #1f2937;
}

/* 🔵 RESERVED */
.event-clean.reserved {
  color: white;
}

/* 🔴 CANCELLED (SOFT UI) */
.event-clean.cancelled {
  color: #991b1b;
  border: 1px solid #fecaca;
}

/* STRIKETHROUGH */
.event-clean.cancelled .event-name {
  text-decoration: line-through;
}

/* HOVER */
.fc-event:hover {
  transform: scale(1.02);
}
</style>