<template>
  <h1 class="title is-1">Endpoints</h1>

  <div class="container">
    <table class="table is-fullwidth is-striped is-hoverable">
      <thead>
        <tr>
          <th>Endpoint</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="endpoint in endpoints" v-bind:key="endpoint">
          <span>{{ endpoint }}</span>
        </tr>
      </tbody>
    </table>
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
