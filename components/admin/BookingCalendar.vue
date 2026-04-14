<template>
  <div class="card p-3">
    <h6 class="mb-3">Booking Calendar</h6>

    <!-- CABIN SELECT -->
    <select v-model="selectedCabin" class="form-select mb-3 w-auto">
      <option value="Malobago">Malobago</option>
      <option value="Talisay">Talisay</option>
    </select>

    <FullCalendar :options="calendarOptions" />

    <!-- MODAL -->
    <div v-if="showModal" class="custom-modal-wrapper">
      <div class="custom-modal">

        <!-- HEADER -->
        <div class="modal-header-custom">
          <h5>Edit Booking</h5>
          <button class="btn-close" @click="showModal = false"></button>
        </div>

        <!-- BODY -->
        <div class="modal-body-custom">

          <div class="form-group">
            <label>Full Name</label>
            <input v-model="selectedEvent.fullName" class="form-control custom-input" />
          </div>

          <div class="form-group">
            <label>Time</label>
            <select v-model="selectedEvent.shift" class="form-control custom-input">
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>

          <div class="form-group">
            <label>Status</label>
            <select v-model="selectedEvent.status" class="form-control custom-input">
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>

        </div>

        <!-- FOOTER -->
        <div class="modal-footer-custom">
          <button class="btn btn-light" @click="showModal = false">Cancel</button>
          <button class="btn btn-primary px-4" @click="saveBooking">Save</button>
        </div>

      </div>

      <div class="custom-backdrop" @click="showModal = false"></div>
    </div>

    <div v-if="showModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const props = defineProps({
  bookings: {
    type: Array,
    default: () => []
  }
})

const selectedEvent = ref(null)
const showModal = ref(false)
const selectedCabin = ref('Malobago')

/* =========================
   DEBUG
========================= */
watch(() => props.bookings, (val) => {
  console.log("🔥 CALENDAR RECEIVED:", val)
})

/* =========================
   🔥 FIX DATETIME PARSER
========================= */
const parseLocal = (dt) => {
  if (!dt) return null
  const clean = dt.replace("T", " ").replace("Z", "").split(".")[0]
  return new Date(clean)
}

/* =========================
   HELPERS
========================= */
const getColor = (b) => {
  if (b.paid >= b.amount) return '#10b981'
  if (b.paid > 0) return '#f59e0b'
  return '#dc3545'
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
   🔥 EVENTS (FIXED)
========================= */
const events = computed(() => {
  return (props.bookings || [])
    .filter(b =>
      (b.cabin || '')
        .toLowerCase()
        .includes(selectedCabin.value.toLowerCase())
    )
    .map(b => {
      const start = parseLocal(b.start_datetime)
      const end = parseLocal(b.end_datetime)

      return {
        id: b.id,
        title: `${formatTime(b.start_datetime)} - ${b.name}`,
        start: start,
        end: end, // 🔥 THIS ENABLES OVERNIGHT
        color: getColor(b),
        extendedProps: {
          fullName: b.name,
          cabin: b.cabin,
          paid: b.paid,
          amount: b.amount
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

  timeZone: 'local', // 🔥 CRITICAL FIX

  events: events.value,

  eventDidMount(info) {
    const { fullName } = info.event.extendedProps
    info.el.title = fullName
  },

  eventClick(info) {
    selectedEvent.value = {
      id: info.event.id,
      ...info.event.extendedProps,
      date: info.event.startStr
    }
    showModal.value = true
  }
}))

const saveBooking = () => {
  console.log("Edited:", selectedEvent.value)
  showModal.value = false
}
</script>

<style scoped>
.fc {
  font-size: 14px;
}

.custom-modal-wrapper {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(3px);
}

.custom-modal {
  position: relative;
  background: white;
  width: 420px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  z-index: 10;
  animation: fadeIn 0.2s ease;
}

.modal-header-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.modal-body-custom {
  padding: 20px;
}

.modal-footer-custom {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 20px;
  border-top: 1px solid #eee;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-size: 13px;
  color: #666;
  margin-bottom: 5px;
  display: block;
}

.custom-input {
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #ddd;
}

.custom-input:focus {
  border-color: #0d6efd;
  box-shadow: none;
}

@keyframes fadeIn {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>