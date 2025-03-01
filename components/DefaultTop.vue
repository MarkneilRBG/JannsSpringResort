<template>
    <button 
      class="btn btn-success position-fixed  bottom-0 end-0 m-4" 
      style="z-index: 10000;" 
      v-if="showButton" 
      @click="scrollToTop" 
    >
    <BaseIcon 
      name="mdi:arrow-up-bold" 
      size="1em" 
      color="red" 
    />
  </button>
</template>

<script setup>
//scroll to top
const showButton = ref(false);

const handleScroll = () => {
  showButton.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>