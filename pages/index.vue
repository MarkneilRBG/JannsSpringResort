<template>
  <div>
    <!-- CAROUSEL -->
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner h-25">
        <div class="carousel-item active">
          <NuxtImg src="resort.jpg" class="d-block w-100 carousel-img" alt="..."/>
          <div class="carousel-caption d-none d-md-block">
            <h5 class="fs-1">Relax and Unwind</h5>
            <p class="fs-5">Enjoy the serene atmosphere of Janns Spring Resort.</p>
          </div>
        </div>
        <div class="carousel-item">
          <NuxtImg src="resort1.jpg" class="d-block w-100 carousel-img" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5 class="fs-1">Crystal Clear Waters</h5>
            <p class="fs-5">Dive into refreshing natural spring pools.</p>
          </div>
        </div>
        <div class="carousel-item">
          <NuxtImg src="resort2.jpg" class="d-block w-100 carousel-img" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5 class="fs-1">Nature's Paradise</h5>
            <p class="fs-5">Experience tranquility surrounded by lush greenery.</p>
          </div>
        </div>
      </div>

      <!-- Compact Search Box Overlay -->
      <div class="position-absolute start-50 translate-middle-x w-75 p-2 bg-white rounded shadow d-none d-sm-block" style="top: 95%; z-index:10;">
        <form style="width: 100%;">
          <div class="row g-2 align-items-center">
            <!-- Check-in -->
            <div class="col-sm d-flex align-items-center">
              <label for="checkIn" class="mb-0 me-2">From:</label>
              <input
                type="date"
                class="form-control text-secondary"
                id="checkIn"
                v-model="today"
              />
            </div>

            <!-- Check-out -->
            <div class="col-sm d-flex align-items-center">
              <label for="checkOut" class="mb-0 me-2">To:</label>
              <input 
                type="date" 
                class="form-control text-secondary" 
                id="checkOut" 
                :value="tomorrow"
              />
            </div>

            <!-- Guests -->
            <div class="col-sm">
              <input class="form-control" type="number" name="guest" id="guest" placeholder="Enter number of guests">
            </div>

            <!-- Search Button -->
            <div class="col-auto">
              <Button button-text="Book now" />
            </div>
          </div>
        </form>
      </div>
      <!-- Button appear only in small screen size -->
      <div class="position-absolute w-100 d-flex justify-content-center" style="top: 47.5%; z-index:10;">
        <button class="btn btn-primary d-block d-sm-none btn-indigo-200 " data-bs-toggle="modal" data-bs-target="#exampleModal">Book Now</button>
      </div>
<!-- modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">

      <div class="modal-body">
        <button type="button" class="btn-close position-absolute top-0 end-0 m-2" data-bs-dismiss="modal" aria-label="Close"></button>
        <h1 class="text-center fs-5 pt-3">Book your stay</h1>
        <p>Choose your dates and number of guests below:</p>
        <form>
          <div class="mb-3">
            <label for="checkIn" class="form-label">Check-in Date:</label>
            <input type="date" class="form-control" id="checkIn" v-model="today">
          </div>
          <div class="mb-3">
            <label for="checkOut" class="form-label">Check-out Date:</label>
            <input type="date" class="form-control" id="checkOut" v-model="tomorrow">
          </div>
          <div class="mb-3">
            <label for="guests" class="form-label">Guests:</label>
            <input type="number" class="form-control" id="guests" placeholder="Enter number of guests">
          </div>
          <button type="button" class="btn btn-success w-100">Confirm Booking</button>
        </form>
      </div>
    </div>
  </div>
</div>



      <!-- End Search Box Overlay -->

      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

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
  <Testimonials />
</div>

<button 
  class="btn btn-success position-fixed  bottom-0 end-0 m-4" 
  style="z-index: 10000;" 
  v-if="showButton" 
  @click="scrollToTop" 
>
  <BaseIcon name="mdi:arrow-up-bold" size="1em" color="red" />

</button>
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

//modal
const showModal = ref(false);
const today1 = ref(new Date().toISOString().split("T")[0]);
const tomorrow2 = ref(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0]);

//scroll to top
const showButton = ref(false);

const handleScroll = () => {
  showButton.value = window.scrollY > 200;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Function to format a Date object as YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()
  return `${year}-${month}-${day}`
}

// Today's date in YYYY-MM-DD format
const today = ref(formatDate(new Date()))

// Tomorrow's date (Check-out should be 1 day ahead)
const tomorrow = ref(formatDate(new Date(new Date().setDate(new Date().getDate() + 1))))


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
