<template>
  <div class="container-fluid d-flex">
    <!-- Sidebar -->
    <aside class="sidebar d-flex flex-column">
      <h3 class="fw-bold text-center mb-3">Terms of Use</h3>
      <nav class="nav flex-column flex-grow-1">
        <button 
          v-for="(section, index) in sections" 
          :key="index"
          class="nav-link"
          :class="{ active: activeSection === section.id }"
          @click="setActiveSection(section.id)"
        >
          {{ section.title }}
        </button>
      </nav>
      <NuxtLink class="btn btn-primary" to="/">Go to Index</NuxtLink>
    </aside>

    <!-- Content Area -->
    <main class="content p-4">
      <section v-for="(section, index) in sections" :key="index">
        <div v-show="activeSection === section.id">
          <h2 class="fw-bold">{{ section.title }}</h2>
          <p v-html="section.content"></p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useState } from "#app";

definePageMeta({
  layout: false
});

const route = useRoute();
const router = useRouter();

// Sections Data
const sections = ref([
  { id: "overview", title: "Overview", content: `<p>Welcome to <strong>Janns Spring Resort</strong>! These Terms of Use govern your use of our website.</p>` },
  { id: "eligibility", title: "Eligibility", content: `<p>You must be at least 18 years old to use our services.</p>` },
  { id: "user_conduct", title: "User Conduct", content: `<p>Users must behave responsibly and not engage in any unlawful activities.</p>` },
  { id: "liability", title: "Limitation of Liability", content: `<p>We are not liable for any indirect damages resulting from site usage.</p>` },
  { id: "termination", title: "Termination", content: `<p>We reserve the right to terminate accounts that violate these terms.</p>` },
]);

// State Management with URL Persistence
const activeSection = useState("activeSectionTerms", () => route.query.section || "overview");


const setActiveSection = (sectionId) => {
  activeSection.value = sectionId;
  router.replace({ query: { section: sectionId } });
};

// Watch URL for changes
watch(() => route.query.section, (newSection) => {
  if (newSection && sections.value.some(s => s.id === newSection)) {
    activeSection.value = newSection;
  }
});
</script>

<style scoped>
.container-fluid {
  display: flex;
}

/* Sidebar Styles */
.sidebar {
  width: 240px;
  background: #f8f9fa;
  border-right: 1px solid #ddd;
  padding: 20px;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
}

.nav-link {
  color: #555;
  text-align: left;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background 0.3s, color 0.3s;
  width: 100%;
  text-decoration: none;
  background: none;
  border: none;
  text-align: left;
}

.nav-link:hover {
  background: #e9ecef;
  color: #007bff;
}

.nav-link.active {
  font-weight: bold;
  background: #007bff;
  color: white;
}

.btn {
  margin-top: auto;
  padding: 10px;
  font-size: 16px;
}

/* Content Area */
.content {
  flex: 1;
  padding: 40px;
}

h2 {
  color: #2c3e50;
}
</style>
