import moment from 'moment';
import { loadStripe } from '@stripe/stripe-js';
import { protectedResourceAxios } from '../utils/auth/axios/axiosInstance';

function formatTimestamp(date, time) {
  const res = moment(date, 'YYYY-MM-DD"');
  const hour = time.substring(0, 2);
  const minute = time.substring(3);
  res.add(hour, 'h').add(minute, 'm');
  return res.unix() * 1000;
}

// objToParams: takes a Javascript object and returns a string
// that can be used as GET query parameters
// e.g. { length: 4, name: "None" } -> ?length=4&name=none
async function objToParams(obj) {
  let res = '';
  let first = true;
  Object.entries(obj).forEach(([key, value]) => {
    if (first) {
      res += '?';
      first = false;
    } else {
      res += '&';
    }
    res += `${key}=${value}`;
  });
  return res;
}

async function createEvent(event) {
  const body = {
    title: event.name,
    spotsAvailable: 10,
    thumbnail: event.img,
    details: {
      description: event.description,
      location: event.location,
      start: formatTimestamp(event.date, event.startTime),
      end: formatTimestamp(event.date, event.endTime),
    },
  };

  let res;
  try {
    res = await protectedResourceAxios.post('/api/v1/protected/events/', body);
  } catch (err) {
    return err;
  }

  return res;
}

const stripeApp = loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);

async function createEventRegistration(registeredEvents) {
  const body = {
    lineItems: registeredEvents.map(event => ({
      id: event.id,
      name: event.title,
      description: event.details.description,
      amount: 5,
      currency: 'usd',
      quantity: 1,
    })),
  };
  return protectedResourceAxios.post('/api/v1/protected/checkout/register', body);
}

async function createEventRegistrationAndCheckoutSession(registeredEvents) {
  const body = {
    lineItems: registeredEvents.map(event => ({
      id: event.id,
      name: event.title,
      description: event.details.description,
      amount: 5,
      currency: 'usd',
      quantity: 1,
    })),
    successUrl: 'http://localhost:8080/my-events',
    cancelUrl: 'http://localhost:8080/checkout',
  };
  try {
    const { data } = await protectedResourceAxios.post('/api/v1/protected/checkout/payment', body);
    const stripe = await stripeApp;
    await stripe.redirectToCheckout({
      sessionId: data,
    });
  } catch (e) {
    // eslint-disable-next-line
    alert("Error creating Stripe checkout session: " + e);
  }
}

async function getEvent(id) {
  try {
    const { data } = await protectedResourceAxios.get(`/api/v1/protected/events/${id}`);
    return data;
  } catch (err) {
    return err;
  }
}

async function getUpcomingEvents() {
  try {
    const { data } = await protectedResourceAxios.get('/api/v1/protected/events/qualified');
    return data.events;
  } catch (err) {
    return err;
  }
}

async function getMyEvents(start) {
  try {
    const { data } = await protectedResourceAxios.get(`/api/v1//protected/events/signed_up?start=${start}`);
    return data.events;
  } catch (err) {
    return err;
  }
}

async function getSitewideAnnouncements(paramObj) {
  try {
    const params = await objToParams(paramObj);
    const { data } = await protectedResourceAxios.get(`/api/v1/protected/announcements${params}`);
    return data;
  } catch (err) {
    return err;
  }
}

export default {
  createEvent,
  createEventRegistration,
  createEventRegistrationAndCheckoutSession,
  getEvent,
  getUpcomingEvents,
  getMyEvents,
  getSitewideAnnouncements,
};
