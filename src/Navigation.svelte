<script>
</script>

<nav class="nav" role="navigation">
  <div class="menuToggle">
    <input type="checkbox" />

    <span />
    <span />
    <span />

    <ul class="menu blue-gradient">
      <li><a href="/">Home</a></li>
      <li><a href="/">Services</a></li>
      <li><a href="/">What We Service</a></li>
      <li><a href="/">About</a></li>
      <li><a href="/">Contact</a></li>
      <li><a href="/">Reviews</a></li>
    </ul>
  </div>
</nav>

<style>
  .nav {
    position: fixed;
    z-index: 1;
    height: 100vh;
  }

  .menuToggle {
    display: block;
    position: relative;
    top: 50px;
    left: 50px;
    z-index: 3;
    -webkit-user-select: none;
    user-select: none;
  }

  .menuToggle a {
    text-decoration: none;
    color: white;
    transition: color 0.4s ease-in-out;
  }

  .menuToggle li:hover a{
    color: #ef233c;
    font-weight: 400;
  }

  .menuToggle input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;
    cursor: pointer;
    opacity: 0; 
    z-index: 2; 
    -webkit-touch-callout: none;
  }

  .menuToggle span {
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

  .menuToggle span:first-child {
    transform-origin: 0% 0%;
  }
  .menuToggle span:nth-last-child(2) {
    transform-origin: 0% 100%;
  }
  .menuToggle input:checked ~ span {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: #ef233c;
  }
  .menuToggle input:checked ~ span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }
  .menuToggle input:checked ~ span:nth-last-child(2) {
    transform: rotate(-45deg) translate(0, -1px);
  }

  .menu {
    position: absolute;
    width: 20rem;
    height: 100vh;
    margin: -77px 0 0 -50px;
    padding: 3rem;
    padding-top: 15rem;
    list-style-type: none;
    -webkit-font-smoothing: antialiased;
    transform-origin: 0% 0%;
    transform: translate(-100%, 0);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  }

  .menu li {
    padding: 10px 0;
    font-size: 1.2rem;
    font-weight: 200;
    letter-spacing: 1.3px;
    transition: 0.3s color ease-in-out;
  }

  .menuToggle input:checked ~ ul {
    transform: none;
  }
</style>
