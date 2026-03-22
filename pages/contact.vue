<template>
  <div class="contact-page">

    <!-- 🟦 HERO CONTACT SECTION -->
    <section class="contact-hero d-flex align-items-center">

      <!-- Overlay -->
      <div class="overlay"></div>

      <div class="container position-relative">
        <div class="row align-items-center">

          <!-- 🟩 LEFT CONTENT -->
          <div class="col-lg-6 text-white mb-4 mb-lg-0">
            <h1 class="fw-semibold mb-3">
              You Have Questions,<br />
              We Have Answers
            </h1>

            <p class="mb-4">
              Discover experiences you won’t find anywhere else — thoughtfully designed to immerse you in the heart of the destination.
            </p>

            <div class="row small">

              <div class="col-6 mb-3">
                <h6 class="fw-semibold">Location</h6>
                <p>Malilipot, Albay</p>
              </div>

              <div class="col-6 mb-3">
                <h6 class="fw-semibold">Contact</h6>
                <p>0907 040 2818</p>
              </div>

              <div class="col-6 mb-3">
                <h6 class="fw-semibold">Email</h6>
                <p>jannspringresort@gmail.com</p>
              </div>

              <div class="col-6 mb-3">
                <h6 class="fw-semibold">Social</h6>
                <p>Facebook / Messenger</p>
              </div>

            </div>
          </div>

          <!-- 📝 RIGHT FORM -->
          <div class="col-lg-5 offset-lg-1">
            <div class="form-card p-4">

              <h5 class="fw-semibold mb-3">Tell Us What You Need</h5>

              <form @submit.prevent="submitForm">

                <div class="row g-3">

                  <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="First Name" v-model="form.firstName" required />
                  </div>

                  <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="Last Name" v-model="form.lastName" required />
                  </div>

                  <div class="col-12">
                    <input type="email" class="form-control" placeholder="Email Address" v-model="form.email" required />
                  </div>

                  <div class="col-12">
                    <input type="text" class="form-control" placeholder="Phone Number" v-model="form.phone" />
                  </div>

                  <!-- Inquiry Type -->
                  <div class="col-12">
                    <label class="small text-muted mb-2">Type of Inquiry</label>
                    <div class="d-flex flex-wrap gap-2">
                      <button type="button" class="btn btn-outline-secondary btn-sm">Booking</button>
                      <button type="button" class="btn btn-outline-secondary btn-sm">General</button>
                      <button type="button" class="btn btn-outline-secondary btn-sm">Event</button>
                    </div>
                  </div>

                  <div class="col-12">
                    <textarea class="form-control" rows="3" placeholder="Message" v-model="form.message"></textarea>
                  </div>

                </div>

                <div class="mt-3">
                  <button class="btn btn-dark w-100 rounded-pill">
                    Submit
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>

    </section>

  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
})

const submitForm = () => {
  console.log(form)
  alert('Submitted!')
}
</script>

<style scoped>
.contact-hero {
  min-height: 100vh;
  background: url('/resort.jpg') center/cover no-repeat;
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
}

/* FORM CARD */
.form-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
}

/* INPUT STYLE (clean like image) */
.form-control {
  border-radius: 999px;
  padding: 10px 15px;
}

textarea.form-control {
  border-radius: 12px;
}
</style>