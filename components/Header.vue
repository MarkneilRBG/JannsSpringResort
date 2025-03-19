<template>
  <div>
    <nav 
      class="navbar navbar-expand-lg navbar-light fixed-top text-primary bg-dark bg-opacity-75"
      :class="{ 'hidden-navbar': !isNavbarVisible }"
      style="width: 100vw; overflow: hidden; transition: transform 0.3s ease-in-out;">
      <div class="container d-flex justify-content-between">
        <NuxtLink class="navbar-brand" to="#">Janns</NuxtLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item">
              <NuxtLink class="nav-link" :class="{ 'active-link': activeLink === 'Home'}" to="/">Home</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" :class="{ 'active-link': activeLink === 'About'}" to="about">About</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" :class="{ 'active-link': activeLink === 'Services'}" to="services">Services</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" :class="{ 'active-link': activeLink === 'Contact'}" to="contact">Contact</NuxtLink>
           
            </li>
            <li class="nav-item">
              <NuxtLink data-bs-toggle="modal" data-bs-target="#loginModal" class="nav-link" :class="{ 'active-link': activeLink === 'SignIn'}" to="contact">Sign In</NuxtLink>
           
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Modal for sign in -->
    <div class="modal fade" id="loginModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header modal-header-login">
            <h5 class="modal-title">Welcome Back!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Email address</label>
                <div class="input-group">
                  <input type="email" class="form-control rounded-2" placeholder="name@example.com">
                  <span class="input-group-text">
                    <Icon name="mdi:envelope-outline" class="text-secondary"/>
                  </span>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Password</label>
                <div class="input-group">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control rounded-2"
                    placeholder="Enter your password"
                  />
                  <span class="input-group-text password-toggle" @click="togglePassword">
                    <Icon :name="showPassword ? 'tabler:eye-off' : 'tabler:eye'" class="text-secondary pointer"/>
                  </span>
                </div>
              </div>

              <div class="form-check d-flex justify-content-between">
                <div>
                  <input type="checkbox" class="form-check-input" id="remember">
                  <label class="form-check-label" for="remember">Remember me</label>
                </div>
                <a href="#" class="text-decoration-none">Forgot password?</a>
              </div>
              <button type="submit" class="btn btn-login text-white my-2 modal-header-login">Sign In</button>
              <div class="register-link text-center">
                Don't have an account? 
                  <NuxtLink to="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#registerModal">Register now</NuxtLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

        <!-- Modal for register  -->
        <RegisterModal />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from '#app';
import { useToast } from 'vue-toastification';

const toast = useToast();


const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}
const showPassword1 = ref(false)
const togglePassword1 = () => {
  showPassword1.value = !showPassword1.value
}

const route = useRoute();
const activeLink = ref('');
const lastScrollY = ref(0);
const isNavbarVisible = ref(true);

const setActiveLink = (path) => {
  if (path === '/') activeLink.value = 'Home';
  else if (path === '/about') activeLink.value = 'About';
  else if (path === '/services') activeLink.value = 'Services';
  else if (path === '/contact') activeLink.value = 'Contact';
  else if (path === '/contact') activeLink.value = 'SignIn';
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  isNavbarVisible.value = currentScrollY < lastScrollY.value || currentScrollY <= 10;
  lastScrollY.value = currentScrollY;
};

onMounted(() => {
  setActiveLink(route.path);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

watch(() => route.path, (newPath) => setActiveLink(newPath));


// Registration form data
const name = ref('');
const email = ref('');
const birthDate = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const register = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match';
    toast.error('Passwords do not match!', {
      timeout: 3000, // 3 seconds
    });
    return;
  }

  try {
    const { data, error } = await useFetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        birthdate: birthDate.value,
        password: password.value,
        password_confirmation: confirmPassword.value,
      }),
    });

    if (error.value) {
      errorMessage.value = error.value.data?.message || 'Registration failed';
      toast.error(errorMessage.value, {
        timeout: 3000,
      });
    } else {
      successMessage.value = 'Account created successfully!';
      
      // Show success toast
      toast.success(successMessage.value, {
        timeout: 2000,
      });

      // Clear form fields
      name.value = '';
      email.value = '';
      birthDate.value = '';
      password.value = '';
      confirmPassword.value = '';
    }
  } catch (err) {
    errorMessage.value = 'An unexpected error occurred.';
    toast.error(errorMessage.value, {
      timeout: 3000,
    });
  }
};



</script>

<style scoped>


</style>
