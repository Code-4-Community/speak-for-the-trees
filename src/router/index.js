import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Authentication from '../components/Authentication/Authentication.vue';
import Login from '../components/Authentication/Login/Login.vue';
import SignUp from '../components/Authentication/SignUp/SignUp.vue';
import Map from '../components/Map/Map.vue';
import Leaderboard from '../views/Leaderboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/map',
    name: 'map',
    component: Map,
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: Leaderboard,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/authentication',
    component: Authentication,
    redirect: '/authentication/login',
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login,
      },
      {
        path: '/sign-up',
        name: 'sign-up',
        component: SignUp,
      },
    ],
  },
  {
    path: '/*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
