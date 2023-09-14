<template>
  <h1 class="title">Services</h1>
  <div>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Id</th>
          <th>URL</th>
          <th>Enabled</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services" v-bind:key="service.id">
          <td>
            <router-link :to="{name: 'service', params: {service_id: service.name}}">{{ service.name }}</router-link>
          </td>
          <td>{{ service.id }}</td>
          <td>{{ service.protocol }}://{{ service.host }}:{{ service.port }}</td>
          <td>
            <ion-icon :icon="checkmarkSharp" v-if="service.enabled"></ion-icon>
          </td>
          <td>
            <button class="button is-small" @click="showDetails(service)">Details</button>
            <router-link :to="{name: 'service_routes', params: {service_id: service.name}}" class="button is-small">Routes</router-link>
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
import { IonIcon } from '@ionic/vue';
import { checkmarkSharp } from 'ionicons/icons';

import { KongClient } from '../../providers/kong'
const kong = new KongClient()



export default {
  components: { IonIcon },
  setup() {
    return { checkmarkSharp }
  },
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
