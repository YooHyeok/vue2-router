import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const About = () => {
  return import(/* webpackChunkName: "about" */ './views/About.vue')
}
const Users = () => import(/* webpackChunkName: "users" */ './views/Users.vue')
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      component: About
    },
    {
      path: '/users/:userId/:name',
      name: 'users',
      component: Users
    },
    {
      path: '/members',
      name: 'members',
      /**
       * router guard
       * router 객체 내에 guard에 사용되는 몇가지 속성을 통해 만들어 줄 수 있다.
       * beforeEnter : router가 불러와지기 전에 먼저 동작한다.
       * @param {*} to : 라우터가 가는 방향
       * @param {*} from : 어디로 부터 라우터에 왔는지
       * @param {*} next : 함수 실행 후 router를 어디로 갈지 결정해주는 기능
       */
      beforeEnter: (to, from, next) => {
        // console.log('to: ', to, ' \nfrom: ', from)
        console.log('beforeEnter')
        next(); // default는 to 로 이동된다.
        // next("/"); // default는 to 로 이동된다.
        
        /* 로그인 여부 확인 후 이동시키기. */
        // const isUserLogin = false;
        // if(isUserLogin === false) {
        //   next('home')
        // } else {
        //   next('members-detail');
        // }
      },
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
      ]
    },
    {
      path: '/redirect-me',
      // redirect: '/users',
      redirect: {name: 'users'} // router-link의  to: {name: 'users'}와 같은 형태로도 사용 가능하다.
    },
    {
      path: '/*', //router에 선언된 모든 path중 어떠한것도 해당되지 않는다면 이곳으로 redirect된다.
      redirect: {name: 'about'}
    }
  ]
})
