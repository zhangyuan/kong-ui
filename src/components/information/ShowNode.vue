<template>
  <h1 class="title is-1">Node</h1>

  <div v-if="node">
    <pre>{{ JSON.stringify(node, null, 2) }}</pre>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { KongClient } from '../../providers/kong'
const kong = new KongClient()

export default {
  data() {
    return {
      node: null
    }
  },
  mounted() {
    kong.getNode()
      .then((response) => {
        this.node = response.data
      })
  }
}
</script>
