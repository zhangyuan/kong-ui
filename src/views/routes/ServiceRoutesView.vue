<script setup lang="ts">
import ListServiceRoutes from '../../components/routes/ListServiceRoutes.vue'
</script>

<template>
  <ListServiceRoutes :service_id="$route.params.service_id"/>
</template>
