<template>
  <div>
    <!-- 🔥 FIXED PROGRESS BAR -->
  <div class="booking-steps">
  <!-- STEP 1 -->
  <div
    :class="['step', step > 1 ? 'done' : '', step === 1 ? 'active' : '', 'clickable']"
    @click="goToStep(1)"
  >
    <div class="circle"><Icon name="mdi:calendar" /></div>
    <p>Check-in &<br />Check-out Date</p>
  </div>

  <div :class="['line', step > 1 ? 'active' : '']"></div>

  <!-- STEP 2 -->
  <div
    :class="['step', step === 2 ? 'active' : '', maxStep >= 2 ? 'clickable' : 'disabled']"
    @click="goToStep(2)"
  >
    <div class="circle"><Icon name="mdi:bed" /></div>
    <p>Select<br />Rooms & Rates</p>
  </div>

  <div class="line"></div>

  <!-- STEP 3 -->
  <div :class="[ 'step', step === 3 ? 'active' : '', maxStep >= 3 ? 'clickable' : 'disabled' ]"
      @click="goToStep(3)">
    <div class="circle"><Icon name="mdi:account" /></div>
    <p>Guest<br />Information</p>
  </div>

  <div :class="['line', step > 3 ? 'active' : '']"></div>

  <div class="line"></div>

  <!-- STEP 4 -->
  <div class="step disabled">
    <div class="circle"><Icon name="mdi:check-circle" /></div>
    <p>Booking<br />Confirmation</p>
  </div>
