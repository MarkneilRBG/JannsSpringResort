<template>
  <div id="carouselExampleAutoplaying" class="carousel slide hero" data-bs-ride="carousel">
    
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="image-wrapper">
          <NuxtImg 
            src="resort.jpg" 
            class="d-block w-100 carousel-img" 
            alt="..."
            quality="86"
          />
          <div class="overlay"></div>
        </div>

        <!-- ✨ Centered Hero Content -->
        <div class="carousel-caption hero-content">
          <h1 class="hero-title">Relax and Unwind</h1>
          <p class="hero-subtitle">
            Enjoy the serene atmosphere of Janns Spring Resort.
          </p>

          <!-- 🔥 Aesthetic Button -->
          <button 
            class="btn btn-light btn-lg px-5 hero-btn"
            @click="goToSchedule"
          >
            Book Your Stay
          </button>
        </div>
      </div>

      <div class="carousel-item">
        <div class="image-wrapper">
          <NuxtImg src="resort1.jpg" class="d-block w-100 carousel-img" />
          <div class="overlay"></div>
        </div>
        <div class="carousel-caption hero-content">
          <h1 class="hero-title">Crystal Clear Waters</h1>
          <p class="hero-subtitle">Dive into refreshing natural spring pools.</p>
          <button class="btn btn-light btn-lg px-5 hero-btn" @click="goToSchedule">
            Book Your Stay
          </button>
        </div>
      </div>

      <div class="carousel-item">
        <div class="image-wrapper">
          <NuxtImg src="resort2.jpg" class="d-block w-100 carousel-img" />
          <div class="overlay"></div>
        </div>
        <div class="carousel-caption hero-content">
          <h1 class="hero-title">Nature's Paradise</h1>
          <p class="hero-subtitle">Experience tranquility surrounded by lush greenery.</p>
          <button class="btn btn-light btn-lg px-5 hero-btn" @click="goToSchedule">
            Book Your Stay
          </button>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>

    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToSchedule = () => {
  router.push('/check-in')
}
</script>

<style scoped>

/* 🌅 Hero container */
.hero {
  position: relative;
}

/* Image */
.carousel-img {
  height: 100vh;
  object-fit: cover;
}

/* 🌊 Overlay gradient (THIS is the aesthetic magic) */
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.2),
    rgba(0,0,0,0.5)
  );
}

/* Wrap image + overlay */
.image-wrapper {
  position: relative;
}

/* ✨ Center content */
.hero-content {
  top: 50%;
  transform: translateY(-50%);
  bottom: auto;
  text-align: center;
  animation: fadeUp 1s ease;
}

/* Title */
.hero-title {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 1px;
}

/* Subtitle */
.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 20px;
  opacity: 0.9;
}

/* 🔥 Button style */
.hero-btn {
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* Hover */
.hero-btn:hover {
  transform: translateY(-3px);
  background-color: #f8f9fa;
}

/* ✨ Animation */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%);
  }
}

/* Mobile */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}

</style>