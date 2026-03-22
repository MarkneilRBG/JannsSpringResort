<template>
  <div class="bg-light">
    <!-- CAROUSEL -->
    <Carousel />

    <!-- ABOUT  -->
    <div class="text-center mt-5 container px-md-12">
      <p class="font-tnr fs-1 text-secondary pt-5">Janns Spring Resort</p>
      <hr class="mx-auto border-2" width="40%" />
      <p class="font-carattere fs-1 text-secondary">Embrace the calm of nature</p>
      <p class="custom-padding-about text-secondary font-montserrat">
        Tucked away in the scenic town of Malilipot, Albay, along the Bypass Road in Barangay 1, Jann’s Spring Resort is a hidden paradise where nature’s beauty meets relaxation. This natural spring resort is the perfect getaway for families, friends, and travelers looking to unwind and reconnect with nature.
      </p>
      <p class="custom-padding-about text-secondary font-montserrat">
        At the heart of our resort is a large, crystal-clear spring pool, fed by pure, refreshing waters straight from nature. Whether you're floating under the sun or taking a rejuvenating dip, our pool offers an invigorating experience that soothes the body and soul.
      </p>
      <p class="custom-padding-about text-secondary font-montserrat">
        For those seeking a peaceful retreat or a venue for special occasions, our spacious cabin with a hall provides a cozy and inviting space for gatherings, celebrations, or even quiet moments of relaxation. Surrounded by lush greenery and the soothing sounds of flowing water, Jann’s Spring Resort offers a serene and refreshing ambiance, making it the perfect escape from the hustle and bustle of daily life.
      </p>
      <p class="custom-padding-about text-secondary font-montserrat">
        Come and experience the magic of nature, the comfort of a relaxing retreat, and the joy of making beautiful memories. Whether it’s a day of fun, a weekend getaway, or a special celebration, Jann’s Spring Resort welcomes you to unwind, recharge, and enjoy the beauty of the springs.
      </p>
    </div>

    <!-- MULTI-ITEM CAROUSEL -->
    <div class="container">
      <MultiCarousel />
    </div>

    <div class="container text-secondary text-center mt-5 px-md-12">
      <p>Experience the tranquility and beauty of Jann’s Spring Resort, where nature and relaxation come together. Discover the perfect escape from the everyday hustle, and create unforgettable memories with your loved ones.</p>
      <button class="btn btn-primary px-md-9"> Book Now </button>
    </div>
  
    <div class="container">
      <!-- <hr class="w-75 mx-auto mt-5" /> -->
    
      <div class="container mt-5 ">
        <h2 class="text-secondary text-center">Find Us</h2>
        <hr class="mx-auto border-2 pb-3 w-50"  />
        
        <div class="map-container row">
          <div class="col">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d7765.27034305503!2d123.73854947858626!3d13.310715369057535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x33a1adfcc489b175%3A0x16def4e888373db5!2sJann%E2%80%99s%20Spring%20Resort%2C%20Malilipot%2C%20Albay!3m2!1d13.3140179!2d123.73719879999999!4m0!5e0!3m2!1sen!2sph!4v1741663415395!5m2!1sen!2sph"
              width="100%"
              height="450"
              style="border:0;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="rounded-4">
            </iframe>
          </div>
          <div class="col-md-6 pt-md-6 pt-lg-0 pt-xl-0 pt-3">
            <div class="w-100 h-100 rounded-4 pb-3" style="background-color: white;">
              <div class="pt-5 px-5">
                <h3 class="h6 text-start fw-light font-jakarta">OUR LOCATION</h3>
                <p class="h4 py-3">Barangay 1 (Along the Bypass Road) Malilipot, Albay</p>
                <p class="h6 text-start fw-light font-jakarta">Experience the perfect balance of nature, comfort, and innovation at Janns Spring Resort. Let us take care of everything while you relax and enjoy.</p>
                <ul class="list-unstyled  ">
                  <li class="d-flex align-items-center">
                    <Icon name="material-symbols-light:arrow-right-rounded" size="2rem"/> 
                    1.3 kms away from the Malilipot Municipal Hall.
                  </li>
                  <li class="d-flex align-items-center">
                    <Icon name="material-symbols-light:arrow-right-rounded" size="2rem"/> 
                    6.0 kms away from the Tabaco Municipal Hall.
                  </li>
                  <li class="d-flex align-items-center">
                    <Icon name="material-symbols-light:arrow-right-rounded" size="2rem"/> 
                    9.0 kms away from Bacacay Municipal Hall.
                  </li>
                  <li class="d-flex align-items-center">
                    <Icon name="material-symbols-light:arrow-right-rounded" size="2rem"/> 
                    21.8 kms away from SM Legazpi City.
                  </li>
                </ul>
                <!-- <div class="justify-content-center d-flex">
                  <Button buttonText="Book Now"  />
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
  
    <Testimonials />
  </div>
  <DefaultTop />
  </div>

</template>

<style scoped>


/* .map-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
} */
</style>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';


//modal
const showModal = ref(false);
const today1 = ref(new Date().toISOString().split("T")[0]);
const tomorrow2 = ref(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]);


// SEO meta tags
useSeoMeta({
  title: 'Janns Spring Resort',
  description: 'Escape to Janns Spring Resort, a hidden paradise surrounded by lush greenery and crystal-clear spring waters. Perfect for relaxation, swimming, and nature retreats.',
  keywords: 'spring resort, vacation, nature getaway, relaxation, swimming, eco-tourism',
  author: 'Janns Spring Resort',
  ogTitle: 'Janns Spring Resort - A Nature Lover’s Paradise',
  ogDescription: 'Discover the beauty of Janns Spring Resort, where nature meets relaxation. Enjoy refreshing spring waters, scenic views, and a peaceful retreat from city life.',
  ogImage: '/resort.jpg',
  ogUrl: '[og:url]',
  ogType: 'website',
  ogLocale: 'en_US',
  twitterTitle: 'Janns Spring Resort - A Nature Lover’s Paradise',
  twitterDescription: 'Unwind in the serene environment of Janns Spring Resort, featuring natural spring pools, fresh air, and breathtaking landscapes.',
  twitterImage: '/resort.jpg',
  twitterCard: '/resort.jpg',
  robots: 'index, follow',
})

// Head configuration
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'ico',
      href: '/favicon.ico'
    }
  ],
  script: [
    {
      innerHTML: () => "console.log('test')", // This is a function
    }
  ]
})
</script>
