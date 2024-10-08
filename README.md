# *Vue-Router*

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

# *Lazy-Load와 WebpackChunkName & WebpackPrefecth*
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

# *$router*

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

# *router-link*

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

# *history 모드*
뷰 프로젝트 생성시 개발환경 설정에서 router 추가 후 history mode 설정을 YES로 적용하면 기본 세팅으로 적용된다.
history mode를 적용하지 않은 기본모드는 Hash이며 주소창에 /#/ 기호가 들어간다.

```js
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', //history 모드
  base: process.env.BASE_URL,
  routes: [
    // 생략
  ]
})

```

# *Parameter | QueryString*


## params

- `router.js` : router 인스턴스에 route 등록  
  path에 파라미터로 전송할 변수명을 지정해준다.  
  해당 변수명은 route 객체에서 사용되며 실질적으로 주소창에 입력할때 1:1매핑이 된다.  
  (router-link는 path와 연관없이 지정해도 사용 가능하며 만약 path에 등록되지 않더라도 브라우저 주소창에는 실제 넘겨준 형태로 path가 생성된다.)
  ```js
  export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      // 생략
      {
        path: '/users/:userId/:name', 
        name: 'users',
        component: Users
      }
    ]
  })
  ```
  
- `App.vue`: router-link를 통해 params 등록  
  해당 링크를 클릭시 params 객체의 property들을 해당 컴포넌트에서 route 객체를 통해 조회할 수 있게 된다.
  ```vue
  <template>
    <v-list-tile router :to="{
      name: 'users', 
      params: {
        userId: 421312,
        name: 'YooHyeokSchool'
      }
    }" exact>
  </template>
  ```
- `Users.vue`: route 객체에 등록된 해당 컴포넌트의 params객체 조회
  ```vue
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
    }
  }
  </script>
  ```

## router와 route의 차이점
 - ### `router`
   router 인스턴스 생성시에 설정한 Router정보와 route로 등록되는 모든 컴포넌트 들의 routes정보가 담겨있다.
 - ### `route`  
   router에 등록되어있는 요청된 path에 매핑되는 컴포넌트(현재 이곳) 에 대한 실제 정보가 담겨있다. (파라미터, 주소 정보 등)

```vue
<template>
</template>
<script>
export default {
  created() {
    console.log('router', this.$router)
    // vue router는 실제 router에 선언되어있는 
    console.log('route', this.$route)
    // 
  }
}
</script>
```


## 예외 사항

```js
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 생략
    {
      path: '/users', 
      name: 'users',
      component: Users
    }
  ]
})
```
router-link에서 params 객체에 추가한다면 만약 router 인스턴스에 등록된 route의 path에서 해당 params에 대한 처리를 하지 않더라도 userId와 name을 보내면 출력이 된다.  
그러나 주소창을 통해 /users/userId/name으로 입력하면 아무것도 뜨지 않게 되므로 유의해야 한다.  
(`path: '/users/userId/name'` 과 같이 순수 path 그 자체로 인식하는것으로 예측됨.)


## QueryString
  - #### query 속성 추가
    ```vue
    <template>
      <v-list-tile router :to="{
            name: 'users', 
            params: {
              userId: 421312,
              name: 'YooHyeokSchool'
            },
            query: {
              group: 'member',
              category: 'trial'
            }
          }" exact>
    </template>
    ```
    `http://localhost:8080/users/421312/YooHyeokSchool?group=member&category=trial`  
    ? 물음표뒤에 query에 사용된 property key와 value값이 ?key=value 형태로 붙고  
    복수의 경우에는 &로 구분한다.

  - #### Users.vue  
    아래와 같이 해당 router의 route에 등록된 URL을 매핑시킨 컴포넌트에서 $route전역 객체로부터 query속성을 통해 각 property에 접근할 수 있다.
    ```vue
    <template>
      <div>
        <h1>Users</h1>
        <p>파라미터.userId: {{ userId }}</p>
        <p>파라미터.name: {{ $route.params.name }}</p>
        <p>쿼리.group: {{ $route.query.group }}</p>
        <p>쿼리.category: {{ $route.query.category }}</p>
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
    ```



