<script>
  export let aboutImg = "./assets/img-1.jpg";
</script>

<section class="about-us blue-gradient" id="about">
  <div class="about-us__mw d-flex-nw">
    <div class="about-us__content">
      <h1 class="about-us__content__title">About Us</h1>
      <p class="about-us__content__text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo sit non
        corporis optio quod possimus numquam voluptatem earum molestiae
        accusantium excepturi totam, aut incidunt veniam itaque distinctio
        aliquam culpa sequi neque quam vero vitae officiis dolorum facilis.
        Tempore dolore id fuga pariatur praesentium labore perspiciatis,
        deserunt obcaecati deleniti beatae itaque assumenda sunt voluptates,
        doloribus modi impedit dolorum. Pariatur aperiam, quae nostrum enim
        corrupti perspiciatis maiores sit amet, harum expedita quas voluptates
        possimus perferendis!
      </p>
      <a class="diagonal-button hero__button" href="#reviews">
        <span class="button-slanted-content">Reviews</span></a
      >
    </div>
    <img
      class="about-us__img"
      src={aboutImg}
      alt="mechanic bending over to look under car"
    />
  </div>
</section>

<style>
  .about-us__mw {
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    max-width: 120rem;
    margin: auto;
    padding: 6rem 8%;
    position: relative;
  }
  .about-us {
    cursor: default;
  }

  .about-us__content {
    color: white;
    margin-right: 2rem;
    width: 40vw;
  }

  .about-us__img {
    height: 26rem;
    border-radius: 10px;
    object-fit: cover;
  }

  .about-us__content__title {
    font-weight: 900;
    letter-spacing: 1.5px;
    font-size: 2rem;
    border-bottom: solid 3px var(--red);
    width: auto;
    display: inline;
  }

  .about-us__content__text {
    line-height: 1.6rem;
    letter-spacing: 0.5px;
    margin: 2rem 2rem 5rem 0;
  }

  /* Extra large devices less than 1440px) */
  @media only screen and (max-width: 90rem) {
    .about-us__content__title {
      font-size: 1.8rem;
    }
    .about-us__content__text {
      font-size: 0.9rem;
    }
    .about-us__img {
      height: 22rem;
      width: 30rem;
    }
  }

  @media only screen and (max-width: 71.25rem) {
    .about-us {
      background: url(https://images.unsplash.com/photo-1543747255-94b72995ac74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)
        no-repeat center center fixed;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
    }
    .about-us__content {
      color: white;
      margin-right: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      padding: 3rem;
      backdrop-filter: blur(5px);
      border-radius: 0.4rem;
    }
    .about-us__content__title {
      z-index: 1;
      position: relative;
    }
    .about-us__content__text {
      font-size: 0.9rem;
      z-index: 1;
      position: relative;
    }
    .about-us__img {
      display: none;
    }
  }
</style>
