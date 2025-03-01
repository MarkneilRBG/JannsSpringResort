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
        <div class="modal fade" id="registerModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header modal-header-register">
            <h5 class="modal-title">Sign Up</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Name</label>
                <div class="input-group">
                  <input type="email" class="form-control rounded-2" placeholder="name@example.com">
                  <span class="input-group-text">
                    <Icon name="mdi:envelope-outline" class="text-secondary"/>
                  </span>
                </div>
              </div>
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
              <button type="submit" class="btn btn-login text-white my-2 modal-header-register">Create account</button>
              <div class="register-link text-center">
                Already have an account? 
                  <NuxtLink to="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#loginModal">Login</NuxtLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from '#app';

const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
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
</script>

<style scoped>
.hidden-navbar {
  transform: translateY(-100%);
}


.nav-link {
  position: relative;
  color: black;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
  display: inline-block;
  padding-bottom: 2px;
}

.active-link {
  color: #dc3545 !important;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: #dc3545;
  transition: width 0.2s ease-in-out;
}

.active-link::after {
  width: 100%;
}

.nav-link:hover {
  color: #dc3545;
}

.navbar {
  width: 100%;
  overflow: hidden;
}

.modal-content {
    border: none;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.modal-header {

    padding: 20px;
    border: none;
    color: white;
}

.modal-header-login{
  background: linear-gradient(135deg, #0062cc, #0096ff);
}
.modal-header-register {
    background: linear-gradient(135deg, #2ccc00, #62ff00);
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
    z-index: 10; /* Increase z-index */
    color: #666;
    pointer-events: auto; /* Ensure clickability */
}

.input-group:focus-within .input-group-text {
    color: #0096ff; /* Change color when input is active */
}

.input-group {
    position: relative;
}

.btn-login {
    padding: 12px 20px;
    border: none;
    border-radius: 10px;
    font-weight: 500;
    width: 100%;
    transition: all 0.3s ease;
}

.btn-create-account {
  background: linear-gradient(135deg, #0062cc, #0096ff);
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


/* for navbar style */
.navbar-light .navbar-brand {
  color: #fff;
  font-size: 25px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
}

.navbar-light .navbar-nav .active > .nav-link,
.navbar-light .navbar-nav .nav-link.active,
.navbar-light .navbar-nav .nav-link.show,
.navbar-light .navbar-nav .show > .nav-link {
  color: #fff;
}

.navbar-light .navbar-nav .nav-link {
  color: #fff;
}

.navbar-toggler {
  background: #fff;
}

.navbar-nav {
  text-align: center;
}

.nav-link {
  padding: 0.2rem 1rem;
}

.nav-link.active,
.nav-link:focus {
  color: #fff;
}

.navbar-toggler {
  padding: 1px 5px;
  font-size: 18px;
  line-height: 0.3;
}

.navbar-light .navbar-nav .nav-link:focus,
.navbar-light .navbar-nav .nav-link:hover {
  color: #fff;
}


</style>