### 만약 아래와 같이 전혀 다른 형태의 query를 입력한 경우  
`http://localhost:8080/users/421312/YooHyeokSchool?name=yooHyeok&address=korea`

```vue
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
```
오류는 발생하지 않으며 단, query.name과 query.address만 출력되고 query.group과 query.category는 출력되지 않는다.

### *QueryString의 경우 주소창에 직접 key와 value를 노출하여 자유롭게 지정할수 있기 때문에 조금 더 직관적이고 편리할 수 있는 반면, parameter의 경우 어떠한 key(property)에 매핑된 value인지 알수 없기 때문에 보안상 더 좋다는 장점이 있다.*


# *Children*

상위 컴포넌트 기준 하위 컴포넌트를 구성한다.  
해당 컴포넌트들은 상위 컴포넌트에서 `<router-view/>` 태그를 통해 출력할 수 있게 된다.

- **`router.js`**
  ```js
  import Vue from 'vue'
  import Router from 'vue-router'
  import Home from './views/Home.vue'

  Vue.use(Router)

  const Members = () => import(/* webpackChunkName: "members" */ './views/Member.vue')
  const MembersDetail = () => import(/* webpackChunkName: "members-detail" */ './views/MemberDetail.vue')
  const MembersEdit = () => import(/* webpackChunkName: "members-detail" */ './views/MemberEdit.vue')

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
        path: '/members',
        name: 'members',
        component: Members,
        children: [
          {
            path: ':memberId',
            name: 'members-detail',
            component: MembersDetail
          },
          {
            path: ':memberId/edit',
            name: 'members-edit',
            component: MembersEdit
          },
        ]
      }
    ]
  })
  ```

  #### *Chlildren은 자동으로 /가 붙는다. 만약 /를 붙힌다면 부모경로와 무관하게 독립적으로 동작한다.*

- **`Member.vue`**
  ```vue
  <template>
    <v-layout
      row wrap pt-5 text-xs-center
      style="max-width: 500px; margin: 0 auto">
      <v-flex xs12>
        <h1>Members</h1>
        <p>회원을 검색해주세요.</p>
      </v-flex>
      <v-flex xs12>
        <router-view><!-- /members의 하위경로(MemberDetail.vue)를 출력 --></router-view>
      </v-flex>
    </v-layout>
  </template>
  ```

- **`MemberDetai.vue`**
  ```vue
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
    }
  }
  </script>

  ```

## Partent → Children 경로변경 유형

- **`MemberDetai.vue`**  

  ```vue
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
        this.$router.push({name: 'members-edit'}) // 1. 동등한 Children 계층이라면 parameter가 자동으로 넘어간다.
        this.$router.push({path: `/members/${this.memberId}/edit`}) // 2. `/`포함 풀 path 입력
        this.$router.push({path: `${this.memberId}/edit`}) // 3. `/` 생략 - 
      }
    }
  }
  </script>
  ```
  1. name속성으로 탐색한다면 현재 URL기준 parameter를 자동으로 해당 이름의 컴포넌트에 매핑시킨다.
  2. 만약 풀 path로 입력할때 가장처음 /를 생략한다면 Children에서 찾게된다.
  3. /를 생략했기 때문에 현재 컴포넌트 기준으로 Children에서 탐색한다.

# *Router Guard*
일반적으로 가드란 어떠한것을 지킨다는 의미이다.  
예를들어 로그인을 하지 않은 회원이 있다면 해당 회원은 마이페이지에 접근할 수 없다.  
혹은 이미 로그인 한 회원이 로그인 페이지에 접근하려고 할 때 페이지 접근을 막아야 한다.  
이와 같이 조건에 따라 라우터를 허가할 것인지에 대한 동작 여부등의 역할을 할 수 있다.

