import { loadStripe } from '@stripe/stripe-js';
import { protectedResourceAxios } from '../utils/auth/axios/axiosInstance';

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
  try {
    return await protectedResourceAxios.post('/api/v1/protected/events/', event, {
      timeout: 10000, // Allow 10 seconds for sending the image
    });
  } catch (err) {
    return err;
  }
}

async function editEvent(event) {
  try {
    return await protectedResourceAxios.post(`/api/v1/protected/events/${event.id}`, event);
  } catch (err) {
    return err;
  }
}

async function deleteEvent(eventId) {
  try {
    return protectedResourceAxios.delete(`api/v1/protected/events/${eventId}`);
  } catch (err) {
    return err;
  }
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
    successUrl: 'http://localhost:8080/event-registration-confirmation/success',
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
    const { data } = await protectedResourceAxios.get(`/api/v1/protected/events/signed_up?start=${start}`);
    return data.events;
  } catch (err) {
    return err;
  }
}

async function createAnnouncement(body, eventId) {
  let path = '/api/v1/protected/announcements';
  if (eventId !== null) {
    path += `/${eventId}`;
  }
  const { data } = await protectedResourceAxios.post(path, body);
  return data;
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

async function getEventAnnouncements(id) {
  try {
    const path = `/api/v1/protected/announcements/${id}`;
    const { data } = await protectedResourceAxios.get(path);
    return data;
  } catch (err) {
    return err;
  }
}

async function getPfRequests() {
  try {
    const path = '/api/v1/protected/requests';
    const { data } = await protectedResourceAxios.get(path);
    return data;
  } catch (err) {
    return err;
  }
}

async function approveRequest(requestId) {
  try {
    const path = `/api/v1/protected/requests/${requestId}/approve`;
    return await protectedResourceAxios.post(path);
  } catch (err) {
    return err;
  }
}

async function rejectRequest(requestId) {
  try {
    const path = `/api/v1/protected/requests/${requestId}/reject`;
    return await protectedResourceAxios.post(path);
  } catch (err) {
    return err;
  }
}

export default {
  createEvent,
  editEvent,
  deleteEvent,
  createEventRegistration,
  createEventRegistrationAndCheckoutSession,
  getEvent,
  getUpcomingEvents,
  getMyEvents,
  getSitewideAnnouncements,
  getEventAnnouncements,
  createAnnouncement,
  getPfRequests,
  approveRequest,
  rejectRequest,
};
