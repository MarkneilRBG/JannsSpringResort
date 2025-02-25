<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top text-primary bg-dark bg-opacity-75" style="width: 100vw; overflow: hidden;">
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
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from '#app';

const route = useRoute();
const activeLink = ref('');

const setActiveLink = (path) => {
  if (path === '/') activeLink.value = 'Home';
  else if (path === '/about') activeLink.value = 'About';
  else if (path === '/services') activeLink.value = 'Services';
  else if (path === '/contact') activeLink.value = 'Contact';
};

onMounted(() => setActiveLink(route.path));
watch(() => route.path, (newPath) => setActiveLink(newPath)); 
</script>

<style scoped>
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
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
</style>
