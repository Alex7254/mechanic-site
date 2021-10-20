<script>
</script>

<section class="d-flex-nw">
  <!-- Holds diagonal conainer and text -->
  <div class="hero">
    <!-- White diagonal container -->
    <div class="hero__white-bg" />
    <div class="hero__content">
      <h1 class="hero__header red-header">Easy Tune Up Mechanic Shop!</h1>
      <p class="hero__text light-text">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores ad
        ratione repudiandae, dolorem officia sunt voluptatibus optio adipisci
        dolore harum culpa. Architecto, provident explicabo! Iusto, esse, rem
        pariatur quibusdam ab quidem molestias nihil quo commodi provident vel
        temporibus. Ex quia est placeat quasi deleniti. In.
      </p>
      <a class="diagonal-button" href="#contact-us">
        <span class="button-slanted-content">Contact Us</span></a
      >
    </div>
  </div>
  <!-- Used for image of garage-->
  <div class="main-bg-img" />
</section>

<style>
  .hero {
    height: 100vh;
    width: 55%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
  }

  .hero__white-bg {
    position: absolute;
    /* top: 0;
    bottom: 0;
    right: 0; */
    left: 0;
    width: 55vw;
    height: 100%;
    background-color: white;
    transform: skewX(-6deg);
    transform-origin: top left;
  }

  .hero__content {
    position: relative;
    width: 35vw;
    padding: 1rem;
  }

  .hero__header {
    font-size: 3rem;
    font-weight: 900;
    transition: all 0.3s ease-in-out;
  }
  .hero__header:hover {
    text-shadow: 6px 6px 0px rgba(0, 0, 0, 0.2);
  }

  .hero__text {
    margin-bottom: 6rem;
    margin-top: 2rem;
  }
  .main-bg-img {
    background: url(https://images.unsplash.com/photo-1570129476815-ba368ac77013?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)
      no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    position: absolute;
    right: 0;
    z-index: -2;
  }

  /* Extra large devices less than 1440px) */
  @media only screen and (max-width: 90rem) {
    .hero__header {
      font-size: 2.5rem;
    }
    .hero__text {
      font-size: 0.85rem;
    }
  }
  /* Large devices less than 992px */
  @media only screen and (max-width: 84.063rem) {
  }
</style>
