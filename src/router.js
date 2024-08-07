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
