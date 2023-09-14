<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">Home</router-link>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link :to="{name: 'services'}" class="navbar-item">Services</router-link>
        <router-link :to="{name: 'routes'}" class="navbar-item">Routes</router-link>
        <router-link :to="{name: 'plugins'}" class="navbar-item">Plugins</router-link>
        <router-link :to="{name: 'node'}" class="navbar-item">Node Information</router-link>
        <router-link :to="{name: 'endpoints'}" class="navbar-item">Endpoints</router-link>
      </div>
    </div>
  </nav>

  <section class="section">
    <div class="container">
      <RouterView />
    </div>
  </section>
</template>

<style scoped>

</style>
