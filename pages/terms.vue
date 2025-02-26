<template>
  <div class="container pt-6 pb-4">
    <h1 class="text-center fw-bold mb-4">Terms of Use</h1>
    <p class="text-muted text-center">Last updated: February 26, 2025</p>

    <hr class="mb-4" />

    <section>
      <h2 class="fw-bold">1. Welcome to Janns Spring Resort! 🌿</h2>
      <p>
        These Terms of Use ("Terms") govern your access to and use of our website, services, and resort facilities.  
        By visiting our site or making a booking, you agree to follow these rules—don’t worry, they’re simple!
      </p>
    </section>

    <section>
      <h2 class="fw-bold">2. Using Our Website & Services 💻</h2>
      <ul>
        <li>Be respectful—no spamming, hacking, or other shady activities.</li>
        <li>You must be at least **18 years old** to make a booking.</li>
        <li>Bookings are confirmed only after full or partial payment.</li>
      </ul>
    </section>

    <section>
      <h2 class="fw-bold">3. Resort Rules 🏊‍♂️</h2>
      <ul>
        <li><strong>Keep it clean!</strong> Respect nature—no littering.</li>
        <li><strong>Safety first!</strong> Follow all pool and resort safety guidelines.</li>
        <li><strong>Be kind!</strong> Respect other guests & staff.</li>
      </ul>
    </section>

    <section>
      <h2 class="fw-bold">4. Payments & Cancellations 💳</h2>
      <ul>
        <li>All transactions are **securely processed**.</li>
        <li><strong>Cancellation Policy:</strong> You can cancel up to **48 hours before check-in** for a full refund.</li>
        <li><strong>No-shows:</strong> Sorry, but we can’t offer refunds for no-shows.</li>
      </ul>
    </section>

    <section>
      <h2 class="fw-bold">5. Liability & Disclaimer 📜</h2>
      <p>
        We do our best to ensure a safe and enjoyable experience, but Janns Spring Resort is **not responsible** for  
        lost items, injuries, or unexpected events beyond our control (like bad weather).  
      </p>
    </section>

    <section>
      <h2 class="fw-bold">6. Changes to These Terms 🔄</h2>
      <p>
        We may update these Terms from time to time. If we do, we’ll post the changes here—so check back if you're curious!
      </p>
    </section>

    <section>
      <h2 class="fw-bold">7. Contact Us 📞</h2>
      <div>
        <p>Have questions? Reach out!</p>
        <ul>
          <li>Email: <a href="mailto:info@jannsspringresort.com">info@jannsspringresort.com</a></li>
          <li>Phone: +63 912 345 6789</li>
        </ul>
      </div>
    </section>


    <div class="text-center mt-5">
      <NuxtLink to="/" class="btn btn-primary">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup>
// SEO Meta Tags
useSeoMeta({
  title: 'Terms of Use - Janns Spring Resort',
  description: 'Understand the terms and conditions for using Janns Spring Resort’s website and services.',
  keywords: 'terms of use, resort policies, bookings, cancellations, Janns Spring Resort',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  ogTitle: 'Terms of Use - Janns Spring Resort',
  ogDescription: 'Explore the rules and policies when visiting Janns Spring Resort.',
  ogImage: '/resort.jpg',
  ogUrl: 'https://www.jannsspringresort.com/terms',
  twitterTitle: 'Terms of Use - Janns Spring Resort',
  twitterDescription: 'Learn about the policies and guidelines at Janns Spring Resort.',
  twitterImage: '/resort.jpg',
  twitterCard: 'summary_large_image',
});

// JSON-LD (Structured Data for SEO)
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms of Use - Janns Spring Resort",
        "description": "Guidelines and policies for using Janns Spring Resort services and website.",
        "url": "https://www.jannsspringresort.com/terms",
        "publisher": {
          "@type": "Organization",
          "name": "Janns Spring Resort",
          "url": "https://www.jannsspringresort.com",
          "logo": {
            "@type": "ImageObject",
            "url": "/logo.png"
          }
        }
      })
    }
  ]
});
</script>

<style scoped>
/* Mobile-first typography */
h2 {
  font-size: 1.5rem;
  margin-top: 20px;
  color: #2c3e50;
}

p, li {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  h2 {
    font-size: 1.25rem;
  }

  p, li {
    font-size: 1rem;
  }
}
</style>
