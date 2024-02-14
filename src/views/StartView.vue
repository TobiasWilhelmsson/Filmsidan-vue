<template>
  <main>
    <section class="hero" id="start">
      <div class="herocontent">
        <h1>Filmsidan</h1>
        <p>Vad ska du se idag? Vi hjälper dig hitta rätt film.</p>
        <router-link class="btn purpleBtn" to="/trendiga"><span>Trendiga filmer</span></router-link>
        <router-link class="btn purpleBtn" to="/bio"><span>Filmer på bio</span></router-link>
        <router-link class="btn purpleBtn" to="/pop"><span>Populära filmer</span></router-link>
        <router-link class="btn purpleBtn" to="/topplista"><span>Topplista</span></router-link>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),
    url('src/assets/images/start.png');
  height: 100vh;
  background-size: cover;
}

.herocontent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  width: 1000px;
}

.herocontent h1 {
  font-family: 'Comfortaa' !important;
  font-size: 4.7rem;
  font-weight: 800;
}

.herocontent p {
  font-size: 1.6rem;
  font-weight: 300;
}

@media only screen and (max-width: 768px) {
  .herocontent h1 {
    font-size: 2.8rem;
  }

  .herocontent p {
    font-size: 1.1rem;
  }

  .herocontent {
    width: auto;
  }

  .pinkBtn {
    margin-bottom: 20px;
  }
}
</style>
