<template>
  <h1 class="title">Plugins</h1>

  <div class="container">
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
            <span :class="{disabled: !plugin.enabled}">{{ plugin.enabled }}</span>
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
import { KongClient } from '../../providers/kong'
const kong = new KongClient()

export default {
  data() {
    return {
      plugins: [],
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
