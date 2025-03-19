<template>
  <div>
    <!-- Button to trigger modal -->
    <button class="btn btn-primary" @click="showModal = true">Open Modal</button>

    <!-- Modal with transition -->
    <Transition name="fade">
      <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header text-black">
              <h5 class="modal-title">Register</h5>
              <button type="button" class="btn-close" @click="showModal = false"></button>
            </div>
            <div class="modal-body">
              <p>This is the modal content.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Backdrop with transition -->
    <Transition name="fade">
      <div v-if="showModal" class="modal-backdrop fade show"></div>
    </Transition>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})
import { ref } from 'vue';
const showModal = ref(false);
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>