## beforeEnter()
router guard는 router 객체 내에 guard에 사용되는 몇가지 속성을 통해 만들어 줄 수 있다.  
그중 beforeEnter 라는속성은 router가 불러와지기 전에 선언한 익명 함수가 먼저 동작하게 해준다.
 - `to` : 라우터가 가는 방향 **(about)**  
   콘솔: `{path: "/about", name: "about", params: {}, query: {}, meta: {}, matched: [], hash: "", fullPath: "/about"}`
 - `from` : 어디로 부터 라우터에 왔는지 **(home)**  
   콘솔: `{path: "/", name: "home", params: {}, query: {}, meta: {}, matched: [], hash: "", fullPath: "/"}`
 - `next` : 함수 실행 후 router를 어디로 갈지 결정해주는 기능

예시 코드는 아래와 같다

- ### router.js
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
        beforeEnter: (to, from, next) => {
          console.log('to: ', to, ' \nfrom: ', from)
        },
      },
    ]
  })
  ```




## next()
router가 진행할 방향을 의미한다.

```js

beforeEnter: (to, from, next) => {
  next(); // default는 to 로 이동된다.
}

```
만약 위와같이 아무런 값도 부여하지 않는다면, to 객체로 이동하게 된다.

```js
beforeEnter: (to, from, next) => {
  next("/"); // home 컴포넌트로 이동하게 된다.
}
```
예를들어 /about이라는 router를 입력했을 때 about route의 beforeEnter에서 next("/")를 선언해뒀다면 /about 경로로 이동하지 않고 / 경로로 빠지게 된다.
      
이를 응용하면 아래와 같은 로그인 여부에 따른 라우팅 분기 코드를 작성할 수 있게 된다.      
```js

beforeEnter: (to, from, next) => {
  /* 로그인 여부 확인 후 이동시키기. */
  const isUserLogin = false;
  if(isUserLogin === false) {
    next('home')
  } else {
    next('members-detail');
  }
}

```

## 컴포넌트 내에서 Router Guard 동작

 - `beforeRouterEnter()` : 컴포넌트 생성 전인(**created**) 초기 진입 시점에 호출된다.   
 (router.js에 선언한 *beforeEnter 이후 호출됨*)
 - `beforeRouterLeave()` : 컴포넌트 소멸 전인(**destroyed**) 최종 소멸 시점에 호출된다.

- User.vue
  ```vue
  <script>
  export default {
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
  ```
  ### 호출 순서
  1. beforeEnter (router.js)
  2. beforeRouteEnter (컴포넌트)
  3. created (컴포넌트)
  4. beforeRouteLeave (컴포넌트)
  4. destroyed (컴포넌트)

# *Redirection*
  사용자가 라우터에 등록되어있지 않은 예상치 못한 주소로 접근했을 때 빈 컴포넌트 출력이 아닌 지정한 route로 redirect 한다.  

  문법은 등록할 route 객체 내 redirect 속성을 사용한다.
- router.js
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
        path: '/redirect-me',
        // redirect: '/',
        redirect: {name: 'home'} // router-link의  to: {name: 'home'}와 같은 형태로도 사용 가능하다.
      }
    ]
  })
  ```
  위 코드는 만약 /redirec-me라는 path요청이 오게된다면 home route로 redirect 처리 한다.

  만약 존재하지 않는 특정 path에 접근하였을 경우 redirect 처리를 하는 방법은 아래와 같다.
- router.js
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
        path: '/*',
        redirect: {name: 'home'}
      }
    ]
  })
  ```
  /뒤에 *`asterisk`* 기호를 붙히면 router에 선언된 모든 path중 어떠한것도 해당되지 않는다면 이곳으로 redirect된다.

## *Children redirect* 
만약 /member/*이라면  /member의 children중 어떠한것도 해당되지 않는다면 children에 등록한 redirect가 동작하게된다.
- router.js
  ```js
  {
      path: '/members',
      name: 'members',
      component: Members,
      children: [
        {
          path: ':memberId',
          name: 'members-detail',
          component: MembersDetail
        },
        {
          path: ':memberId/edit',
          name: 'members-edit',
          component: MembersEdit
        },
        {
          path: ':memberId/edit/*',
          redirect: {name: 'home'}
        }
  }
  ```
  이를테면 위의 코드와 같이 /members/:memberId/edit/바보 라는 path입력시 home 라우트로 redirect되어 home컴포넌트가 라우팅된다.

