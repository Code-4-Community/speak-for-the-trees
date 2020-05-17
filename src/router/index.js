import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/LoginView.vue';
import SignUp from '../views/SignUpView.vue';
import MapView from '../views/MapView.vue';
import HomeView from '../views/HomeView.vue';
import Leaderboard from '../views/VolunteersLeaderboardView.vue';
import TeamLeaderboard from '../views/TeamsLeaderboardView.vue';
import TeamCreation from '../views/TeamCreationView.vue';
import TeamView from '../views/IndividualTeamView.vue';
import CurrentReservations from '../views/CurrentReservations.vue';
import AvailableTeams from '../views/AvailableTeams.vue';
import tokenService from '../auth/token';

Vue.use(VueRouter);

function getReserveRoute(route) {
  return {
    reservedFilter: route.params.editmode === 'edit' ? 1 : 0,
  };
}

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
    component: MapView,
  },
  {
    path: '/available-teams',
    name: 'AvailableTeams',
    component: AvailableTeams,
  },
  {
    path: '/reserve/:editmode',
    name: 'Reserve',
    component: MapView,
    props: getReserveRoute,
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
