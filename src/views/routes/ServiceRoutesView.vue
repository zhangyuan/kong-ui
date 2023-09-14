<script setup lang="ts">
import ListServiceRoutes from '../../components/routes/ListServiceRoutes.vue'
</script>

<template>
  <h1 class="title is-1">Routes</h1>
  <ListServiceRoutes :service_id="$route.params.service_id"/>
</template>
