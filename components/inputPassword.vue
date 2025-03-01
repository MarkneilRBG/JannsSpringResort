<template>
  <div>
    <input
      :type="showPassword ? 'text' : 'password'"
      class="form-control"
      placeholder="Enter your password"
    />
    <button class="btn btn-outline-secondary" type="button" @click="togglePassword">
      <font-awesome-icon :icon="showPassword ? 'eye-slash' : 'eye'" />
    </button>

  </div>
</template>

<script setup>

import { ref } from 'vue'

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

</script>