<template>
  <div>
    <h1>Users</h1>
    <p>파라미터: {{ userId }}</p>
    <p>파라미터: {{ $route.params.name }}</p>
  </div>
</template>
<script>
export default {
  computed: {
    userId() {
      return this.$route.params.userId
    }
  },
  created() {
    console.log('router', this.$router)
    console.log('route', this.$route)
  }
}
</script>
