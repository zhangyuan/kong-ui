<template>
  <h1 class="title is-1">Routes</h1>

  <div v-if="routes === null">Loading...</div>
  <div v-else-if="routes.length === 0">No routes.</div>
  <div v-else class="container">
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
          <td>
            <ul>
              <li v-for="(path, index) in route.paths" v-bind:key="index">
                {{ path }}
              </li>
            </ul>
          </td>
          <td>
            <button @click="showDetails(route)" class="button is-small">Show Details</button>
            <button @click="goToService(route)" class="button is-small">Service</button>
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
  data() {
    return {
      routes: null,
      route: null,
    }
  },
  mounted() {
    kong.listRoutes()
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
    },
    goToService(route) {
      kong.getRouteService(route.name)
        .then((response) => {
          const service = response.data
          this.$router.push({name: "service", params: {service_id: service.name}})
        })
    }
  }
}
</script>
