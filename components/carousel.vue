<template>
  <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner h-25">
      <div class="carousel-item active">
        <NuxtImg 
          src="resort.jpg" 
          class="d-block w-100 carousel-img" 
          alt="..."
          quality="86"
        />
        <div class="carousel-caption d-none d-md-block">
          <h5 class="fs-1">Relax and Unwind</h5>
          <p class="fs-5">Enjoy the serene atmosphere of Janns Spring Resort.</p>
        </div>
      </div>
      <div class="carousel-item">
        <NuxtImg 
          src="resort1.jpg" 
          class="d-block w-100 carousel-img" 
          alt="..." 
          quality="86"
        />
        <div class="carousel-caption d-none d-md-block">
          <h5 class="fs-1">Crystal Clear Waters</h5>
          <p class="fs-5">Dive into refreshing natural spring pools.</p>
        </div>
      </div>
      <div class="carousel-item">
        <NuxtImg 
          src="resort2.jpg" 
          class="d-block w-100 carousel-img" 
          alt="..." 
          quality="86"
        />
        <div class="carousel-caption d-none d-md-block">
          <h5 class="fs-1">Nature's Paradise</h5>
          <p class="fs-5">Experience tranquility surrounded by lush greenery.</p>
        </div>
      </div>
    </div>

    <!-- Compact Search Box Overlay -->
    <div class="position-absolute start-50 translate-middle-x w-75 p-2 bg-white rounded shadow d-none d-sm-block" style="top: 95%; z-index:10;">
      <form @submit.prevent style="width: 100%;">
        <div class="row g-2 align-items-center">
          <!-- Check-in -->
          <div class="col-sm d-flex align-items-center">
            <label for="checkIn" class="mb-0 me-2">From:</label>
            <input
              type="date"
              class="form-control text-secondary"
              id="checkIn"
              v-model="today"
              :min="minCheckIn"
            />
          </div>

          <!-- Check-out -->
          <div class="col-sm d-flex align-items-center">
            <label for="checkOut" class="mb-0 me-2">To:</label>
            <input 
              type="date" 
              class="form-control text-secondary" 
              id="checkOut" 
              v-model="tomorrow"
              :min="minCheckOut"
            />
          </div>

          <!-- Guests -->
          <div class="col-sm">
            <input class="form-control" type="number" name="guest" id="guest" placeholder="Enter number of guests" v-model.number="guests" min="1">
          </div>

          <!-- Search Button -->
          <div class="col-auto">
            <button type="button" class="btn btn-primary" @click="openModal">Book now</button>
          </div>
         </div>
       </form>
     </div>
    <!-- Button appear only in small screen size -->
    <div class="position-absolute w-100 d-flex justify-content-center" style="top: 47.5%; z-index:10;">
      <button type="button" class="btn btn-primary d-block d-sm-none btn-indigo-200" @click="openModal">Book Now</button>
    </div>
<!-- modal -->
    <div class="modal fade" id="bookingModal" tabindex="-1" aria-labelledby="bookingModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body position-relative">
            <button type="button" class="btn-close position-absolute top-0 end-0 m-2" data-bs-dismiss="modal" aria-label="Close"></button>
            <h1 class="text-center fs-5 pt-3">Janns Spring Resort Booking</h1>
            <p>Choose your dates and number of guests below:</p>

            <!-- Inline validation alert -->
            <div v-if="alertMessage" class="alert alert-danger" role="alert">
              {{ alertMessage }}
            </div>

            <form @submit.prevent>
              <div class="mb-3">
                <label for="modalName" class="form-label">Name:</label>
                <input type="text" class="form-control" id="modalName" v-model="customerName" placeholder="Full name">
              </div>
              <div class="mb-3">
                <label for="modalCheckIn" class="form-label">Check-in Date:</label>
                <input type="date" class="form-control" id="modalCheckIn" v-model="today" :min="minCheckIn">
              </div>
              <div class="mb-3">
                <label for="modalCheckOut" class="form-label">Check-out Date:</label>
                <input type="date" class="form-control" id="modalCheckOut" v-model="tomorrow" :min="minCheckOut">
              </div>
              <div class="mb-3">
                <label for="modalGuests" class="form-label">Guests:</label>
                <input type="number" class="form-control" id="modalGuests" v-model.number="guests" min="1" >
              </div>
              <button type="button" class="btn btn-success w-100" @click="confirmBooking">Confirm Booking</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- End Search Box Overlay -->

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';

