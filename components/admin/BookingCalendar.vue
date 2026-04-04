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
        <label>Shift</label>
        <select v-model="selectedEvent.shift" class="form-control custom-input">
          <option>AM</option>
          <option>PM</option>
        </select>
      </div>

      <div class="form-group">
        <label>Status</label>
        <select v-model="selectedEvent.status" class="form-control custom-input">
          <option value="booked">Booked</option>
          <option value="pending">Pending</option>
          <option value="available">Available</option>
        </select>
      </div>

    </div>

    <!-- FOOTER -->
    <div class="modal-footer-custom">
      <button class="btn btn-light" @click="showModal = false">Cancel</button>
      <button class="btn btn-primary px-4" @click="saveBooking">Save</button>
    </div>

  </div>

  <!-- BACKDROP -->
  <div class="custom-backdrop" @click="showModal = false"></div>
</div>

    <!-- BACKDROP -->
    <div v-if="showModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

/* =========================
   STATE
========================= */
const selectedEvent = ref(null)
const showModal = ref(false)
const selectedCabin = ref('Malobago')

/* =========================
   DATA
========================= */
const bookings = ref([
  {
    date: '2026-04-03',
    shift: 'PM',
    status: 'booked',
    firstName: 'John',
    lastName: 'Doe',
    cabin: 'Malobago'
  },
  {
    date: '2026-04-04',
    shift: 'AM',
    status: 'booked',
    firstName: 'John',
    lastName: 'Doe',
    cabin: 'Malobago'
  },
  {
    date: '2026-04-03',
    shift: 'AM',
    status: 'pending',
    firstName: 'Mark',
    lastName: 'Neil',
    cabin: 'Talisay'
  }
])

/* =========================
   HELPERS
========================= */
const getColor = (status) => {
  if (status === 'booked') return '#dc3545'
  if (status === 'pending') return '#f59e0b'
  return '#10b981'
}

/* =========================
   EVENTS (REACTIVE 🔥)
========================= */
const events = computed(() => {
  return bookings.value
    .filter(b => b.cabin === selectedCabin.value)
    .sort((a, b) => {
      if (a.date === b.date) {
        return a.shift === 'AM' ? -1 : 1
      }
      return new Date(a.date) - new Date(b.date)
    })
    .map(b => {
      const initial = b.firstName?.charAt(0).toUpperCase() || ''
      const lastName = b.lastName || ''

      return {
        id: `${b.date}-${b.shift}-${b.cabin}`, // 🔥 unique ID
        title: `${b.shift} - ${initial}. ${lastName}`,
        date: b.date,
        color: getColor(b.status),
        extendedProps: {
          fullName: `${b.firstName} ${b.lastName}`,
          shift: b.shift,
          status: b.status,
          cabin: b.cabin
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
  events: events.value,

  eventDidMount(info) {
    const { fullName, shift, status } = info.event.extendedProps
    info.el.title = `${shift} - ${fullName} (${status})`
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

/* =========================
   SAVE BOOKING
========================= */
const saveBooking = () => {
  const [firstName, lastName] = selectedEvent.value.fullName.split(' ')

  const index = bookings.value.findIndex(b =>
    `${b.date}-${b.shift}-${b.cabin}` === selectedEvent.value.id
  )

  if (index !== -1) {
    bookings.value[index] = {
      ...bookings.value[index],
      firstName,
      lastName,
      status: selectedEvent.value.status,
      shift: selectedEvent.value.shift
    }
  }

  showModal.value = false
}
</script>

<style scoped>
.fc {
  font-size: 14px;
}

/* MODAL WRAPPER */
.custom-modal-wrapper {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* BACKDROP */
.custom-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(3px);
}

/* MODAL BOX */
.custom-modal {
  position: relative;
  background: white;
  width: 420px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  z-index: 10;
  animation: fadeIn 0.2s ease;
}

/* HEADER */
.modal-header-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

/* BODY */
.modal-body-custom {
  padding: 20px;
}

/* FOOTER */
.modal-footer-custom {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 20px;
  border-top: 1px solid #eee;
}

/* FORM */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-size: 13px;
  color: #666;
  margin-bottom: 5px;
  display: block;
}

/* INPUT STYLE */
.custom-input {
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #ddd;
}

.custom-input:focus {
  border-color: #0d6efd;
  box-shadow: none;
}

/* ANIMATION */
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