<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <a class="navbar-brand" href="/">FILMSIDAN</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Start</router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filmer
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link class="dropdown-item" to="/bio">Filmer på bio</router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/pop">Populära filmer</router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/trendiga">Trendiga filmer</router-link>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <router-link class="dropdown-item" to="/topplista">Topplista filmer</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  z-index: 99;
  background: #222b31 !important;
  border-bottom: 4px solid #852d91 !important;
  box-shadow: 0 1px 56px -2px #000000;
}

.navbar-brand {
  font-size: 20px;
  color: #fff !important;
  letter-spacing: 3px;
}

.nav-link {
  letter-spacing: 3px;
  padding: 16px !important;
  color: #c4dee5 !important;
  text-transform: uppercase;
  position: relative;
  font-size: 12px;
  z-index: 1000;
}

.active {
  background: linear-gradient(135deg, #852d91, #312a6c);
  border-radius: 5px;
  width: 100%;
  height: 100%;
  color: white;
}

@media only screen and (min-width: 768px) {
  .nav-link:hover {
    background: linear-gradient(135deg, #852d91, #312a6c);
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }
}

.dropdown-menu {
  background: linear-gradient(135deg, #852d91, #312a6c);
  border: none;
}

.dropdown-item {
  letter-spacing: 3px;
  padding: 16px !important;
  color: #c4dee5 !important;
  text-transform: uppercase;
  position: relative;
  font-size: 12px;
}

.dropdown-item:hover {
  background-color: #450a4d;
  border-radius: 1px;
  box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.3);
}

nav a:hover {
  color: #fff !important;
}

.navbar .nav-item.dropdown:hover .dropdown-menu {
  margin-top: 0px;
  display: block;
}

.navbar .nav-item.dropdown:hover .dropdown-menu:hover {
  display: block;
}
</style>
