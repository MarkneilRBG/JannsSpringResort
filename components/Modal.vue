<template>
  <div class="modal fade" :id="modalId" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Welcome Back!</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label class="form-label">Email address</label>
              <div class="input-group">
                <input v-model="email" type="email" class="form-control" placeholder="name@example.com" required>
                <span class="input-group-text">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Password</label>
              <div class="input-group">
                <input v-model="password" :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Enter your password" required>
                <span class="input-group-text password-toggle" @click="togglePasswordVisibility">
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </span>
              </div>
            </div>

            <div class="form-check">
              <div>
                <input v-model="remember" type="checkbox" class="form-check-input" id="remember">
                <label class="form-check-label" for="remember">Remember me</label>
              </div>
              <a href="#" class="text-decoration-none">Forgot password?</a>
            </div>

            <button type="submit" class="btn btn-login text-white">Sign In</button>

            <div class="divider">
              <span>or continue with</span>
            </div>

            <div class="social-login">
              <button type="button" class="btn btn-social" @click="loginWithGoogle">
                <i class="fab fa-google"></i>Google
              </button>
              <button type="button" class="btn btn-social" @click="loginWithFacebook">
                <i class="fab fa-facebook-f"></i>Facebook
              </button>
            </div>

            <div class="register-link">
              Don't have an account? <a href="#" class="text-decoration-none">Register now</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const remember = ref(false);
const showPassword = ref(false);
const modalId = ref('loginModal');

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = () => {
  console.log('Logging in:', { email: email.value, password: password.value, remember: remember.value });
};

const loginWithGoogle = () => {
  console.log('Logging in with Google');
};

const loginWithFacebook = () => {
  console.log('Logging in with Facebook');
};
</script>

<style scoped>
.modal-content {
  border: none;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.modal-header {
  background: linear-gradient(135deg, #0062cc, #0096ff);
  padding: 20px;
  border: none;
  color: white;
}
.modal-title {
  font-weight: 600;
}
.modal-body {
  padding: 30px;
}
.btn-close {
  filter: brightness(0) invert(1);
}
.form-control {
  padding: 12px 15px;
  border-radius: 10px;
  border: 2px solid #eee;
  transition: all 0.3s ease;
}
.form-control:focus {
  border-color: #0062cc;
  box-shadow: none;
}
.input-group-text {
  border: none;
  background: transparent;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
  color: #666;
}
.input-group {
  position: relative;
}
.btn-login {
  padding: 12px 20px;
  background: linear-gradient(135deg, #0062cc, #0096ff);
  border: none;
  border-radius: 10px;
  font-weight: 500;
  width: 100%;
  transition: all 0.3s ease;
}
.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 98, 204, 0.3);
}
.social-login {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.btn-social {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: 2px solid #eee;
  background: white;
  transition: all 0.3s ease;
}
.btn-social:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
}
.btn-social i {
  margin-right: 10px;
}
.divider {
  text-align: center;
  margin: 20px 0;
  position: relative;
}
.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background: #eee;
}
.divider::before {
  left: 0;
}
.divider::after {
  right: 0;
}
.divider span {
  background: white;
  padding: 0 10px;
  color: #666;
  font-size: 0.9rem;
}
.form-check {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}
.password-toggle {
  cursor: pointer;
}
.register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
}
</style>
