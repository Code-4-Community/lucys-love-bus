import Vue from 'vue';
import Router from 'vue-router';
import LoginView from '../views/LoginView.vue';
import SignUpView from '../views/SignUpView.vue';
import SignUpPFView from '../views/SignUpPFView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import ProfileView from '../views/ProfileView.vue';
import MyEventsView from '../views/MyEventsView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import EventRegistrationConfirmation from '../views/EventRegistrationConfirmation.vue';
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
import SignupFormAgreements from '../views/SignupFormAgreements.vue';
import FamilyRequests from '../views/FamilyRequests.vue';
import EditEventView from '../views/EditEventView.vue';
import SingleFamilyRequest from '../views/SingleFamilyRequest.vue';
import FamilyRequestConfirmation from '../views/FamilyRequestConfirmation.vue';
import Settings from '../views/Settings.vue';
import ChangeEmailView from '../views/ChangeEmailView.vue';
import PersonalRequests from '../views/PersonalRequests.vue';
import ChangePasswordlView from '../views/ChangePasswordlView.vue';
import DeactivateAccountView from '../views/DeactivateAccountView.vue';
import EditFamilyInfoView from '../views/EditFamilyInfoView.vue';

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
      path: '/upcoming-events',
      name: 'upcoming-events-view',
      component: UpcomingEventsView,
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
      path: '/edit-event/:eventId',
      name: 'edit-event',
      component: EditEventView,
      props: true,
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
      path: '/event-registration-confirmation/:success',
      name: 'event-registration-confirmation',
      component: EventRegistrationConfirmation,
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
      component: SignupFormAgreements,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/family-requests',
      name: 'family-requests',
      component: FamilyRequests,
    },
    {
      path: '/single-family-request/:request_id',
      name: 'single-family-request',
      component: SingleFamilyRequest,
    },
    {
      path: '/family-request-confirmation',
      name: 'family-request-confirmation',
      component: FamilyRequestConfirmation,
      props: true,
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
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/change-email',
      name: 'change-email',
      component: ChangeEmailView,
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: ChangePasswordlView,
    },
    {
      path: '/edit-family-information',
      name: 'edit-family-information',
      component: EditFamilyInfoView,
    },
    {
      path: '/personal-requests',
      name: 'personal-requests',
      component: PersonalRequests,
    },
    {
      path: '/deactivate-account',
      name: 'deactivate-account',
      component: DeactivateAccountView,
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});
