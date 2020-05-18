import Vue from 'vue';
import Router from 'vue-router';
import EventsView from '../views/EventsView.vue';
import LoginView from '../views/LoginView.vue';
import SignUpView from '../views/SignUpView.vue';
import SignUpPFView from '../views/SignUpPFView.vue';
import AccessControlDemonstration from '../components/AccessControl/AccessControlDemonstration.vue';
import NotFoundView from '../views/NotFoundView.vue';
import ProfileView from '../views/ProfileView.vue';
import MyEventsView from '../views/MyEventsView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import SingleEventView from '../views/SingleEventView.vue';
import SignUpLandingView from '../views/SignUpLandingView.vue';
import CreateEventView from '../views/CreateEventView.vue';
import UpcomingEventsView from '../views/UpcomingEventsView.vue';
import CreateAnnouncementView from '../views/CreateAnnouncementView.vue';
import VerifyEmailView from '../views/VerifyEmailView.vue';
import ForgotPasswordRequest from '../views/ForgotPasswordRequest.vue';
import ForgotPasswordReset from '../views/ForgotPasswordReset.vue';
import ForgotPasswordConfirmation from '../views/ForgotPasswordConfirmation.vue';
import SignUpPF2View from '../views/SignUpPF2View.vue';
import FormAgreements from '../components/Forms/FormAgreements.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
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
    },
    {
      path: '/edit-event/:eventId',
      name: 'edit-event',
      component: CreateEventView,
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
      path: '/sign-up-landing',
      name: 'signup-landing',
      component: SignUpLandingView,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView,
    },
    {
      path: '/sign-up-pf/',
      name: 'sign-up-pf',
      component: SignUpPFView,
    },
    {
      path: '/sign-up-pf-2',
      name: 'sign-up-pf-2',
      component: SignUpPF2View,
      props: true,
    },
    {
      path: '/form-agreements',
      name: 'form-agreements',
      component: FormAgreements,
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
      path: '/verify-email/:secret_key',
      name: 'verify-email',
      component: VerifyEmailView,
    },
    {
      path: '/forgot-password-request',
      name: 'forgot-password-request',
      component: ForgotPasswordRequest,
    },
    {
      path: '/forgot-password-reset/:secret_key',
      name: 'forgot-password-reset',
      component: ForgotPasswordReset,
    },
    {
      path: '/forgot-password-confirmation',
      name: 'forgot-password-confirmation',
      component: ForgotPasswordConfirmation,
      props: true,
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});
