<script>
</script>

<section class="hero-container d-flex-nw" id="hero">
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
      <a class="diagonal-button hero__button" href="#contact-us">
        <span class="button-slanted-content">Contact Us</span></a
      >
    </div>
  </div>
  <!-- Used for image of garage-->
  <div class="main-bg-img" />
</section>

<style>
  .hero-container {
    height: 100vh;
  }
  .hero {
    width: 55%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
  }

  .hero__white-bg {
    position: absolute;
    left: 0;
    width: 55%;
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
    background: url("/assets/img-2.jpg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    right: 0;
    z-index: -2;
  }

  /* MEDIA QUERIES */
  /* Extra large devices less than 1440px) */
  @media screen and (max-width: 1440px) {
    .hero__header {
      font-size: 2.5rem;
    }
    .hero__text {
      font-size: 0.85rem;
    }
  }
  /* Large devices less than 1061px */
  @media only screen and (max-width: 66.313rem) {
    .hero-container {
      height: 50rem;
    }
    .hero {
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: default;
    }
    .hero__header {
      font-size: 2.8rem;
      line-height: 1.2;
    }
    .hero__white-bg {
      position: absolute;
      left: 0;
      width: 100%;
      height: 50rem;
      background-color: rgba(8, 49, 99, 0.288);
      backdrop-filter: blur(5px);
      transform: skewX(0deg);
    }
    .main-bg-img {
      height: 50rem;
    }
    .hero__content {
      position: relative;
      text-align: center;
      width: 100vw;
      padding: 0 5.5rem;
    }
    .hero__text {
      color: #fff;
    }
    .hero__button {
      margin: 0 auto;
    }
  }
</style>
