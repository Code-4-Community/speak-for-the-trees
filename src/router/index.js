import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../views/LoginView.vue';
import SignUp from '../views/SignUpView.vue';
import MapView from '../views/MapView.vue';
import HomeView from '../views/HomeView.vue';
import LeaderboardView from '../views/LeaderboardView.vue';
import TeamCreation from '../views/TeamCreationView.vue';
import IndividualTeamView from '../views/IndividualTeamView.vue';
import CurrentReservations from '../views/CurrentReservations.vue';
import AvailableTeams from '../views/AvailableTeams.vue';
import AdminBlockReservations from '../views/AdminBlockReservations.vue';
import Settings from '../views/Settings.vue';

import tokenService from '../auth/token';

import leaderboardConstants from '../constants/leaderboardConstants';

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
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/all-volunteers-leaderboard',
    name: leaderboardConstants.ALL_VOLUNTEERS_LEADERBOARD,
    component: LeaderboardView,
  },
  {
    path: '/all-teams-leaderboard',
    name: leaderboardConstants.ALL_TEAMS_LEADERBOARD,
    component: LeaderboardView,
  },
  {
    path: '/team-leaderboard/:id',
    name: leaderboardConstants.INDIVIDUAL_TEAM_LEADERBOARD,
    component: LeaderboardView,
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
    path: '/available-teams',
    name: 'AvailableTeams',
    component: AvailableTeams,
  },
  {
    path: '/block-reservations',
    name: 'AdminBlockReservations',
    component: AdminBlockReservations,
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
    if (to.name === 'Login' || to.name === 'SignUp') next();
    else next({ name: 'Login' });
  } else next();
});

export default router;
