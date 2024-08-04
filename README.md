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

# Lazy-Load와 WebpackChunkName & WebpackPrefecth
router.js파일에 `which is lazy-loaded when the route is visited.`라는 주석이 있다.  
기본적으로 Vue.js를 활용하여 만든 페이지는 싱글페이지 어플리케이션 이기 때문에 하나의 페이지에서 모든 작업이 일어난다.  
기존의 index.html같은 파일들을 각각의 폴더에 넣어 놓고 그 폴더 경로대로 사용자가 찾아가는 방식이 아닌, 전체 컴포넌트(라우터에 연결된 컴포넌트 포함)를 다 불러온 뒤 주소창에 어떤 값이 입력되면 해당 값에 따라서 하나씩 사용자에게 출력하는 형태이다.  
그렇기 때문에 최초에 전체 컴포넌트들을 다 불러온 뒤 라우터가 해당 컴포넌트들을 쥐고 있어야 한다.  
이때 라우터가 해당 컴포넌트들을 쥐고 있는 과정(로딩)이 굉장히 오래걸린다.  
- #### `webpackchunkName`: 청크(코드조각)의 이름을 정의하는 주석으로, 청크 파일의 이름을 설정한다. (default는 해시값)   어떤 값이 주소창에 입력되었을 때 이 값에 해당하는 컴포넌트의 내용만을 불러오겠다. 라는 의미로, 실제로 방문할 때만 컴포넌트를 로드하는 방식이다. 이것을 통해 초기 로드 시간과 대역폭 사용을 줄이는 데 도움을 준다.
  ```js
  export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
      }
    ]
  })
  ```
  `/* webpackChunkName: "home" */` 와 같이 주석 형태로 작성해준다.
  ```js
  const About = () => {
    return import(/* webpackChunkName: "home" */ './views/Home.vue') 
  }
  export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: About
      }
    ]
  })
  ```
  위와같이 변수로 관리할수도 있다.
- #### `webpackPrefetch`: 브라우저가 청크를 미리 로드하도록 지시하여, 페이지 전환 시의 성능을 향상시킨다.(캐싱)

# $router

router의 전역 instance이다. (main.js에서 최(초)상위 Vue인스턴스에 매개변수로 담아줌.)  
push함수를 사용하여 경로를 변경할 수 있게 된다.
```vue
<template>
  <div>
    <span @click="$router.push({name:'home'})">
      <h1>홈으로</h1>
    </sapn>
  </div>
<template>
```

그러나 위와같은 방식으로 사용한다면, 현재 페이지가 home인 경우에 home으로 이동하려고 시도하면 오류가 발생한다.  
Router에서는 router-link라는 template 내에 페이지를 전환할수 있는 기능을 제공해준다.

# router-link

`<a></a>` 즉, Anchor태그와 비슷한 기능으로 router에서는 url path에 따라 컴포넌트를 교체하기 위해 `<router-link>` 라는 태그를 사용해야 한다.

```vue
<template>
  <div>
    <router-link :to="{name:'home'}">
      <h1>홈으로</h1>
    </router-link>
  </div>
<template>
```

### vuetify에서의 router
vuetify에서는 특정 태그에서 router-link를 사용할 수 있다.
1. Buttons
    ```html
    <v-btn :to="{ name: 'home' }">Home</v-btn>
    ```
2. Navigation
    ```html
    <v-list-item :to="{ name: 'home' }">Home</v-list-item>
    ```
3. Tabs
    ```html
    <v-tab :to="{ name: 'home' }">Home</v-tab>
    ```
4. Breadcrumbs  
    ```html
    <v-breadcrumbs-item :to="{ name: 'home' }">Home</v-breadcrumbs-item>
    ```

## exact 속성
active활성화 관련 옵션으로, 링크를 완전일치 모드로 강제하는 옵션이다.  
예를들어 / path로 이동하였으나 /about path가 설정된 router-link도 active 활성화되기 때문에 두 태그에 모두 파란불이 들어온다.  
이는 /about이 /를 포함하고 있기 때문이며, exact 옵션을 사용하면 정확한 path경로를 구분하게 된다.
```vue
<template>
  <div>
    <v-list-item router :to="{name:'home'}" exact> <!-- path:/ -->
      <h1>홈으로</h1>
    </v-list-item>
    <v-list-item router :to="{name:'about'}" exact> <!-- path:/about -->
      <h1>상세페이지</h1>
    </v-list-item>
  </div>
<template>
```