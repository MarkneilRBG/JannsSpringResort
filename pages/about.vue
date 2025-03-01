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
    <section class="about py-5 ">
      <div class="container">
        
        <div class="row align-items-center  pt-5">
          <div class="pb-4">
            <h1 class="text-center font-carattere ">Janns Spring Resort</h1>
              <h3>
                Get to know us
              </h3>
              <p>
                Forget everything you know about country houses and hotels. We're not twee or precious - our glorious estates are all about enjoyment and fun.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. Quae consequuntur similique dolore itaque quod veritatis et, provident eaque in, repellat totam ratione autem deserunt nam, natus earum nihil?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil unde sed odit, quas itaque molestiae debitis rem, doloribus asperiores atque impedit dicta, ad omnis! Fuga, voluptates. Fuga doloremque officiis ab. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore culpa maxime illo tenetur et impedit reiciendis veniam at, magnam perspiciatis, esse nulla labore modi doloribus cupiditate nobis aperiam cum dignissimos.
              </p>
              <p>
                Read on to discover the story behind the Exclusive Collection, the family who got us here today and the purpose that continues to drive forward, together. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, libero quos hic pariatur dolorum ex vel quo accusantium ipsa blanditiis in nesciunt iusto enim soluta. Deleniti quaerat officia esse! Nihil?
              </p>
          </div>
          <div class="col-md-6">
            <h3>Our Story</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta perferendis nam asperiores a itaque odio, voluptates repellendus dignissimos est facilis delectus neque totam consectetur quis eum aliquam maxime quam eaque!Lorem
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, quisquam. Quae consequuntur similique dolore itaque quod veritatis et, provident eaque in, repellat totam ratione autem deserunt nam, natus earum nihil?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil unde sed odit, quas itaque molestiae debitis rem, doloribus asperiores atque impedit dicta, ad omnis! Fuga, voluptates. Fuga doloremque officiis ab. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore culpa maxime illo tenetur et impedit reiciendis veniam at, magnam perspiciatis, esse nulla labore modi doloribus cupiditate nobis aperiam cum dignissimos.
            </p>
          </div>
          <div class="col-md-6">
            <NuxtImg 
              src="resort.jpg" 
              alt="Janns Spring Resort" 
              class="img-fluid rounded" 
              quality="86"
            />
          </div>
        </div>
      </div>
    </section>

  <hr class="w-75 mx-auto " />
    <section>
      <div class="container my-5 w-50">
        <CardHorizontal
          title="Beautiful Resort"
          description="Experience the best vacation with breathtaking views and luxurious amenities."
          link="#"
        />
      </div>
    </section>
  <hr class="w-75 mx-auto" />
    <!-- Features Section -->
    <section class="features bg-light py-5">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-4 pb-4">
            <h4>Natural Spring Pools</h4>
            <p>Relax in our pristine spring waters, rich in minerals and naturally refreshing.</p>
            <NuxtImg src="resort1.jpg" alt="Natural Spring Pools" class="img-fluid rounded " />
          </div>
          <div class="col-md-4 pb-4">
            <h4>Scenic Surroundings</h4>
            <p>Enjoy breathtaking views and tranquil moments amidst lush greenery.</p>
            <NuxtImg src="resort.jpg" alt="Natural Spring Pools" class="img-fluid rounded" />
          </div>
          <div class="col-md-4">
            <h4>Luxury Accommodations</h4>
            <p>Stay in our cozy cottages and premium suites designed for comfort.</p>
            <NuxtImg src="resort2.jpg" alt="Natural Spring Pools" class="img-fluid rounded" />
          </div>
        </div>
      </div>
    </section>
    <!-- <section class="container">
      <div class="row">
        <p class="fs-4 fw-bold">Connect with us</p>
        <div class="col-md-4">
          <NuxtImg src="resort.jpg" class="img-fluid"></NuxtImg>
        </div>
        <div class="col-md-4 ">
          <NuxtImg src="resort.jpg" class="img-fluid"></NuxtImg>
        </div>
        <div class="col-4">
          <NuxtImg src="resort.jpg" class="img-fluid"></NuxtImg>
        </div>
      </div>
    </section> -->

  </div>

</template>

<style lang="scss" scoped>


.features i {
  font-size: 3rem;
  margin-bottom: 15px;
}

.features img {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
}



</style>
