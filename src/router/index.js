import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../views/LoginView.vue';
import SignUp from '../views/SignUpView.vue';
import MapContainerView from '../views/MapContainerView.vue';
import HomeView from '../views/HomeView.vue';
import LeaderboardView from '../views/LeaderboardView.vue';
import TeamCreation from '../views/TeamCreationView.vue';
import IndividualTeamView from '../views/IndividualTeamView.vue';
import CurrentReservations from '../views/CurrentReservations.vue';
import AvailableTeams from '../views/AvailableTeams.vue';
import TeamProgress from '../views/TeamProgress.vue';
import ReservationsOverview from '../views/ReservationsOverview.vue';
import CompletionsOverview from '../views/CompletionsOverview.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import Settings from '../views/Settings.vue';

import tokenService from '../auth/token';

import leaderboardConstants from '../constants/leaderboardConstants';
import privilegeConstants from '../auth/constants';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    props: true,
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
    path: '/team-progress',
    name: 'TeamProgress',
    component: TeamProgress,
  },
  {
    path: '/available-teams',
    name: 'AvailableTeams',
    component: AvailableTeams,
  },
  {
    path: '/reservations-overview',
    name: 'ReservationsOverview',
    component: ReservationsOverview,
  },
  {
    path: '/completed-blocks-overview',
    name: 'CompletionsOverview',
    component: CompletionsOverview,
  },
  // editmode can either be set to 'new' if filtering for open blocks
  // or can be set to 'edit' if using a provided list of blocks
  {
    // editmode will be set to 'new'
    path: '/reserve/:editmode',
    name: 'ReserveNew',
    component: MapContainerView,
    props: true,
  },
  {
    path: '/reserve/:editmode',
    name: 'ReserveEdit',
    component: MapContainerView,
    props: true,
  },
  {
    path: '/admin-map',
    name: 'AdminMap',
    component: MapContainerView,
    props: true,
  },
  {
    path: '/forgot-password-reset/:token',
    name: 'ForgotPassword',
    component: ForgotPassword,
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
    if (to.name === 'Login' || to.name === 'SignUp' || to.name === 'ForgotPassword') next();
    else next({ name: 'Login' });
  } else next();
  if (tokenService.getPrivilegeLevel() !== privilegeConstants.ADMIN) {
    if (to.name === 'ReservationsOverview' || to.name === 'CompletionsOverview' || to.name === 'AdminMap') next({ name: 'Home' });
  }
});

export default router;
