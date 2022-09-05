<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Navbar from './components/Navbar.vue';
  import Grid from './components/Grid.vue';
  import Keyboard from './components/Keyboard.vue';
</script>

<template>
  <Navbar /> 
  
  <main class="main">
    <div class="vertical-fit-80 flex align-vertical-center">
      <Grid />
    </div>
    
    <Keyboard />
  </main>
</template>