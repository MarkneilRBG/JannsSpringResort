<template>
  <div class="">
    <!-- Hero Section -->
    <section class="hero position-relative text-white text-center d-flex align-items-center justify-content-center">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="display-5 fw-bold">SANCTUARY FOR UNWINDING AND RECREATION</h1>
        <p class="lead">
          Lounge by the pool, pamper yourself with a spa experience, or get active in the fitness and activity centers.
        </p>
      </div>
    </section>

    <!-- Amenities Carousel Section -->
    <section class="py-5 text-center pb-7">
      <h2 class="fw-bold text-uppercase mb-4">Amenities</h2>

      <div class="container position-relative">
        <div class="carousel-wrapper">

          <!-- Prev Button -->
          <button class="carousel-nav carousel-prev" @click="slide('prev')">‹</button>

          <!-- Slide Window -->
          <div class="carousel-window" ref="windowEl">
            <div
              class="carousel-track"
              :style="{
                transform: `translateX(${translateX}px)`,
                transition: isAnimating ? 'transform 0.45s ease' : 'none'
              }"
              @transitionend="onAnimationEnd"
            >
              <!-- Extended slides including clones -->
              <div
                v-for="(amenity, i) in extendedSlides"
                :key="i"
                class="carousel-item-custom"
                :class="{ active: i === currentIndex, clicked: i === clickedIndex }"
                @click="onItemClick(amenity, i)"
              >
                <div class="card shadow-sm h-100">
                  <img :src="amenity.img" class="card-img-top" :alt="amenity.name" />
                  <div class="card-body text-center">
                    <h5 class="card-title">{{ amenity.name }}</h5>
                    <p class="card-text">{{ amenity.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Next Button -->
          <button class="carousel-nav carousel-next" @click="slide('next')">›</button>

        </div>
      </div>

      <!-- Compact animated modal -->
      <div v-if="selectedAmenity" class="amenity-modal-backdrop" @click.self="closeModal">
        <div class="amenity-modal-content" role="dialog" aria-modal="true">
          <button class="amenity-modal-close" @click="closeModal" aria-label="Close">×</button>
          <img :src="selectedAmenity.img" class="amenity-modal-img" :alt="selectedAmenity.name" />
          <h5 class="mt-3">{{ selectedAmenity.name }}</h5>
          <p class="text-muted">{{ selectedAmenity.description }}</p>
        </div>
      </div>
    </section>

    <!-- text sections -->

    <p class="container fw-bold fs-4 mt-4">
      Amenities
    </p>

<div class="container">
  <div class="row row-cols-1 row-cols-md-3 g-4 mt-2">
    <!-- Amenity 1 -->
    <div class="col">
      <div class="card h-100 text-center p-3">
        <i class="bi bi-wifi fs-1 mb-2"></i>
        <div class="card-body">
          <h5 class="card-title">Free Wi-Fi</h5>
          <p class="card-text">Stay connected with high-speed internet in all areas.</p>
        </div>
      </div>
    </div>

    <!-- Amenity 2 -->
    <div class="col">
      <div class="card h-100 text-center p-3">
        <i class="bi bi-shop fs-1 mb-2"></i>
        <div class="card-body">
          <h5 class="card-title">On-site Store</h5>
          <p class="card-text">Convenient access to snacks, drinks, and essentials.</p>
        </div>
      </div>
    </div>

    <!-- Amenity 3 -->
    <div class="col">
      <div class="card h-100 text-center p-3">
        <i class="bi bi-droplet fs-1 mb-2"></i>
        <div class="card-body">
          <h5 class="card-title">Swimming Pool</h5>
          <p class="card-text">Relax and unwind in our outdoor pool with lounge area.</p>
        </div>
      </div>
    </div>

    <!-- Amenity 4 -->
    <div class="col">
      <div class="card h-100 text-center p-3">
        <i class="bi bi-bicycle fs-1 mb-2"></i>
        <div class="card-body">
          <h5 class="card-title">Bicycle Rentals</h5>
          <p class="card-text">Explore the surroundings with our bike rental service.</p>
        </div>
      </div>
    </div>

    <!-- Amenity 5 -->
    <div class="col">
      <div class="card h-100 text-center p-3">
        <i class="bi bi-geo-alt fs-1 mb-2"></i>
        <div class="card-body">
          <h5 class="card-title">Guided Tours</h5>
          <p class="card-text">Discover local attractions with our expert guides.</p>
        </div>
      </div>
    </div>

    <!-- Amenity 6 -->
    <div class="col">
      <div class="card h-100 text-center p-3">
        <i class="bi bi-cup-hot fs-1 mb-2"></i>
        <div class="card-body">
          <h5 class="card-title">Cafe & Bar</h5>
          <p class="card-text">Enjoy delicious beverages and snacks any time.</p>
        </div>
      </div>
    </div>
  </div>
</div>

</div>
</template>
 
<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
 
// Data
const amenities = [
  { name: 'Pool with free-flowing water', img: 'https://picsum.photos/400/250', description: 'Relax and cool off...' },
  { name: 'Gazebo (4x8m)', img: 'https://picsum.photos/400/250', description: 'Spacious gazebo...' },
  { name: 'Cottage', img: 'https://picsum.photos/400/250', description: 'Cozy and airy cottage...' },
  { name: 'Bathroom', img: 'https://picsum.photos/400/250', description: 'Clean and well-maintained...' },
  { name: 'Outdoor shower area', img: 'https://picsum.photos/400/250', description: 'Rinse off...' },
  { name: 'Kitchen sink', img: 'https://picsum.photos/400/250', description: 'Basic kitchen sink...' },
  { name: 'Barbecue grill', img: 'https://picsum.photos/400/250', description: 'Enjoy a smoky feast...' },
  { name: 'Stone stove aka "pugon"', img: 'https://picsum.photos/400/250', description: 'Traditional cooking...' },
  { name: 'Smart TV', img: 'https://picsum.photos/400/250', description: 'Stay entertained...' },
  { name: 'Solar energy power supply', img: 'https://picsum.photos/400/250', description: 'Eco-friendly power...' },
  { name: 'Table and chairs', img: 'https://picsum.photos/400/250', description: 'Comfortable seating...' }
]

// Create cloned slides for looping
const extendedSlides = computed(() => [
  amenities[amenities.length - 1],
  ...amenities,
  amenities[0]
])

// Carousel state
const currentIndex = ref(1)   // index into extendedSlides (1..N are real slides)
const slideWidth = ref(330)
const isAnimating = ref(false)
const translateX = ref(0)

const gap = 30 // should match CSS gap
const itemWidth = ref(0)
const containerWidth = ref(0)
const centerOffset = ref(0)

const windowEl = ref(null)
let interval = null
let resizeTimeout = null

function updateSizes() {
  // measure item and container
  const item = document.querySelector('.carousel-item-custom')
  const container = windowEl.value || document.querySelector('.carousel-window')
  itemWidth.value = item ? item.offsetWidth : 330
  containerWidth.value = container ? container.offsetWidth : 1000
  slideWidth.value = itemWidth.value + gap
  centerOffset.value = (containerWidth.value - itemWidth.value) / 2
  // reposition to current index without animation
  setTranslateForIndex(currentIndex.value, false)
}

// set translate for a given extendedSlides index and decide if transition should be used
function setTranslateForIndex(index, withTransition = true) {
  isAnimating.value = !!withTransition
  translateX.value = -index * slideWidth.value + centerOffset.value
}

onMounted(() => {
  updateSizes()
  // start centered on the first real slide
  setTranslateForIndex(currentIndex.value, false)

  // auto-slide
  interval = setInterval(() => slide('next'), 4000)

  // resize listener (debounced)
  const onResize = () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(updateSizes, 120)
  }
  window.addEventListener('resize', onResize)
  // store so we can remove
  window._amenities_onResize = onResize
})

onUnmounted(() => {
  clearInterval(interval)
  if (window._amenities_onResize) {
    window.removeEventListener('resize', window._amenities_onResize)
    window._amenities_onResize = null
  }
})

// Slide control using currentIndex for clarity
const slide = (direction) => {
  if (isAnimating.value) return
  isAnimating.value = true
  const total = amenities.length

  if (direction === 'next') {
    currentIndex.value++
  } else {
    currentIndex.value--
  }

  setTranslateForIndex(currentIndex.value, true)
}

const onAnimationEnd = async () => {
  // We reached the end clones — jump to the corresponding real slide without transition
  const total = amenities.length

  if (currentIndex.value > total) {
    // moved to cloned first (index total+1) -> jump to real first (1)
    currentIndex.value = 1
    // disable transition and jump instantly
    await nextTick()
    setTranslateForIndex(currentIndex.value, false)
    isAnimating.value = false
    return
  }

  if (currentIndex.value < 1) {
    // moved to cloned last (index 0) -> jump to real last (total)
    currentIndex.value = total
    await nextTick()
    setTranslateForIndex(currentIndex.value, false)
    isAnimating.value = false
    return
  }

  // normal end of animation
  isAnimating.value = false
}

// Modal handling
const selectedAmenity = ref(null)
const openModal = (a) => (selectedAmenity.value = a)
const closeModal = () => (selectedAmenity.value = null)
 
// NEW: click-animation state and handler
const clickedIndex = ref(null)
let clickTimeout = null
 
const onItemClick = (amenity, index) => {
  // If user clicks a non-centered slide, move it to center instead of opening modal
  if (index !== currentIndex.value) {
    if (isAnimating.value) return
    isAnimating.value = true
    currentIndex.value = index
    // animate slide to center; onAnimationEnd will clear isAnimating
    setTranslateForIndex(currentIndex.value, true)
    return
  }
 
  // If user clicks the centered slide, play a short click animation then open a compact modal
  clearTimeout(clickTimeout)
  clickedIndex.value = index
  clickTimeout = setTimeout(() => {
    clickedIndex.value = null
    openModal(amenity)
  }, 160)
}
</script>
 
<style scoped>
.hero {
  height: 75vh;
  background-image: url('https://via.placeholder.com/1600x800?text=Hero+Image');
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 20px;
}

/* Carousel */
.carousel-wrapper {
  position: relative;
  width: 100%;
  display: grid; /* Fixes track centering issue */
  grid-template-columns: auto 1fr auto;
  align-items: center;
}


.carousel-window {
  overflow: hidden;
  width: 100%;
  position: relative;
}

.carousel-track {
  display: flex;
  gap: 30px;
  padding: 40px 20px;
  align-items: center;
  transition: transform 0.45s ease;
  /* track will be positioned via inline transform */
}

/* Slide */
.carousel-item-custom {
  flex: 0 0 calc((100% - 60px) / 3); /* Fix overflow */
  transform: scale(0.85);
  opacity: 0.5;
  transition: transform 0.35s ease, opacity 0.35s ease;
  pointer-events: none;
  box-sizing: border-box;
}

.carousel-item-custom .card {
  pointer-events: auto;
}

.carousel-item-custom.active {
  transform: scale(1.05);
  opacity: 1;
  z-index: 10;
}

/* Click animation */
.carousel-item-custom.clicked {
  transform: scale(1.12) !important;
  opacity: 1 !important;
  z-index: 20;
  box-shadow: 0 18px 40px rgba(0,0,0,0.25);
  transition: transform 140ms ease, opacity 140ms ease, box-shadow 140ms ease;
}
 
/* Compact animated modal styles (replaces large bootstrap modal) */
.amenity-modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.45);
  z-index: 1050;
  animation: amenity-fade 120ms ease;
}
.amenity-modal-content {
  position: relative;
  background: #fff;
  padding: 22px;
  border-radius: 12px;
  max-width: 760px;
  width: min(94%, 760px);
  box-shadow: 0 18px 40px rgba(0,0,0,0.22);
  text-align: center;
  transform: scale(.98);
  animation: amenity-scale 160ms cubic-bezier(.2,.9,.3,1) forwards;
}
.amenity-modal-img {
  width: 60%;
  height: auto;
  object-fit: cover;
  border-radius: 6px;
  display: block;
  margin: 0 auto;
}
.amenity-modal-close {
  position: absolute;
  top: 10px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.35rem;
  cursor: pointer;
  line-height: 1;
}
@keyframes amenity-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes amenity-scale { from { transform: scale(.96); opacity: 0 } to { transform: scale(1); opacity: 1 } }
 
.card-img-top {
  height: 250px;
  object-fit: cover;
}
</style>
