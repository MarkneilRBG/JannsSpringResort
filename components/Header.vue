<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top text-primary bg-dark bg-opacity-75">
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
          <li class="nav-item active">
            <NuxtLink class="nav-link" to="#">Home</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="#">About</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="#">Portfolio</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="#">Services</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="#">Contact</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>
