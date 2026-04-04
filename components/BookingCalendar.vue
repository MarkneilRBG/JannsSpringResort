<template>
  <div>
    <!-- 🔥 FIXED PROGRESS BAR (wrapped so it won't overlap content) -->
    <div class="booking-steps-wrap">
      <div class="booking-steps pt-5" role="tablist" aria-label="Booking steps">
       <template v-for="(s, idx) in stepsList" :key="idx">
         <div
           :class="['step', { active: step === (idx+1), done: step > (idx+1), clickable: maxStep >= (idx+1) }]"
           @click="goToStep(idx+1)"
           role="tab"
           :aria-selected="step === (idx+1)"
         >
           <div class="circle"><Icon :name="s.icon" /></div>
           <p class="step-label" v-html="s.label"></p>
         </div>
 
         <!-- line between steps (don't render after last step) -->
         <div v-if="idx < stepsList.length - 1" :class="['line', { active: step > (idx+1) }]"></div>
       </template>
      </div>
    </div>
 
     <!-- 🔥 ONE CONTAINER ONLY (IMPORTANT) -->
    <div class="container booking-ui">

      <!-- ===================== -->
      <!-- STEP 1: CALENDAR -->
      <!-- ===================== -->
      <div v-if="step === 1" class="pt-4">
        <div class="row mb-3 align-items-end">
          <div class="col-md-3">
            <label class="pb-1">Check-in</label>
            <input type="date" v-model="checkIn" class="form-control" />
          </div>

          <div class="col-md-3">
            <label class="pb-1">Check-out</label>
            <input type="date" v-model="checkOut" class="form-control" />
          </div>

          <div class="col-md-3">
            <label class="pb-1">Number of night(s)</label>
            <div class="form-control bg-light">
              {{ nights }} night(s)
            </div>
          </div>

          <div class="col-md-3">
            <label class="pb-1">Number of Guests</label>
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
                <div class="room-card" :class="{ selected: selectedRooms.some(r => r.name === room.name) }">
                  <img :src="room.image" />
                  <div class="p-3">
                    <h5>{{ room.name }}</h5>
                    <p>From PHP {{ room.price }} / night</p>

                    <button
                      class="btn btn-select w-100"
                      @click="selectRoom(room)"
                    >
                     {{ selectedRooms.some(r => r.name === room.name) ? 'SELECTED' : 'SELECT' }}
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
                <div v-if="selectedRooms.length">
                  <p v-for="room in selectedRooms" :key="room.name">
                    {{ room.name }} - PHP {{ room.price }}
                  </p>

                  <p>Nights: {{ nights }}</p>
                  <p><strong>Total: PHP {{ totalPrice }}</strong></p>
                </div>

                <hr />

                <p>Check-in Time: 03:00 PM</p>
                <p>Check-out Time: 12:00 PM</p>
              </div>

              <button
                class="btn btn-continue w-100 mt-3"
                :disabled="selectedRooms.length === 0"
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
                <div v-if="selectedRooms.length">
                  <p v-for="room in selectedRooms" :key="room.name">
                    {{ room.name }} - PHP {{ room.price }}
                  </p>

                  <p>Nights: {{ nights }}</p>
                  <p><strong>Total: PHP {{ totalPrice }}</strong></p>
                </div>

              <hr />

              <p>Check-in Time: 03:00 PM</p>
              <p>Check-out Time: 12:00 PM</p>
              </div>

              <button
                class="btn btn-continue w-100 mt-3"
                :disabled="!isGuestFormValid"
                @click="goNextStep(4)"
              >
                CONTINUE
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- ===================== -->
      <!-- STEP 4: CONFIRMATION (IMPROVED UI) -->
      <!-- ===================== -->
      <div v-if="step === 4" class="confirm-page">
        <div class="row g-4">

          <!-- LEFT CONTENT -->
          <div class="col-lg-8">
            <!-- BOOKING DETAILS -->
            <div class="confirm-card mt-3">
              <h5 class="card-title">Booking Details</h5>

              <div class="info-grid">
                <div><strong>Name:</strong></div><div>{{ guest.firstName }} {{ guest.lastName }}</div>
                <div><strong>Contact:</strong></div><div>{{ guest.contact }}</div>
                <div><strong>Arrival Time:</strong></div><div>{{ guest.arrival || '—' }}</div>
                <div class="pt-2"><strong>Stay:</strong></div>
                <div class="pt-2">{{ formatDate(checkIn) }} → {{ formatDate(checkOut) }}</div>
                <div><strong>Guests:</strong></div><div>{{ guests }}</div>
              </div>
            </div>

            <!-- SELECTED ROOMS -->
            <div class="confirm-card mt-3">
              <h5 class="card-title">Selected Cabin(s)</h5>

              <div class="room-list">
                <div v-if="selectedRooms.length === 0" class="muted">No room selected.</div>

                <div v-for="room in selectedRooms" :key="room.name" class="room-item">
                  <img :src="room.image" alt="" />
                  <div class="room-meta">
                    <div class="room-name">{{ room.name }}</div>
                    <div class="room-price">{{ formatCurrency(parseInt(room.price.replace(',', ''))) }} / night</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT PAYMENT SUMMARY -->
          <div class="col-lg-4">
            <div class="confirm-card summary-card sticky-lg">
              <h5 class="card-title">Payment Summary</h5>

              <div class="summary-row">
                <div>Rooms Total</div>
                <div class="text-muted">{{ formatCurrency(totalPrice) }}</div>
              </div>

              <div class="summary-row muted small">
                <div>Nights</div>
                <div>{{ nights }}</div>
              </div>

              <hr />

              <div class="summary-row total">
                <div>Total Amount</div>
                <div class="amount">{{ formatCurrency(totalPrice) }}</div>
              </div>

              <hr />

              <h6 class="mb-2">Payment Method</h6>

              <div class="payment-options">
                <label class="payment-option" :class="{selected: paymentMethod === 'cash'}">
                  <input type="radio" value="cash" v-model="paymentMethod" />
                  <div>
                    <div class="option-title">Pay on Arrival</div>
                    <div class="option-sub muted">Cash — no processing fee</div>
                  </div>
                </label>

                <label class="payment-option " :class="{selected: paymentMethod === 'gcash'}">
                  <input type="radio" value="gcash" v-model="paymentMethod" />
                  <div>
                    <div class="option-title">GCash</div>
                    <div class="option-sub muted">No extra fee</div>
                  </div>
                </label>

                <label class="payment-option soon" :class="{selected: paymentMethod === 'card'}">
                  <input type="radio" value="card" v-model="paymentMethod" />
                  <div>
                    <div class="option-title">Maya</div>
                    <div class="option-sub muted">Pay using credit or debit card</div>
                  </div>
                </label>
              </div>

              <button
                class="btn btn-pay w-100 mt-3"
                :disabled="isConfirmed || selectedRooms.length === 0"
                @click="confirmBooking"
              >
                {{ isConfirmed ? 'Booking Submitted' : 'Confirm Booking' }}
              </button>

              <button
                v-if="isConfirmed"
                class="btn btn-outline-secondary w-100 mt-2"
                @click="() => { /* placeholder for print or view */ }"
              >
                Print / Save Receipt
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
const selectedRooms = ref([])
const isConfirmed = ref(false)
const paymentMethod = ref('cash')

const goNextStep = (nextStep) => {
  // ensure valid progression and update maxStep
  step.value = nextStep
  if (nextStep > maxStep.value) {
    maxStep.value = nextStep
  }
}

const nights = computed(() => {
  const inDate = new Date(checkIn.value)
  const outDate = new Date(checkOut.value)
  const diff = Math.round((outDate - inDate) / (1000 * 60 * 60 * 24))
  return Math.max(0, diff)
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

// friendly currency formatter for PHP
const formatCurrency = (value) => {
  const n = Number(value) || 0
  return 'PHP ' + n.toLocaleString('en-PH')
}

const rooms = [
  {
    name: "Malobago Cabin",
    price: "5,000",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  },
  {
    name: "Talisay Cabin",
    price: "6,500",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
  }
]

const selectRoom = (room) => {
  const index = selectedRooms.value.findIndex(r => r.name === room.name)
  if (index > -1) {
    selectedRooms.value.splice(index, 1)
  } else {
    selectedRooms.value.push(room)
  }
}

const goToStep = (targetStep) => {
  if (targetStep <= maxStep.value) {
    step.value = targetStep
  }
}

const totalPrice = computed(() => {
  return selectedRooms.value.reduce((total, room) => {
    const price = parseInt(String(room.price).replace(',', ''))
    return total + (price * nights.value)
  }, 0)
})

const confirmBooking = () => {
  // disable further edits and mark confirmed
  isConfirmed.value = true
}

const stepsList = [
  { label: 'Check-in &amp; Check-out Date', icon: 'mdi:calendar' },
  { label: 'Select Rooms &amp; Rates', icon: 'mdi:bed' },
  { label: 'Guest Information', icon: 'mdi:account' },
  { label: 'Booking Confirmation', icon: 'mdi:check-circle' }
]
</script>

<style scoped>
/* compact responsive step bar */
.booking-steps {
  position: sticky;
  top: 72px;
  z-index: 20;
  background: #fafafa;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  justify-content: center;
  border-bottom: 1px solid #ececec;
}

/* Step */
.step {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 60px;
  cursor: default;
}
.step.clickable { cursor: pointer; }
.step.disabled { opacity: 0.5; pointer-events: none; }

/* Circle */
.circle {
  width: 36px;
  height: 36px;
  border: 2px solid #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: #999;
  transition: transform .18s, border-color .18s, background .18s;
  font-size: 16px;
}

.step.active .circle {
  border-color: #333;
  color: #333;
  transform: scale(1.05);
}

.step.done .circle {
  background: #333;
  color: #fff;
  border-color: #333;
}

/* Line */
.line {
  flex: 1 1 40px;
  height: 3px;
  background: #e6e6e6;
  margin: 0 10px;
  border-radius: 2px;
  transition: background-color 0.25s;
}

.line.active {
  background: #333;
}

/* label */
.step-label {
  font-size: 12px;
  line-height: 1;
  color: #555;
  white-space: nowrap;
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

/* Confirmation UI improvements */

/* HERO */
.confirm-hero {
  display: flex;
  gap: 14px;
  align-items: center;
  background: #e9f7ef;
  border: 1px solid #d7f0dd;
  padding: 14px;
  border-radius: 8px;
}
.confirm-hero.neutral {
  background: #f6f7fb;
  border-color: #eceff6;
}
.hero-icon {
  width: 48px;
  height: 48px;
  min-width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 22px;
  border-radius: 50%;
  background: #fff;
  color: #2e7d32;
  border: 2px solid #c8e6c9;
}
.confirm-hero.neutral .hero-icon {
  color: #3b5998;
  border-color: #dbe7fb;
}

/* Card title */
.card-title {
  margin: 0 0 8px 0;
  font-size: 16px;
}

/* Booking details grid */
.info-grid {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 8px 18px;
  align-items: start;
  font-size: 14px;
  color: #333;
}
.info-grid .muted { color: #777; }

/* Room list */
.room-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.room-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
}
.room-item img {
  width: 72px;
  height: 56px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}
.room-meta { flex: 1 1 auto; }
.room-name { font-weight: 600; }
.room-price { color: #666; font-size: 13px; }
.room-qty { color: #666; font-size: 13px; }

/* Payment summary */
.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.summary-row.muted { color: #777; font-size: 13px; }
.summary-row.total { font-weight: 700; font-size: 16px; }
.summary-row .amount { font-size: 20px; color: #2d2d2d; }

/* Payment options */
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.payment-option {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #eef0f3;
  cursor: pointer;
  transition: box-shadow .12s, transform .08s;
  background: #fff;
}
.payment-option input { display: none; }
.payment-option .option-title { font-weight: 600; }
.payment-option .option-sub { font-size: 13px; color: #777; }
.payment-option.selected {
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  border-color: #cfe8ff;
}

/* soon badge */
.payment-option.soon { opacity: 0.8; }

/* Sticky summary on large screens */
.sticky-lg { position: sticky; top: 100px; }

/* Buttons */
.btn-pay {
  background: #3b5bdb;
  color: #fff;
  border: none;
  padding: 12px;
  font-weight: 600;
  border-radius: 8px;
}
.btn-pay[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive stack for small screens */
@media (max-width: 991px) {
  .info-grid { grid-template-columns: 120px 1fr; }
  .sticky-lg { position: static; }
  .confirm-hero { gap: 10px; }
}
@media (max-width: 576px) {
  .info-grid { grid-template-columns: 1fr; }
  .hero-icon { width: 40px; height: 40px; min-width: 40px; font-size: 18px; }
  .room-item img { width: 64px; height: 48px; }
  .card-title { font-size: 15px; }
}

.confirm-header h3 {
  font-weight: 700;
  color: #2d2d2d;
}

.confirm-header p {
  color: #777;
  font-size: 14px;
}

/* Make cards pop */
.confirm-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 18px;
  border: 1px solid #eee;
  box-shadow: 0 8px 25px rgba(0,0,0,0.05);
  transition: transform 0.15s ease;
}

.confirm-card:hover {
  transform: translateY(-2px);
}

/* Improve section spacing */
.confirm-page {
  padding-top: 10px;
}

/* Better titles */
.card-title {
  font-size: 17px;
  font-weight: 700;
  color: #333;
}

/* Highlight total */
.amount {
  color: #3b5bdb;
}

/* Button upgrade */
.btn-pay {
  background: linear-gradient(135deg, #3b5bdb, #5c7cfa);
  border-radius: 10px;
  transition: all 0.2s ease;
}

.btn-pay:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(59,91,219,0.3);
}
</style>