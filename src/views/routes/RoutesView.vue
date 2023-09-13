<script>
export default {
  components: {ListRoutes}
}
import ListRoutes from '../../components/routes/ListRoutes.vue'
</script>

<template>
  <main>
    <list-routes :service_id="this.$route.params.service_id"/>
  </main>
</template>
