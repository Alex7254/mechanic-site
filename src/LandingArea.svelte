<script>

</script>

<style>
  .main-bg-img {
    background: url(https://images.unsplash.com/photo-1570129476815-ba368ac77013?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)
      no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100vh;
    width: 56vw;
  }

  .diagonal-container {
    width: 55vw;
    background-color: plum;
    height: 100vh;
  }

  header {
    /* position: relative; */
    height: 100vh;
    overflow: hidden;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header__bg {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 55vw;
    /* background-image: linear-gradient(#ff9d2f, #ff6126); */
    background-color: white;
    transform: skewX(-6deg);
    transform-origin: top left;
  }

  header .header-content {
    position: relative;
    /* background-color: bisque; */
    width: 35vw;
    padding: 1rem 1rem 1rem 2rem;
  }

  .header-content h1 {
    font-size: 3rem;
    font-weight: 900;
  }

  .header-content p {
    margin-bottom: 6rem;
  }
</style>

<div class="d-flex-nw">
  <!-- Container holds text content and image -->
  <section class="diagonal-container">
    <!-- Holds diagonal conainer and text -->
    <header>
      <div class="header__bg" />
      <div class="header-content">
        <h1 class="red-header">
          Easy Tune Up
          Mechanic Shop
        </h1>
        <p class="light-text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          ad ratione repudiandae, dolorem officia sunt voluptatibus optio
          adipisci dolore harum culpa. Architecto, provident explicabo! Iusto,
          esse, rem pariatur quibusdam ab quidem molestias nihil quo commodi
          provident vel temporibus. Ex quia est placeat quasi deleniti. In.
        </p>
        <div class="diagonal-button">
          <span class="button-slanted-content">Contact Us</span>
        </div>
      </div>
    </header>
  </section>
  <!-- Used for image -->
  <div class="main-bg-img" />
</div>
