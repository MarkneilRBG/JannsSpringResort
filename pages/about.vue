<script setup>
useHead({
  title: 'About Us - Janns Spring Resort',
  meta: [
    { name: 'description', content: 'Discover the tranquility of Janns Spring Resort, a perfect getaway with natural springs, lush greenery, and premium amenities.' }
  ]
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero bg-primary text-white text-center py-5">
      <div class="container">
        <h1 class="display-4">Welcome to Janns Spring Resort</h1>
        <p class="lead">A serene escape surrounded by nature’s beauty</p>
      </div>
    </section>

    <!-- About Section -->
    <section class="about py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h2>Our Story</h2>
            <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta perferendis nam asperiores a itaque odio, voluptates repellendus dignissimos est facilis delectus neque totam consectetur quis eum aliquam maxime quam eaque!Lorem
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, quisquam. Quae consequuntur similique dolore itaque quod veritatis et, provident eaque in, repellat totam ratione autem deserunt nam, natus earum nihil?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil unde sed odit, quas itaque molestiae debitis rem, doloribus asperiores atque impedit dicta, ad omnis! Fuga, voluptates. Fuga doloremque officiis ab. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore culpa maxime illo tenetur et impedit reiciendis veniam at, magnam perspiciatis, esse nulla labore modi doloribus cupiditate nobis aperiam cum dignissimos.
            </p>
          </div>
          <div class="col-md-6">
            <NuxtImg src="resort.jpg" alt="Janns Spring Resort" class="img-fluid rounded"/>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features bg-light py-5">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-4">
            <i class="bi bi-water text-primary display-4"></i>
            <h4>Natural Spring Pools</h4>
            <p>Relax in our pristine spring waters, rich in minerals and naturally refreshing.</p>
            <NuxtImg src="resort1.jpg" alt="Natural Spring Pools" class="img-fluid rounded" />
          </div>
          <div class="col-md-4">
            <i class="bi bi-tree text-success display-4"></i>
            <h4>Scenic Surroundings</h4>
            <p>Enjoy breathtaking views and tranquil moments amidst lush greenery.</p>
            <NuxtImg src="resort.jpg" alt="Natural Spring Pools" class="img-fluid rounded" />
          </div>
          <div class="col-md-4">
            <i class="bi bi-house-heart text-danger display-4"></i>
            <h4>Luxury Accommodations</h4>
            <p>Stay in our cozy cottages and premium suites designed for comfort.</p>
            <NuxtImg src="resort2.jpg" alt="Natural Spring Pools" class="img-fluid rounded" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  background: url('') no-repeat center center;
  background-size: cover;
}

.features i {
  font-size: 3rem;
  margin-bottom: 15px;
}


</style>