const formatDate = (date) => {
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()
  return `${year}-${month}-${day}`
}

// Today's date in YYYY-MM-DD format
const today = ref(formatDate(new Date()))

// Tomorrow's date (Check-out should be 1 day ahead)
const tomorrow = ref(formatDate(new Date(new Date().setDate(new Date().getDate() + 1))))

// number of guests (default 1)
const guests = ref()

// customer name
const customerName = ref('')

// inline alert message for validation
const alertMessage = ref('')

// min values for inputs
const minCheckIn = computed(() => formatDate(new Date()))
const minCheckOut = computed(() => {
  const d = new Date(today.value)
  d.setDate(d.getDate() + 1)
  return formatDate(d)
})

// keep checkout at least one day after checkin
watch(today, (newVal) => {
  const checkInDate = new Date(newVal)
  const checkOutDate = new Date(tomorrow.value)
  // if checkout is same or before checkin, bump checkout
  if (checkOutDate <= checkInDate) {
    const d = new Date(newVal)
    d.setDate(d.getDate() + 1)
    tomorrow.value = formatDate(d)
  }
})

let bookingModalInstance = null

const openModal = async () => {
  const el = document.getElementById('bookingModal')
  if (!el) return

  let ModalCtor = window.bootstrap?.Modal
  if (!ModalCtor) {
    try {
      const bs = await import('bootstrap/dist/js/bootstrap.bundle')
      ModalCtor = bs.Modal || window.bootstrap?.Modal
    } catch (e) {
      console.warn('Bootstrap modal could not be loaded', e)
    }
  }

  if (ModalCtor) {
    bookingModalInstance = ModalCtor.getInstance(el) || new ModalCtor(el)
    bookingModalInstance.show()
  } else {
    el.classList.add('show')
    el.style.display = 'block'
    el.removeAttribute('aria-hidden')
    el.setAttribute('aria-modal', 'true')
  }
}

const confirmBooking = () => {
  alertMessage.value = ''

  if (!customerName.value || !customerName.value.trim()) {
    alertMessage.value = 'Please enter your name.'
    return
  }

  const checkInDate = new Date(today.value)
  const checkOutDate = new Date(tomorrow.value)
  if (isNaN(checkInDate) || isNaN(checkOutDate) || checkOutDate <= checkInDate) {
    alertMessage.value = 'Please select a valid check-in and check-out (checkout must be after check-in).'
    return
  }

  if (!Number.isFinite(guests.value) || guests.value < 1) {
    alertMessage.value = 'Please enter at least 1 guest.'
    return
  }

  const payload = {
    name: customerName.value.trim(),
    checkIn: today.value,
    checkOut: tomorrow.value,
    guests: Number(guests.value),
  }

  console.log('Booking confirmed', payload)

  // close modal
  const el = document.getElementById('bookingModal')
  const ModalCtor = window.bootstrap?.Modal
  if (ModalCtor) {
    const inst = ModalCtor.getInstance(el)
    inst?.hide()
  } else if (bookingModalInstance) {
    bookingModalInstance.hide()
  } else {
    el.classList.remove('show')
    el.style.display = 'none'
    el.setAttribute('aria-hidden', 'true')
    el.removeAttribute('aria-modal')
  }

  // optionally clear form or keep values; comment out to keep
  // customerName.value = ''
  // guests.value = 1
}

onUnmounted(() => {
  if (bookingModalInstance) {
    try { bookingModalInstance.hide() } catch {}
    bookingModalInstance = null
  }
})
</script>

<style scoped>
/* .carousel-img {
  object-fit: cover;
  height: 100%;
} */

/* Ensure the modal is centered and responsive */
.modal-dialog {
  max-width: 90%;
  width: auto;
}

.modal-body {
  padding: 2rem;
}

/* Compact view adjustments */
@media (max-width: 576px) {
  .carousel-caption {
    display: none;
  }

  .btn-indigo-200 {
    background-color: #6610f2;
    border-color: #6610f2;
  }
}
</style>
