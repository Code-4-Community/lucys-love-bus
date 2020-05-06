import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutUsView from '../views/AboutUsView.vue';
import EventsView from '../views/EventsView.vue';
import LoginView from '../views/LoginView.vue';
import SignUpView from '../views/SignUpView.vue';
import AccessControlDemonstration from '../components/AccessControl/AccessControlDemonstration.vue';
import NotFoundView from '../views/NotFoundView.vue';
import ProfileView from '../views/ProfileView.vue';
import MyEventsView from '../views/MyEventsView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import SingleEventView from '../views/SingleEventView.vue';
import CreateEventView from '../views/CreateEventView.vue';
import UpcomingEventsView from '../views/UpcomingEventsView.vue';
import CreateAnnouncementView from '../views/CreateAnnouncementView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: AboutUsView,
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView,
    },
    {
      path: '/create-event',
      name: 'create-event',
      component: CreateEventView,
    },
    {
      path: '/create-announcement',
      name: 'create-announcement',
      component: CreateAnnouncementView,
      props: true,
    },
    {
      path: '/upcoming-events',
      name: 'upcoming-events',
      component: UpcomingEventsView,
    },
    {
      path: '/event/:eventId',
      name: 'single-event',
      component: SingleEventView,
      props: true,
    },
    {
      path: '/acl',
      name: 'acl',
      component: AccessControlDemonstration,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/my-events',
      name: 'my-events',
      component: MyEventsView,
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});
