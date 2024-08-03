# Vue-Router

Vue 프로젝트를 생성할때 vue create 초기 설정시 라우터를 선택하면 아래와 같은 기본 라우터 js파일이 생성된다.

## Router 인스턴스
- router.js 혹은 router/index.js
  ```js
  import Vue from 'vue'
  import Router from 'vue-router'
  import Home from './views/Home.vue'

  Vue.use(Router)

  export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      }
    ]
  })

  ```
  해당 라우터에서 라우터에 등록할 컴포넌트를 import문을 통해 불러온 뒤 라우터에 등록하여 사용한다.  
  export default문법을 통해 router 인스턴스를 생성하여 내보낸다.  
  new 연산자를 통한 Router 인스턴스의 매개변수로 mode, base, routes배열 3개의 프로퍼티를 가진 Object를 넘겨준다.  
  path에는 이동을 위해 주소창에 사용되는 주소를 입력하고, 컴포넌트를 등록한다.   
  import문을 통해 불러온 라우터에 등록할 컴포넌트를 routes 프로퍼티 배열에 선언해주는데, 이때 배열 내부에 들어갈 형태는 path, name, component 3개의 프로퍼티를 갖는 Object이며, 그중 component 프로퍼티에 import문을 통해 불러온 컴포넌트를 선언해준다.
  이로써, 등록한 path 주소와 컴포넌트가 라우터에 맵핑 된다.  
  (라우터에 등록된 path를 입력하면 해당 컴포넌트를 브라우저에 출력하는 원리이다.)

## router-view
   Router 인스턴스에 매개변수로 넘겨준 route들이 등록된 path와 일치하는 요청이 오면 해당 path와 매핑되는 컴포넌트를 <router-view/>영역에 출력한다.  
   path 주소가 바뀌면 영역에 출력되는 컴포넌트들이 바뀌게되며 페이지가 전환되는 효과를 볼수 있게 된다.

  -  App.vue
      ```vue
      <template>
        <div>
          <!-- router 출력될 영역 -->
          <router-view/>
        </div>
      </template>

      <script>
      </script>
      ```
      이때 해당 태그는 App.vue 컴포넌트에만 사용한다. 이유는 아래와 같다.

  - main.js
    ```js
    import '@babel/polyfill'
    import Vue from 'vue'
    import './plugins/vuetify'
    import App from './App.vue'
    import router from './router' // Router 인스턴스
    import store from './store'

    Vue.config.productionTip = false

    new Vue({
      router, //Router 인스턴스
      store,
      render: h => h(App)
    }).$mount('#app')
    ```
    최초 랜더링 되는 Vue 인스턴스를 관리하는 main.js에서 router를 Vue인스턴스에 담아주고 있기 때문이다.  
    render 프로퍼티에 App.vue 컴포넌트가 등록되어있고, router 인스턴스를 함께 Object형태의 매개변수로 넘겨주고있다.