<script>

</script>

<style>
  nav {
    position: fixed;
    z-index: 1;
    height: 100vh;
  }
  #menuToggle {
    display: block;
    position: relative;
    top: 50px;
    left: 50px;

    z-index: 3;

    -webkit-user-select: none;
    user-select: none;
  }

  #menuToggle a {
    text-decoration: none;
    color: white;

    transition: color 0.4s ease-in-out;
  }

  #menuToggle li:hover {
    color: #ef233c;
    font-weight: 400;
  }

  #menuToggle input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;

    cursor: pointer;

    opacity: 0; /* hide this */
    z-index: 2; /* and place it over the hamburger */

    -webkit-touch-callout: none;
  }

  /*
 * Just a quick hamburger
 */
  #menuToggle span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: #ef233c;
    border-radius: 3px;

    z-index: 1;

    transform-origin: 4px 0px;

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.6s ease-in-out;
  }

  #menuToggle span:first-child {
    transform-origin: 0% 0%;
  }

  #menuToggle span:nth-last-child(2) {
    transform-origin: 0% 100%;
  }

  /* 
 * Transform all the slices of hamburger
 * into a crossmark.
 */
  #menuToggle input:checked ~ span {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: #ef233c;
  }

  /*
 * But let's hide the middle one.
 */
  #menuToggle input:checked ~ span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }

  /*
 * Ohyeah and the last one should go the other direction
 */
  #menuToggle input:checked ~ span:nth-last-child(2) {
    transform: rotate(-45deg) translate(0, -1px);
  }

  /*
 * Make this absolute positioned
 * at the top left of the screen
 */
  #menu {
    position: absolute;
    width: 20rem;
    height: 60rem;
    margin: -100px 0 0 -50px;
    padding: 3rem;
    padding-top: 15rem;
    /* background: #011936; */
    list-style-type: none;
    -webkit-font-smoothing: antialiased;
    /* to stop flickering of text in safari */

    transform-origin: 0% 0%;
    transform: translate(-100%, 0);

    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  }

  #menu li {
    padding: 10px 0;
    font-size: 1.2rem;
    font-weight: 200;
    letter-spacing: 1.3px;
    transition: 0.3s color ease-in-out;
  }

  /*
 * And let's slide it in from the left
 */
  #menuToggle input:checked ~ ul {
    transform: none;
  }
</style>

<!--    Made by Erik Terwan    -->
<!--   24th of November 2015   -->
<!--        MIT License        -->
<nav role="navigation">
  <div id="menuToggle">
    <!--
    A fake / hidden checkbox is used as click reciever,
    so you can use the :checked selector on it.
    -->
    <input type="checkbox" />

    <!--
    Some spans to act as a hamburger.
    
    They are acting like a real hamburger,
    not that McDonalds stuff.
    -->
    <span />
    <span />
    <span />

    <!--
    Too bad the menu has to be inside of the button
    but hey, it's pure CSS magic.
    -->
    <ul id="menu" class="blue-gradient">
      <a href="/">
        <li>Home</li>
      </a>
      <a href="/">
        <li>Services</li>
      </a>
      <a href="/">
        <li>What We Service</li>
      </a>
      <a href="/">
        <li>About</li>
      </a>
      <a href="/">
        <li>Contact</li>
      </a>
      <a href="/">
        <li>Reviews</li>
      </a>
      <!-- <a href="https://erikterwan.com/" target="_blank"><li>Show me more</li></a> -->
    </ul>
  </div>
</nav>
