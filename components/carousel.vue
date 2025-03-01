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
        <form style="width: 100%;">
          <div class="row g-2 align-items-center">
            <!-- Check-in -->
            <div class="col-sm d-flex align-items-center">
              <label for="checkIn" class="mb-0 me-2">From:</label>
              <input
                type="date"
                class="form-control text-secondary"
                id="checkIn"
                v-model="today"
              />
            </div>

            <!-- Check-out -->
            <div class="col-sm d-flex align-items-center">
              <label for="checkOut" class="mb-0 me-2">To:</label>
              <input 
                type="date" 
                class="form-control text-secondary" 
                id="checkOut" 
                :value="tomorrow"
              />
            </div>

            <!-- Guests -->
            <div class="col-sm">
              <input class="form-control" type="number" name="guest" id="guest" placeholder="Enter number of guests">
            </div>

            <!-- Search Button -->
            <div class="col-auto">
              <Button button-text="Book now" />
            </div>
          </div>
        </form>
      </div>
      <!-- Button appear only in small screen size -->
      <div class="position-absolute w-100 d-flex justify-content-center" style="top: 47.5%; z-index:10;">
        <button class="btn btn-primary d-block d-sm-none btn-indigo-200 " data-bs-toggle="modal" data-bs-target="#exampleModal">Book Now</button>
      </div>
<!-- modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <button type="button" class="btn-close position-absolute top-0 end-0 m-2" data-bs-dismiss="modal" aria-label="Close"></button>
              <h1 class="text-center fs-5 pt-3">Book your stay</h1>
              <p>Choose your dates and number of guests below:</p>
              <form>
                <div class="mb-3">
                  <label for="checkIn" class="form-label">Check-in Date:</label>
                  <input type="date" class="form-control" id="checkIn" v-model="today">
                </div>
                <div class="mb-3">
                  <label for="checkOut" class="form-label">Check-out Date:</label>
                  <input type="date" class="form-control" id="checkOut" v-model="tomorrow">
                </div>
                <div class="mb-3">
                  <label for="guests" class="form-label">Guests:</label>
                  <input type="number" class="form-control" id="guests" placeholder="Enter number of guests">
                </div>
                <button type="button" class="btn btn-success w-100">Confirm Booking</button>
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
import { ref, onMounted, onUnmounted } from 'vue';

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
</script>