</div>

    <!-- 🔥 ONE CONTAINER ONLY (IMPORTANT) -->
    <div class="container booking-ui">

      <!-- ===================== -->
      <!-- STEP 1: CALENDAR -->
      <!-- ===================== -->
      <div v-if="step === 1">
        <div class="row mb-3 align-items-end">
          <div class="col-md-3">
            <label>Check-in</label>
            <input type="date" v-model="checkIn" class="form-control" />
          </div>

          <div class="col-md-3">
            <label>Check-out</label>
            <input type="date" v-model="checkOut" class="form-control" />
          </div>

          <div class="col-md-3">
            <label>Number of night(s)</label>
            <div class="form-control bg-light">
              {{ nights }} night(s)
            </div>
          </div>

          <div class="col-md-3">
            <label>Number of Guests</label>
            <input type="number" v-model="guests" min="1" class="form-control" />
          </div>
        </div>

        <!-- Calendar -->
        <div class="row">
          <div class="col-md-6">
            <Calendar title="March 2026" :days="marchDays" />
          </div>

          <div class="col-md-6">
            <Calendar title="April 2026" :days="aprilDays" />
          </div>
        </div>

        <!-- Continue -->
        <div class="text-end mt-4">
          <button class="btn btn-continue" @click="goNextStep(2)">
            CONTINUE
          </button>
        </div>
      </div>

      <!-- ===================== -->
      <!-- STEP 2: ROOMS -->
      <!-- ===================== -->
      <div v-if="step === 2">
        <div class="row mt-4">

          <!-- LEFT -->
          <div class="col-md-8">
            <h2>Select Room(s)</h2>

            <div class="row">
              <div class="col-md-6 mb-4" v-for="room in rooms" :key="room.name">
                <div class="room-card" :class="{ selected: selectedRoom === room.name }">
                  <img :src="room.image" />
                  <div class="p-3">
                    <h5>{{ room.name }}</h5>
                    <p>From PHP {{ room.price }} / night</p>

                    <button
                      class="btn btn-select w-100"
                      @click="selectRoom(room)"
                    >
                      {{ selectedRoom === room.name ? 'SELECTED' : 'SELECT' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT -->
          <div class="col-md-4">
            <div class="summary">
              <h4>Booking Summary</h4>

              <div class="summary-box">
                <p>Date: {{ formatDate(checkIn) }} - {{ formatDate(checkOut) }} </p>
                <p>Guests: {{ guests }}</p>
                <p v-if="selectedRoom">Room: {{ selectedRoom }}</p>
              </div>

              <button
                class="btn btn-continue w-100 mt-3"
                :disabled="!selectedRoom"
                @click="goNextStep(3)"
              >
                CONTINUE
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- ===================== -->
<!-- STEP 3: GUEST INFO -->
<!-- ===================== -->
<div v-if="step === 3">
  <div class="row mt-4">

    <!-- LEFT FORM -->
    <div class="col-md-8">
      <h2>Guest Information</h2>

      <div class="row">

        <div class="col-md-6 mb-3">
          <label>First Name *</label>
          <input type="text" v-model="guest.firstName" class="form-control" />
        </div>

        <div class="col-md-6 mb-3">
          <label>Last Name *</label>
          <input type="text" v-model="guest.lastName" class="form-control" />
        </div>

        <div class="col-md-12 mb-3">
          <label>Address *</label>
          <input type="text" v-model="guest.address" class="form-control" />
        </div>

        <div class="col-md-6 mb-3">
          <label>Contact Number *</label>
          <input type="text" v-model="guest.contact" class="form-control" placeholder="+63..." />
        </div>

        <div class="col-md-6 mb-3">
          <label>Estimated Arrival Time *</label>
          <select v-model="guest.arrival" class="form-control">
            <option value="">- Select -</option>
            <option>12:00 PM - 2:00 PM</option>
            <option>2:00 PM - 4:00 PM</option>
            <option>4:00 PM - 6:00 PM</option>
            <option>6:00 PM - 8:00 PM</option>
          </select>
        </div>

      </div>
    </div>

    <!-- RIGHT SUMMARY -->
    <div class="col-md-4">
      <div class="summary">
        <h4>Booking Summary</h4>

        <div class="summary-box">
          <p>Date: {{ formatDate(checkIn) }} - {{ formatDate(checkOut) }}</p>
          <p>Guests: {{ guests }}</p>
          <p v-if="selectedRoom">Room: {{ selectedRoom }}</p>
        </div>

        <button
          class="btn btn-continue w-100 mt-3"
          :disabled="!isGuestFormValid"
        >
          CONTINUE
        </button>
      </div>
    </div>

  </div>
</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

const step = ref(1)
const maxStep = ref(1) 
const checkIn = ref("2026-03-30")
const checkOut = ref("2026-03-31")
const guests = ref(1)
const selectedRoom = ref(null)

const goNextStep = (nextStep) => {
  step.value = nextStep

  if (nextStep > maxStep.value) {
    maxStep.value = nextStep
  }
}
const nights = computed(() => {
  const inDate = new Date(checkIn.value)
  const outDate = new Date(checkOut.value)
  return (outDate - inDate) / (1000 * 60 * 60 * 24)
})

const guest = ref({
  firstName: '',
  lastName: '',
  address: '',
  contact: '',
  arrival: ''
})
const isGuestFormValid = computed(() => {
  return (
    guest.value.firstName &&
    guest.value.lastName &&
    guest.value.address &&
    guest.value.contact &&
    guest.value.arrival
  )
})
const marchDays = Array.from({ length: 31 }, (_, i) => i + 1)
const aprilDays = Array.from({ length: 30 }, (_, i) => i + 1)
const formatDate = (date) => {
  if (!date) return ''

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const rooms = [
  {
    name: "Beach Cabin",
    price: "5,000",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  },
  {
    name: "Garden Cabin",
    price: "6,500",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
  }
]

const selectRoom = (room) => {
  selectedRoom.value = room.name
}

const goToStep = (targetStep) => {
  if (targetStep <= maxStep.value) {
    step.value = targetStep
  }
}
</script>

<style scoped>
/* 🔥 FIXED STEP BAR */
.booking-steps {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

/* Step */
.step {
  text-align: center;
}

/* Circle */
.circle {
  width: 45px;
  height: 45px;
  border: 2px solid #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  background: #fff;
  color: #999;
  transition: 0.3s;
}

.step.active .circle {
  border-color: #333;
  color: #333;
}

.step.done .circle {
  background: #333;
  color: #fff;
  border-color: #333;
}

/* Line */
.line {
  width: 80px;
  height: 2px;
  background: #ddd;
  margin: 0 15px;
}

.line.active {
  background: #333;
}

/* Layout fix */
.booking-ui {
  min-height: 700px; /* prevents jumping */
}

/* Rooms */
.room-card {
  border: 1px solid #ddd;
  background: #fff;
}

.room-card.selected {
  border: 2px solid #f4b400;
}

.room-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* Summary */
.summary {
  background: #a08f6a;
  color: white;
  padding: 20px;
}

.summary-box {
  background: white;
  color: #333;
  padding: 10px;
}

/* Button */
.btn-continue {
  background: #f4b400;
  border: none;
  padding: 10px;
  font-weight: bold;
}

.btn-select {
  background: #f4b400;
  border: none;
  font-weight: bold;
}
</style>