<template>
  <div>
    <h1>아이디 {{ memberId }} 회원 수정</h1>
  </div>
</template>
<script>
export default {
  computed: {
    memberId() {
      return this.$route.params.memberId
    }
  },
}
</script>
