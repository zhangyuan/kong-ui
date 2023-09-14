<template>
  <h1 class="title">Service</h1>
  <pre v-if="service">{{ JSON.stringify(service, null, 2) }}</pre>
</template>

<script>
import { KongClient } from '../../providers/kong'
const kong = new KongClient()

export default {
  props: ["service_id"],
  data() {
    return {
      service: null
    }
  },
  mounted() {
    kong.getService(this.service_id)
      .then((response) => {
        this.service = response.data
      })
  },
  methods: {
    showDetails(service) {
      this.service = service
      return
    },
    hideDetails() {
      this.service = null
    }
  }
}
</script>
