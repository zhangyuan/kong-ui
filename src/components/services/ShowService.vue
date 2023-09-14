<template>
  <div class="block">
    <h1 class="title is-1" v-if="service">Service: {{  service.name }}</h1>
  </div>
  <div class="block">
    <h2 class="title is-2" v-if="service">Configuration</h2>
    <pre v-if="service">{{ JSON.stringify(service, null, 2) }}</pre>
  </div>

  <div class="block">
    <div v-if="service">
      <h2 class="title is-2">Routes</h2>
    <ListServiceRoutes :service_id="service.id"/>
  </div>
</div>

</template>

<script>
import { KongClient } from '../../providers/kong'
import ListServiceRoutes from '../../components/routes/ListServiceRoutes.vue'
const kong = new KongClient()

export default {
  components: { ListServiceRoutes },
  props: ["service_id"],
  data() {
    return {
      service: null,
      routes: null
    }
  },
  mounted() {
    kong.getService(this.service_id)
      .then((response) => {
        this.service = response.data
      });
    kong.listServiceRoutes(this.service_id)
      .then((response) => {
        this.routes = response.data.data
      })
  },
  methods: {
  }
}
</script>
