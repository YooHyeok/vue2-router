<template>
  <v-layout
    row wrap pt-5 text-xs-center
    style="max-width: 500px; margin: 0 auto">
    <v-flex xs12>
      <h1>Members</h1>
      <p>회원을 검색해주세요.</p>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        v-model="memberId"
        label="회원 번호를 입력하세요.">
      </v-text-field>
      <!-- <v-btn @click="$router.push({path: `/members/${userId}`}).catch(()=>{})">검색</v-btn> -->
      <v-btn @click="$router.push({
        name: 'members-detail',
        params: {
          memberId: memberId
        }
      }).catch(()=>{})">검색</v-btn>
    </v-flex>
    <v-flex xs12>
      <router-view><!-- /members의 하위경로를 출력 --></router-view>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      memberId: null
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log("before Route Enter")
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("before Route Leave")
    next();
  },
  created() {
    console.log("created")
  },
  destroyed() {
    console.log("destroyed")
  }
}
</script>
