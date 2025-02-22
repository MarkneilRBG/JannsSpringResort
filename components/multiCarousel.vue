<template>
  <div>
    <div id="multiItemCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
      <div class="carousel-inner">
        <div v-for="(group, index) in groupedItems" :key="index" class="carousel-item" :class="{ active: index === 0 }">
          <div class="row">
            <div v-for="(item, i) in group" :key="i" class="col-md-4">
              <div class="card">
                <img :src="item.image" class="card-img-top custom-img" :alt="item.title" @click="openPreview(item.image)">
                <div class="card-body">
                  <h5 class="card-title">{{ item.title }}</h5>
                  <p class="card-text">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#multiItemCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#multiItemCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    
    <!-- Image Preview Modal -->
    <div v-if="previewImage" class="preview-modal show" @click="closePreview">
      <img :src="previewImage" class="preview-img animated-pop" alt="Preview">
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, onUnmounted, nextTick } from 'vue';

import pic1 from '~/assets/img/1041.jpg';
import pic2 from '~/assets/img/2774417.jpg';
import pic3 from '~/assets/img/2784401.jpg';
import pic4 from '~/assets/img/6221846.jpg';
import pic5 from '~/assets/img/6229893.jpg';
import pic6 from '~/assets/img/6271875.jpg';
const items = [
  { image: pic1, title: 'Lounge', description: 'Lorem Ipsum' },
  { image: pic2, title: 'Pool', description: 'Lorem Ipsum' },
  { image: pic3, title: 'Comfort Room', description: 'Lorem Ipsum' },
  { image: pic4, title: 'Cabin', description: 'Lorem Ipsum' },
  { image: pic5, title: 'Waiting Area', description: 'Lorem Ipsum' },
  { image: pic6, title: 'Hall', description: 'Lorem Ipsum' },
];
const itemsPerSlide = 3;
const groupedItems = computed(() => {
  return items.reduce((acc, item, index) => {
    const groupIndex = Math.floor(index / itemsPerSlide);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(item);
    return acc;
  }, []);
});

const previewImage = ref(null);
const isPreviewVisible = ref(false);

const openPreview = (image) => {
  previewImage.value = image;
  nextTick(() => {
    isPreviewVisible.value = true;
  });
};

const closePreview = () => {
  isPreviewVisible.value = false;
  setTimeout(() => {
    previewImage.value = null;
  }, 300);
};

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closePreview();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);

  const carouselElement = document.getElementById('multiItemCarousel');
  let startX = 0;
  let endX = 0;

  function handleSwipe() {
    if (endX < startX) {
      carouselElement.querySelector('.carousel-control-next').click();
    }
    if (endX > startX) {
      carouselElement.querySelector('.carousel-control-prev').click();
    }
  }

  // Touch events
  carouselElement.addEventListener('touchstart', (event) => {
    startX = event.changedTouches[0].screenX;
  });

  carouselElement.addEventListener('touchend', (event) => {
    endX = event.changedTouches[0].screenX;
    handleSwipe();
  });

  // Mouse events
  carouselElement.addEventListener('mousedown', (event) => {
    startX = event.clientX;
  });

  carouselElement.addEventListener('mouseup', (event) => {
    endX = event.clientX;
    handleSwipe();
  });

  // Scroll events
  carouselElement.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
      carouselElement.querySelector('.carousel-control-next').click();
    } else {
      carouselElement.querySelector('.carousel-control-prev').click();
    }
  });
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.carousel-item {
  transition: transform 0.6s ease-in-out;
  height: 400px;
}
.card {
  margin: 10px;
}
.custom-img {
  height: 300px;
  object-fit: cover;
  cursor: pointer;
}

/* Preview Modal Styles */
.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.preview-modal.show {
  opacity: 1;
  transform: scale(1);
}

.preview-img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
}
</style>
