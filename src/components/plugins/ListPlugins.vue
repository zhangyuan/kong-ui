<template>
  <h1 class="title is-1">Plugins</h1>

  <div v-if="plugins === null">Loading...</div>
  <div v-else-if="plugins.length === 0">No plugins.</div>

  <div v-else class="container">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Id</th>
          <th>Enabled</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="plugin in plugins" v-bind:key="plugin.id">
          <td>{{ plugin.name }}</td>
          <td>{{ plugin.id }}</td>
          <td>
            <ion-icon :icon="checkmarkSharp" v-if="plugin.enabled"></ion-icon>
          </td>
          <td>
            <button @click="showDetails(plugin)" class="button is-small">Show Details</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal" v-if="plugin" :class="{'is-active': plugin}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <pre>{{ JSON.stringify(plugin, null, 2) }}</pre>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="hideDetails()"></button>
    </div>
  </div>
</template>

<style scoped>
</style>

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
      plugins: null,
      plugin: null,
    }
  },
  mounted() {
    kong.listPlugins().then((response) => {
        this.plugins = response.data.data
      })
  },
  methods: {
    showDetails(plugin) {
      this.plugin = plugin
    },
    hideDetails() {
      this.plugin = null
    }
  }
}
</script>
