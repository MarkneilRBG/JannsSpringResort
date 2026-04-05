<template>
  <div class="login-page d-flex flex-column align-items-center justify-content-center">

    <!-- CARD -->
    <div class="card shadow border-0 rounded-4 p-4 login-card">

      <div class="text-center mb-4">
        <h4 class="fw-bold mb-1">JANNS</h4>
        <p class="text-muted small">Spring Resort Management</p>
      </div>

      <form @submit.prevent="handleLogin">

        <!-- Email -->
        <div class="mb-3">
          <label class="form-label small fw-semibold">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="form-control rounded-3"
            placeholder="Enter your email"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label class="form-label small fw-semibold">Password</label>

          <div class="input-group password-group">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              class="form-control"
              placeholder="Enter your password"
              required
            />

            <button
              type="button"
              class="btn password-toggle"
              @click="showPassword = !showPassword"
            >
              <Icon :name="showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'" />
            </button>
          </div>
        </div>

        <!-- Error -->
        <div v-if="error" class="alert alert-danger py-2 small">
          {{ error }}
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="btn btn-primary w-100 rounded-3 fw-semibold py-2"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          Login
        </button>

      </form>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'auth'
})

const form = ref({
  email: '',
  password: ''
})

const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

// ✅ Use composable
const { apiFetch } = useApi()

// ✅ Redirect if already logged in
onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    navigateTo('/admin')
  }
})

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  console.log('LOGIN CLICKED')
  console.log(useRuntimeConfig().public.apiBase)
  try {
    const res = await apiFetch('/login', {
      method: 'POST',
      body: form.value
    })

    const token = useCookie('token')
    const user = useCookie('user')

    token.value = res.token
    user.value = res.user

    // ✅ Redirect
    await navigateTo('/admin')

  } catch (err) {
    console.log(err)

    if (err?.status === 422) {
      error.value = 'Please fill all fields correctly'
    } else if (err?.status === 401) {
      error.value = 'Invalid email or password'
    } else {
      error.value = err?.data?.message || 'Login failed'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

/* PAGE */
.login-page {
  position: relative;
  min-height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
}

/* BACKGROUND */
.login-page::before {
  content: "";
  position: absolute;
  inset: 0;

  background: url('/resort.jpg') center/cover no-repeat;

  filter: blur(6px) brightness(0.85);
  transform: scale(1.03);
  z-index: 0;
}

/* CONTENT ABOVE */
.login-page > * {
  position: relative;
  z-index: 1;
}

/* CARD */
.login-card {
  max-width: 360px;
  width: 100%;
  background: rgba(255,255,255,0.97);
  border-radius: 16px;
}

/* PASSWORD INPUT (CLEAN FIX) */
.password-group {
  border-radius: 10px;
  overflow: hidden;
}

.password-group .form-control {
  border-right: 0;
  box-shadow: none !important;
}

.password-group .form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}

.password-toggle {
  background: #f8f9fa;
  border-left: 0;
  border-color: #ced4da;
}

.password-toggle:hover {
  background: #e9ecef;
}

.password-toggle:focus {
  box-shadow: none;
}

/* BUTTON */
.btn-primary {
  background: #0d6efd;
  border: none;
}

.btn-primary:hover {
  background: #0b5ed7;
}

</style>