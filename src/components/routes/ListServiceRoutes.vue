<template>
  <h1 class="title">Routes</h1>

  <div class="container">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Paths</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="route in routes" v-bind:key="route.id">
          <td>{{ route.name }}</td>
          <td>{{ route.paths }}</td>
          <td>
            <button @click="showDetails(route)" class="button is-small">Show Details</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal" v-if="route" :class="{'is-active': route}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <pre>{{ JSON.stringify(route, null, 2) }}</pre>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="hideDetails()"></button>
    </div>
  </div>
</template>

<script>
import { KongClient } from '../../providers/kong'
const kong = new KongClient()

export default {
  props: ['service_id'],
  data() {
    return {
      routes: [],
      route: null,
    }
  },
  mounted() {
    kong.listServiceRoutes(this.service_id)
      .then((response) => {
        this.routes = response.data.data
      })
  },
  methods: {
    showDetails(route) {
      this.route = route
    },
    hideDetails() {
      this.route = null
    }
  }
}
</script>
