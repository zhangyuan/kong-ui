<script setup lang="ts">

</script>

<template>
  <div class="box"><router-link :to="{name: 'services'}">Services</router-link></div>
  <div class="box"><router-link :to="{name: 'plugins'}">Plugins</router-link></div>
  <div class="box"><router-link :to="{name: 'node'}">Node Information</router-link></div>
  <div class="box"><router-link :to="{name: 'endpoints'}">Endpoints</router-link></div>
</template>
