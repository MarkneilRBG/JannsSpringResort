<template>
  <div>
    <!-- 🔥 STEP UI -->
    <div class="booking-steps">
      <div class="step done">
        <div class="circle"><Icon name="mdi:check" /></div>
        <p>Check-in &<br />Check-out Date</p>
      </div>

      <div class="line active"></div>

      <div class="step active">
        <div class="circle"><Icon name="mdi:bed" /></div>
        <p>Select<br />Rooms & Rates</p>
      </div>

      <div class="line"></div>

      <div class="step">
        <div class="circle"><Icon name="mdi:account" /></div>
        <p>Guest<br />Information</p>
      </div>

      <div class="line"></div>

      <div class="step">
        <div class="circle"><Icon name="mdi:check-circle" /></div>
        <p>Booking<br />Confirmation</p>
      </div>
    </div>

    <!-- 🔥 MAIN -->
    <div class="container mt-4">
      <div class="row">
        
        <!-- LEFT: ROOMS -->
        <div class="col-md-8">
          <h2 class="mb-4">Select Room(s)</h2>

          <div class="row">
            <div class="col-md-6 mb-4" v-for="room in rooms" :key="room.name">
              <div class="room-card">
                <img :src="room.image" />
                <div class="p-3">
                  <h5>{{ room.name }}</h5>
                  <p class="price">From PHP {{ room.price }} / night</p>

                  <button class="btn btn-select w-100">
                    SELECT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: SUMMARY -->
        <div class="col-md-4">
          <div class="summary">
            <h4>Booking Summary</h4>

            <div class="summary-box">
              <p>
                Date : Mar 30, 2026 - Mar 31, 2026
                <a href="#">Edit</a>
              </p>

              <p>
                Guests : {{ guests }}
                <a href="#">Edit</a>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
const guests = 1

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
</script>

<style scoped>
/* 🔥 STEPS */
.booking-steps {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  padding: 25px;
}

.step {
  text-align: center;
}

.circle {
  width: 45px;
  height: 45px;
  border: 2px solid #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}

.step.active .circle {
  border-color: #333;
}

.step.done .circle {
  background: #333;
  color: #fff;
}

.line {
  width: 80px;
  height: 2px;
  background: #ddd;
  margin: 0 15px;
}

.line.active {
  background: #333;
}

/* 🔥 ROOMS */
.room-card {
  border: 1px solid #ddd;
  background: #fff;
}

.room-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.price {
  font-weight: 600;
  color: #333;
}

.btn-select {
  background: #f4b400;
  border: none;
  font-weight: 600;
}

.btn-select:hover {
  background: #e0a800;
}

/* 🔥 SUMMARY */
.summary {
  background: #a08f6a;
  color: white;
  padding: 20px;
}

.summary-box {
  background: white;
  color: #333;
  padding: 10px;
  margin-top: 10px;
}

.summary-box a {
  float: right;
  font-size: 12px;
}
</style>