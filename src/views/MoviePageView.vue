<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import FooterComponent from '../components/FooterComponent.vue'
import ModalComponent from '../components/ModalComponent.vue'
import PageButtons from '../components/PageButtons.vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/store'

const store = useStore()
const apiKey = '611bb4984052c168a5390d2587b12add'
const router = useRouter()
let modalInfo = ref({ title: '', description: '', open: false })

//url beroende på "kategori"
let getApiUrl = () => {
  if (currentCategory.value === 'trendiga') {
    return `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}` + '&language=sv-SE'
  } else if (currentCategory.value === 'pop') {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}` + '&language=sv-SE'
  } else if (currentCategory.value === 'bio') {
    return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}` + '&language=sv-SE'
  } else if (currentCategory.value === 'topplista') {
    return `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}` + '&language=sv-SE'
  }
}

//Data för dynamisk content på sidor
const pageTitles = {
  trendiga: 'Trendiga filmer',
  pop: 'Populära filmer',
  bio: 'Filmer på bio',
  topplista: 'Topplista filmer'
}

const pageDescriptions = {
  trendiga:
    'Här kan du bläddra bland trendiga filmer. Du kan också välja någon av de andra kategorierna.',
  pop: 'Här kan du bläddra bland populära filmer. Du kan också välja någon av de andra kategorierna.',
  bio: 'Här kan du bläddra bland filmer som går på bio just nu. Du kan också välja någon av de andra kategorierna.',
  topplista:
    'Här kan du bläddra bland topplistan, det vill säga de filmer som har högst betyg någonsin. Du kan också välja någon av de andra kategorierna.'
}

let currentCategory = ref(router.currentRoute.value.params.movieCategory)
let title = ref(pageTitles[currentCategory.value])
let description = ref(pageDescriptions[currentCategory.value])

//Uppdatera content när man går till en ny sida
watchEffect(() => {
  currentCategory.value = router.currentRoute.value.params.movieCategory
  title.value = pageTitles[currentCategory.value]
  description.value = pageDescriptions[currentCategory.value]
})

//Definera modal
const handleReadMore = (movie) => {
  modalInfo.value = { title: movie.title, description: movie.overview, open: true }
}

//Hämtar filmer från store
onMounted(async () => {
  await store.fetchMovies(getApiUrl())
})

let noOfMoviesRequest = ref(20)
let noOfMoviesToShow = ref(20)

// watchEffect kör en funktion varje gång noOfMoviesRequest uppdateras
watchEffect(() => {
  noOfMoviesToShow.value = noOfMoviesRequest.value
  store.fetchMovies(getApiUrl())
})

//watcheffect visar antalet filmer beroende på URLen.
//Sätter 20 som default värde om inget nummer anges eller om det inte är ett nummer.
watchEffect(() => {
  const numberOfMoviesParam = Number(router.currentRoute.value.params.numberOfMovies)
  const numberOfMovies = isNaN(numberOfMoviesParam) ? 20 : numberOfMoviesParam
  noOfMoviesRequest.value = numberOfMovies
  noOfMoviesToShow.value = numberOfMovies
})

//Skapar en computed property som returnerar en array av filmer som ska visas, baserat på noOfMoviesToShow
const displayedMovies = computed(() => {
  return store.movies.slice(0, noOfMoviesToShow.value)
})
</script>

<template>
  <main>
    <div class="container my-5">
      <h1>{{ title }}</h1>
      <div class="col-lg-9 px-0">
        <p class="fs-5">{{ description }}</p>
        <PageButtons />
        <label for="no-of-movies">Antal filmer att visa: </label>
        <input type="number" v-model="noOfMoviesRequest" id="no-of-movies" min="1" max="20" />
        <p>
          Länka till denna sida ( /{{ currentCategory }}/{{ noOfMoviesRequest }} ):
          <router-link :to="`/${currentCategory}/${noOfMoviesRequest}`">Kopiera länk</router-link>
        </p>
      </div>
    </div>
    <div class="container">
      <div class="row" v-if="store.movies.length">
        <div class="col-md-4 col-sm-6 itemCard" v-for="movie in displayedMovies" :key="movie.id">
          <div class="box">
            <img
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              alt="Filmens poster"
            />
            <div class="box-content">
              <h3 class="title">{{ movie.title }}</h3>
              <p class="description">
                {{ `${movie.overview.split(' ').slice(0, 20).join(' ')}...` }}
              </p>
              <a href="#" class="boxLinks" @click.prevent="() => handleReadMore(movie)">
                Läs mer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalComponent :modalInfo="modalInfo" @close="modalInfo = { ...modalInfo, open: false }" />
    <FooterComponent />
  </main>
</template>

<style scoped>
/* Filmboxar */
.itemCard {
  margin-bottom: 50px;
}

.box {
  font-family: 'Comfortaa', sans-serif;
  border-radius: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 5px 25px -5px #000000,
    0 8px 20px -6px #000;
}

/* lila box i boxen, cool transition effect, innan den "landar" */
.box:before {
  content: '';
  background: #852d91b0;
  height: 0;
  border-radius: 0 0 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  transition: all 0.4s ease-in-out;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.4);
}

/* lila box när den landat */
.box:hover:before {
  height: 100%;
  border-radius: 10px;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
}

.box img {
  width: 100%;
  height: auto;
  transition: all 0.3s ease 0s;
}

.box:hover img {
  filter: blur(3px);
}

.box-content {
  color: #fff;
  width: 100%;
  padding: 0 15px;
  opacity: 0;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transition: all 0.4s ease 0.1s;
}

.box:hover .box-content {
  opacity: 1;
}

.box .title {
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  margin: 0 0 3px;
}

.box .description {
  font-size: 12px;
  font-weight: 100;
  letter-spacing: 0.5px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
  display: block;
  margin: 0 0 12px;
  font-family: 'Ubuntu', sans-serif;
}

@media only screen and (max-width: 575px) {
  .box .title {
    font-size: 22px;
  }

  .box .description {
    font-size: 19px;
  }
}

.boxLinks {
  text-decoration: none;
  margin-left: 25%;
  margin-top: 10px;
  color: #fff;
  display: block;
  font-size: 11px;
  max-width: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.35s ease 0s;
}

.boxLinks:hover {
  color: purple;
  background-color: white;
}

@media only screen and (max-width: 990px) {
  .box {
    margin: 0 0 30px;
  }
}

@media only screen and (min-width: 1200px) {
  .itemCard {
    max-width: 280px;
  }
}
</style>
