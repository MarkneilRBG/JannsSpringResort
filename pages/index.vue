<template>
  <div>
    <!-- CAROUSEL -->
    <Carousel />

    <!-- ABOUT  -->
    <div class="text-center mt-5 container px-md-12">
      <p class="font-tnr fs-1 text-secondary">Janns Spring Resort</p>
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
    
    <Testimonials />
  </div>


  <DefaultTop />
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';


//modal
const showModal = ref(false);
const today1 = ref(new Date().toISOString().split("T")[0]);
const tomorrow2 = ref(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]);


// Function to format a Date object as YYYY-MM-DD



// let mybutton = document.getElementById("myBtn");

// // When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//     console.log('testss')
//   } else {
//     mybutton.style.display = "none";
//     console.log('testss1')
//   }
// }

// // When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//   document.body.scrollTop = 0; // For Safari
//   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
// }





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
