import { defineStore } from 'pinia'
import axios from 'axios'

//Hämta filmer med axios
export const useStore = defineStore({
  id: 'movieStore',

  state: () => ({ movies: [] }),
  actions: {
    async fetchMovies(url) {
      const response = await axios.get(url)
      this.movies = response.data.results
    }
  }
})
