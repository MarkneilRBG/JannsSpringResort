<template>
  <transition name="fade">
    <div v-if="show" class="modal-overlay" @click.self="closeModal">
      <transition name="slide-top">
        <div v-if="show" class="modal-content">
          <button class="btn-close position-absolute top-0 end-0 m-2" @click="closeModal"></button>
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>

<style scoped>
/* Modal Background Fade In/Out */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Slide from Top Animation */
.slide-top-enter-active, .slide-top-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.slide-top-enter-from {
  transform: translateY(-100px); /* Start from above */
  opacity: 0;
}
.slide-top-leave-to {
  transform: translateY(-100px); /* Move back up */
  opacity: 0;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  position: relative;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
}
</style>
