<template>
  <div>
    <h1>Users</h1>
    <p>파라미터.userId: {{ userId }}</p>
    <p>파라미터.name: {{ $route.params.name }}</p>
    <p>쿼리.group: {{ $route.query.group }}</p>
    <p>쿼리.category: {{ $route.query.category }}</p>
    <p>쿼리.name: {{ $route.query.name }}</p>
    <p>쿼리.address: {{ $route.query.address }}</p>
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
