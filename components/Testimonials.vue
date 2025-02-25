<template>
  <div class="container py-5">
    <div id="testimonialCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <div class="card p-4 shadow-sm text-center">
            <img
              :src="testimonial.image"
              class="rounded-circle mx-auto mb-3"
              width="70"
              height="70"
              alt="User Image"
            />
            <h5 class="mb-1">{{ testimonial.name }}</h5>
            <p class="text-muted small mb-3">{{ testimonial.position }}</p>
            <p class="fst-italic text-muted">"{{ testimonial.message }}"</p>
          </div>
        </div>
      </div>
      <!-- Carousel Controls -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#testimonialCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#testimonialCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const testimonials = ref([
  {
    name: "John Doe",
    position: "CEO, Example Corp",
    message:
      "This is an amazing product! It has completely transformed the way we work. Highly recommended!",
    image: "https://cdn.vectorstock.com/i/500p/15/38/dragon-vector-52801538.jpg",
  },
  {
    name: "Jane Smith",
    position: "CTO, Tech Solutions",
    message:
      "The service is top-notch and the team is incredibly supportive. I love using this platform!",
    image: "https://static.vecteezy.com/system/resources/thumbnails/038/265/063/small_2x/ai-generated-dragon-cartoon-on-transparent-background-free-png.png",
  },
  {
    name: "Alice Johnson",
    position: "Marketing Head, Creative Inc.",
    message:
      "A game changer in the industry. The results have been fantastic since we started using it.",
    image: "https://img.pikbest.com/origin/10/11/86/pIkbEsT8IpIkbEsTwfu.png!w700wp",
  },
]);
</script>

<style scoped>
.carousel-item {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
</style>
