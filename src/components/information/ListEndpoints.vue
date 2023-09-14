<template>
  <h1 class="title is-1">Endpoints</h1>

  <div class="container">
    <ul>
      <li v-for="endpoint in endpoints" v-bind:key="endpoint">{{ endpoint }}</li>
    </ul>
  </div>
</template>

<script>
import { KongClient } from '../../providers/kong'
const kong = new KongClient()

export default {
  data() {
    return {
      endpoints: null
    }
  },
  mounted() {
    kong.listEndpoints()
      .then((response) => {
        this.endpoints = response.data.data
      })
  }
}
</script>
