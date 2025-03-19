<template>
  <div class="modal fade" id="registerModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header modal-header-register">
          <h5 class="modal-title">Sign Up</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="register">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <div class="input-group">
                <input v-model="name" type="text" class="form-control rounded-2" placeholder="Enter your full name">
                <span class="input-group-text">
                  <Icon name="mdi:envelope-outline" class="text-secondary"/>
                </span>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Email address</label>
              <div class="input-group">
                <input v-model="email" type="email" class="form-control rounded-2" placeholder="Enter your email">
                <span class="input-group-text">
                  <Icon name="mdi:envelope-outline" class="text-secondary"/>
                </span>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Birth date</label>
              <div class="input-group">
                <input v-model="birthDate" type="date" class="form-control rounded-2">
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Password</label>
              <div class="input-group">
                <input v-model="password" :type="showPassword ? 'text' : 'password'" class="form-control rounded-2" placeholder="Enter your password"/>
                <span class="input-group-text password-toggle" @click="togglePassword">
                  <Icon :name="showPassword ? 'tabler:eye-off' : 'tabler:eye'" class="text-secondary pointer"/>
                </span>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Confirm Password</label>
              <div class="input-group">
                <input v-model="confirmPassword" :type="showPassword1 ? 'text' : 'password'" class="form-control rounded-2" placeholder="Enter your password"/>
                <span class="input-group-text password-toggle" @click="togglePassword1">
                  <Icon :name="showPassword1 ? 'tabler:eye-off' : 'tabler:eye'" class="text-secondary pointer"/>
                </span>
              </div>
            </div>

            <button type="submit" class="btn btn-login text-white my-2 modal-header-register">Create account</button>
            <div class="register-link text-center">
              Already have an account? 
              <NuxtLink to="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#loginModal">Log in</NuxtLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useAsyncData } from 'nuxt/app';

const toast = useToast();

const name = ref('');
const email = ref('');
const birthDate = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showPassword1 = ref(false);

const togglePassword = () => (showPassword.value = !showPassword.value);
const togglePassword1 = () => (showPassword1.value = !showPassword1.value);

const register = async () => {
  if (password.value !== confirmPassword.value) {
    toast.error('Passwords do not match!', { timeout: 3000 });
    return;
  }

  try {
    const { data, error } = await useAsyncData('register', () =>
      $fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          name: name.value,
          email: email.value,
          birthdate: birthDate.value,
          password: password.value,
          password_confirmation: confirmPassword.value,
        },
      })
    );

    if (error.value) {
      toast.error(error.value.data?.message || 'Registration failed', { timeout: 3000 });
    } else {
      toast.success('Account created successfully!', { timeout: 2000 });
      name.value = email.value = birthDate.value = password.value = confirmPassword.value = '';
    }
  } catch (err) {
    toast.error('An unexpected error occurred.', { timeout: 3000 });
  }
};
</script>


<style scoped>
.modal-header-register {
  background: linear-gradient(135deg, #2ccc00, #62ff00);
}
</style>
