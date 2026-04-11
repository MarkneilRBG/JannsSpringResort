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
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

definePageMeta({
  layout: 'auth'
})

const toast = useToast()

const form = ref({
  email: '',
  password: ''
})

const showPassword = ref(false)
const loading = ref(false)

const { apiFetch } = useApi()

const handleLogin = async () => {
  loading.value = true

  try {
    const res = await apiFetch('/login', {
      method: 'POST',
      body: form.value
    })

    const token = useCookie('token')
    const user = useCookie('user')

    token.value = res.token
    user.value = res.user

    // ✅ Show toast
    toast.success(res.message || 'Login successful')

    // ✅ WAIT before redirect (match toast timeout)
    setTimeout(() => {
      navigateTo('/admin')
    }, 2000)

  } catch (err) {
    console.log('FULL ERROR:', err)

    let message = 'Something went wrong'

    if (err?.response?._data?.errors) {
      message = Object.values(err.response._data.errors)[0][0]
    } else if (err?.response?._data?.message) {
      message = err.response._data.message
    }

    toast.error(message)

  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.login-page::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url('/resort.jpg') center/cover no-repeat;
  filter: blur(6px) brightness(0.85);
  transform: scale(1.03);
  z-index: 0;
}

.login-page > * {
  position: relative;
  z-index: 1;
}

.login-card {
  max-width: 360px;
  width: 100%;
  background: rgba(255,255,255,0.97);
  border-radius: 16px;
}

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

.btn-primary {
  background: #0d6efd;
  border: none;
}

.btn-primary:hover {
  background: #0b5ed7;
}
</style>