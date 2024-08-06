<template>
  <div>
    <h1>{{ memberId }}회원 상세정보</h1>
  </div>
</template>
<script>
export default {
  computed: {
    memberId() {
      return this.$route.params.memberId
    }
  }
}
</script>
