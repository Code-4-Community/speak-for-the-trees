import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthenticationView from '../views/AuthenticationView.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import MapPage from '../views/MapPage.vue';
import HomeView from '../views/HomeView.vue';
import Leaderboard from '../views/VolunteerLeaderboard.vue';
import TeamCreation from '../views/TeamCreation.vue';
import TeamView from '../views/TeamView.vue';
import CurrentReservations from '../views/CurrentReservations.vue';

Vue.use(VueRouter);

function getReserveRoute(route) {
  return {
    reservedFilter: route.params.editmode === 'edit' ? 1 : 0,
  };
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: Leaderboard,
  },
  {
    path: '/create',
    name: 'TeamCreation',
    component: TeamCreation,
  },
  {
    path: '/team',
    name: 'TeamView',
    component: TeamView,
  },
  {
    path: '/current-reservations',
    name: 'CurrentReservations',
    component: CurrentReservations,
  },
  {
    path: '/map',
    name: 'map',
    component: MapPage,
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: Leaderboard,
  },
  {
    path: '/reserve/:editmode',
    name: 'reserve',
    component: MapPage,
    props: getReserveRoute,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/authentication',
    component: AuthenticationView,
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
    path: '/profile',
    name: 'profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfileView.vue'),
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
