import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home/Home.vue';
import AboutUs from '../components/AboutUs/AboutUs.vue';
import Events from '../components/Events/Events.vue';
import Authentication from '../components/Authentication/Authentication.vue';
import Login from '../components/Authentication/Login/Login.vue';
import SignUp from '../components/Authentication/SignUp/SignUp.vue';
import NotFound from '../components/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: AboutUs,
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: Authentication,
      redirect: '/authentication/login',
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
        },
        {
          path: 'sign-up',
          name: 'sign-up',
          component: SignUp,
        },
      ],
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});
