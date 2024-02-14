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

let getApiUrl = () => {
  const currentPath = router.currentRoute.value.path
  //kollar path och väljer ut filmer beroende på vilken sida man besöker.
  if (currentPath.includes('trendigafilmer')) {
    return `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}` + '&language=sv-SE'
  } else if (currentPath.includes('popfilmer')) {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}` + '&language=sv-SE'
  } else if (currentPath.includes('biofilmer')) {
    return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}` + '&language=sv-SE'
  } else if (currentPath.includes('kommandefilmer')) {
    return `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}` + '&language=sv-SE'
  } else if (currentPath.includes('topplistafilmer')) {
    return `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}` + '&language=sv-SE'
  }
}

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

//watchEffect kör en funktion varje gång noOfMoviesRequest uppdateras
watchEffect(() => {
  noOfMoviesToShow.value = noOfMoviesRequest.value
  store.fetchMovies(getApiUrl())
})

//watcheffect visar antalet filmer beroende på URLen.
watchEffect(() => {
  const numberOfMovies = Number(router.currentRoute.value.params.numberOfMovies)
  noOfMoviesRequest.value = numberOfMovies
  noOfMoviesToShow.value = numberOfMovies
})

//Skapar en computed property som returnerar en array av filmer som ska visas, baserat på noOfMoviesToShow
const displayedMovies = computed(() => {
  return store.movies.slice(0, noOfMoviesToShow.value)
})
