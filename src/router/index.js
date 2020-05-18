import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/LoginView.vue';
import SignUp from '../views/SignUpView.vue';
import MapView from '../views/MapView.vue';
import HomeView from '../views/HomeView.vue';
import VolunteersLeaderboard from '../views/VolunteersLeaderboardView.vue';
import TeamsLeaderboard from '../views/TeamsLeaderboardView.vue';
import TeamCreation from '../views/TeamCreationView.vue';
import IndividualTeamView from '../views/IndividualTeamView.vue';
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
    path: '/volunteers-leaderboard',
    name: 'VolunteersLeaderboard',
    component: VolunteersLeaderboard,
  },
  {
    path: '/teams-leaderboard',
    name: 'TeamsLeaderboard',
    component: TeamsLeaderboard,
  },
  {
    path: '/create',
    name: 'TeamCreation',
    component: TeamCreation,
  },
  {
    path: '/team/:id',
    name: 'IndividualTeamView',
    component: IndividualTeamView,
    props: true,
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
  // editmode can either be set to 'new' if filtering for unreserved streets
  // or can be set to 'edit' if using a provided list of streets
  {
    // editmode will be set to 'new'
    path: '/reserve/:editmode',
    name: 'ReserveNew',
    component: MapView,
    props: true,
  },
  {
    path: '/reserve/:editmode',
    name: 'ReserveEdit',
    component: MapView,
    props: true,
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
