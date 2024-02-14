<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <hr class="col-12 my-3" />

  <router-link class="btn purpleBtn smallBtn" to="/bio"><span>på bio</span></router-link>

  <router-link class="btn purpleBtn smallBtn" to="/pop"><span>populära</span></router-link>

  <router-link class="btn purpleBtn smallBtn" to="/trendiga"><span>trendiga</span></router-link>

  <router-link class="btn purpleBtn smallBtn" to="/topplista"><span>topplista</span></router-link>

  <hr class="col-12 my-3" />
</template>
