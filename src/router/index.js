import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import MapPage from '../views/MapPage.vue';
import HomeView from '../views/HomeView.vue';
import Leaderboard from '../views/VolunteerLeaderboard.vue';
import TeamLeaderboard from '../views/TeamLeaderboard.vue';
import TeamCreation from '../views/TeamCreation.vue';
import TeamView from '../views/TeamView.vue';
import CurrentReservations from '../views/CurrentReservations.vue';
import AvailableTeams from '../views/AvailableTeams.vue';
import tokenService from '../auth/token';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Leaderboard,
  },
  {
    path: '/team-leaderboard',
    name: 'TeamLeaderboard',
    component: TeamLeaderboard,
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
    name: 'Map',
    component: MapPage,
  },
  {
    path: '/available-teams',
    name: 'AvailableTeams',
    component: AvailableTeams,
  },
  // editmode can either be set to 'new' if filtering for unreserved streets
  // or can be set to 'edit' if using a provided list of streets
  {
    // editmode will be set to 'new'
    path: '/reserve/:editmode',
    name: 'ReserveNew',
    component: MapPage,
  },
  {
    path: '/reserve/:editmode',
    name: 'ReserveEdit',
    component: MapPage,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
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

router.beforeEach((to, from, next) => {
  if (tokenService.getPrivilegeLevel() < 0) {
    if (to.name === 'Login' || to.name === 'Signup') next();
    else next({ name: 'Login' });
  } else next();
});

export default router;
