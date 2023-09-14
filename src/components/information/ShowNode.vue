<template>
  <h1 class="title">Node</h1>

  <div>
    <pre>{{ JSON.stringify(node, null, 2) }}</pre>
  </div>
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
