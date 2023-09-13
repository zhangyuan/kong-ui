<template>
  <h1 class="title">Services</h1>

  <div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Id</th>
          <th>Protocol</th>
          <th>Host</th>
          <th>Port</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services" v-bind:key="service.id">
          <td>
            <a @click="showDetails(service)">{{ service.name }}</a>
          </td>
          <td>{{ service.id }}</td>
          <td>{{ service.protocol }}</td>
          <td>{{ service.host }}</td>
          <td>{{ service.port }}</td>
          <td>
            <router-link :to="{name: 'routes', params: {service_id: service.name}}" class="button is-small">Routes</router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal" v-if="service" :class="{ 'is-active': service }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <pre>{{ JSON.stringify(service, null, 2) }}</pre>
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
      services: [],
      service: null
    }
  },
  mounted() {
    kong.listServices()
      .then((response) => {
        this.services = response.data.data
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
