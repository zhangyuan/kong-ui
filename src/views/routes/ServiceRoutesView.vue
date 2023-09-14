<script>
export default {
  components: {ListServiceRoutes}
}
import ListServiceRoutes from '../../components/routes/ListServiceRoutes.vue'
</script>

<template>
  <ListServiceRoutes :service_id="this.$route.params.service_id"/>
</template>
