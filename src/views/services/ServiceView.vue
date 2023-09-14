<script setup lang="ts">
import ShowService from '../../components/services/ShowService.vue'
</script>

<template>
  <ShowService :service_id="this.$route.params.service_id" />
</template>
