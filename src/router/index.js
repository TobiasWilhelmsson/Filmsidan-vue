import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import MoviePageView from '../views/MoviePageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: StartView
    },
    {
      path: '/:movieCategory',
      name: 'Filmer',
      component: MoviePageView
    },
    //så man kan välja antal filmer
    {
      path: '/:movieCategory/:numberOfMovies',
      component: MoviePageView
    }
  ]
})

export default router
