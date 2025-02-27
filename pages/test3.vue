<template>
  <div class="container-fluid d-flex">
    <!-- Sidebar -->
    <aside class="sidebar d-flex flex-column">
      <h3 class="fw-bold text-center mb-3">Privacy Policy</h3>
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

const route = useRoute();
const router = useRouter();

// Sections Data
const sections = ref([
  { id: "introduction", title: "Introduction", content: `<p>Welcome to <strong>Janns Spring Resort</strong>! We value your privacy and are committed to protecting your personal information.</p>
      <p>By accessing our website, you agree to the terms outlined in this policy.</p>
      <ul>
        <li>We respect your privacy at all times.</li>
        <li>Your data will not be shared without your consent.</li>
        <li>Our policies comply with legal standards.</li>
        <li>We continuously update our security measures.</li>
      </ul>` },
  { id: "information", title: "Information We Collect", content: `<ul>
        <li><strong>Personal Information:</strong> Your name, email, phone number, and any details provided during reservations.</li>
        <li><strong>Payment Details:</strong> We process payments securely but do not store credit card information.</li>
        <li><strong>Usage Data:</strong> Information such as your IP address, browser type, pages visited, and time spent on our site.</li>
        <li><strong>Cookies & Tracking:</strong> We use cookies to enhance your browsing experience and analyze website traffic.</li>
      </ul>` },
  { id: "usage", title: "How We Use Your Information", content: `<p>We use the information we collect to:</p>
      <ul>
        <li>Process bookings and reservations efficiently.</li>
        <li>Improve our website and services based on user behavior.</li>
        <li>Send important updates, promotional offers, or resort-related news (with your consent).</li>
        <li>Enhance security and prevent fraudulent activities.</li>
      </ul>` },
  { id: "security", title: "Data Protection & Security", content: `<p>We take strong security measures to protect your data from unauthorized access, alteration, or disclosure.</p>
      <ul>
        <li>Secure Socket Layer (SSL) encryption to protect online transactions.</li>
        <li>Strict access control for personal information.</li>
        <li>Regular security audits and updates to safeguard your data.</li>
        <li>Compliance with industry security standards.</li>
      </ul>` },
  { id: "rights", title: "Your Rights & Choices", content: `<p>As a valued user, you have the right to:</p>
      <ul>
        <li>Request access to the personal data we have on file.</li>
        <li>Request corrections if any of your information is inaccurate.</li>
        <li>Ask us to delete your data (except when legally required to retain it).</li>
        <li>Opt-out of marketing emails by clicking the "unsubscribe" link.</li>
      </ul>` },
]);

// State Management with URL Persistence
const activeSection = useState("activeSection", () => route.query.section || "introduction");

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
