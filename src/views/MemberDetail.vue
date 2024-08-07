<template>
  <div>
    <h1>아이디 {{ memberId }} 회원 상세정보</h1>
    <v-btn @click="edit">수정</v-btn>
  </div>
</template>
<script>
export default {
  computed: {
    memberId() {
      return this.$route.params.memberId
    }
  },
  methods: {
    edit() {
      // this.$router.push({name: 'members-edit'}) // 동등한 Children 계층이라면 parameter가 자동으로 넘어간다.
      this.$router.push({path: `/members/${this.memberId}/edit`}) // 풀 path 입력 /members/members/{id}/edit
      // this.$router.push({path: `${this.memberId}/edit`}) // 실제 등록한 path와 파라미터를 포함시켜야 이동가능하다.
    }
  }
}
</script>
