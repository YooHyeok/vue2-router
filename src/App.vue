<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <!-- 아래와 같이 $router 전역 변수를 통해 접근해서 경로를 변경하면, 동일한 경로에서 이동을 시도했을때 오류가 발생한다. -->
        <!-- <v-list-tile @click="$router.push({name: 'home', path:'/', query:{}, params:{}, replace: true })"> -->
        <v-list-tile router :to="{name: 'home' }" exact>
          <v-list-tile-action>
            <i class="fas fa-home"></i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile router :to="{name:'about'}" exact>
        <!-- <router-link :to="{name:'about' exact}"> <v-list-tile> -->
        <!-- <v-list-tile to="/about"> -->
          <v-list-tile-action>
            <i class="fas fa-user"></i>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        <!-- </v-list-tile> -->
        <!-- </v-list-tile> </router-link> -->
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <!-- router 출력될 영역 -->
      <router-view/>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  }),
  props: {
    source: String
  }
}
</script>