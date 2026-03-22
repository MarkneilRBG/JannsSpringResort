<template>
  <div class="bg-light text-secondary">

    <!-- 🟦 HEADER -->
    <div class="container text-center py-5">
      <h1 class="display-6 fw-medium pt-lg-5">
        Our Services
      </h1>
      <hr class="mx-auto border-2 w-25" />
      <p class="lead">
        Thoughtfully designed for comfort, convenience, and memorable stays
      </p>
    </div>

    <!-- 🟩 FEATURED SERVICE -->
    <div class="container pb-5">
      <div class="row align-items-center bg-white rounded-4 shadow-sm p-4">

        <div class="col-lg-6">
          <NuxtImg 
            src="https://picsum.photos/600/400" 
            class="w-100 rounded-3"
          />
        </div>

        <div class="col-lg-6 mt-4 mt-lg-0">
          <h3 class="fw-medium">Swimming Pool Experience</h3>
          <p class="text-muted">
            Enjoy our natural spring pool with refreshing water straight from nature.
            Perfect for relaxation, bonding, and escaping the heat.
          </p>

          <button class="btn btn-primary px-4">
            Explore More
          </button>
        </div>

      </div>
    </div>

    <!-- 🟦 STATS -->
    <div class="container pb-5">
      <div class="row text-center g-4">

        <div class="col-md-4">
          <h2 class="fw-semibold">100+</h2>
          <p class="text-muted">Happy Guests</p>
        </div>

        <div class="col-md-4">
          <h2 class="fw-semibold">10+</h2>
          <p class="text-muted">Amenities & Services</p>
        </div>

        <div class="col-md-4">
          <h2 class="fw-semibold">5★</h2>
          <p class="text-muted">Customer Satisfaction</p>
        </div>

      </div>
    </div>

    <!-- 🧩 SERVICES GRID -->
    <div class="container pb-5">
      <div class="row g-4 text-center">

        <div class="col-md-6 col-lg-4" v-for="(service, i) in services" :key="i">
          <div class="p-4 h-100 bg-white rounded-4 shadow-sm service-card">

            <i :class="service.icon + ' fs-1 mb-3 text-secondary'"></i>

            <h5 class="fw-medium">{{ service.title }}</h5>

            <p class="text-muted small">
              {{ service.desc }}
            </p>

          </div>
        </div>

      </div>
    </div>

    <!-- 🟩 HIGHLIGHT STRIP -->
    <div class="container pb-5">
      <div class="bg-white rounded-4 shadow-sm p-5 text-center">
        <h3 class="fw-medium mb-3">
          Designed for Relaxation & Connection
        </h3>
        <p class="text-muted">
          Whether you're here for a peaceful retreat or a joyful gathering,
          our services are crafted to give you comfort, convenience, and unforgettable experiences.
        </p>
      </div>
    </div>

    <!-- 🟨 ICON FEATURES -->
    <div class="container pb-5">
      <div class="row text-center g-4">

        <div class="col-md-4">
          <i class="bi bi-tree fs-2 mb-2"></i>
          <p class="small text-muted">Nature-Friendly Environment</p>
        </div>

        <div class="col-md-4">
          <i class="bi bi-droplet fs-2 mb-2"></i>
          <p class="small text-muted">Natural Spring Water</p>
        </div>

        <div class="col-md-4">
          <i class="bi bi-people fs-2 mb-2"></i>
          <p class="small text-muted">Family-Oriented Experience</p>
        </div>

      </div>
    </div>

    <!-- 🟥 CTA -->
    <div class="bg-white py-5">
      <div class="container text-center">
        <h3 class="fw-medium mb-3">
          Your Perfect Getaway Starts Here
        </h3>
        <p class="text-muted mb-4">
          Book your stay today and experience relaxation like never before.
        </p>
        <button class="btn btn-primary px-5 py-2">
          Book Now
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
const services = [
  {
    title: "Cottage Rentals",
    desc: "Comfortable cottages perfect for families and group stays.",
    icon: "bi bi-house"
  },
  {
    title: "Event Hosting",
    desc: "Celebrate special occasions in a relaxing natural environment.",
    icon: "bi bi-calendar-event"
  },
  {
    title: "Grilling Area",
    desc: "Enjoy outdoor cooking with friends and family.",
    icon: "bi bi-fire"
  },
  {
    title: "Parking Area",
    desc: "Safe and spacious parking for all guests.",
    icon: "bi bi-car-front"
  },
  {
    title: "Family Spaces",
    desc: "Open areas designed for bonding and relaxation.",
    icon: "bi bi-people"
  },
  {
    title: "Convenience Store",
    desc: "Quick access to snacks, drinks, and essentials.",
    icon: "bi bi-shop"
  }
]
</script>

<style scoped>
.service-card {
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-6px);
}
</style>