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

async function editEvent(eventId, event) {
  try {
    return await protectedResourceAxios.put(`/api/v1/protected/events/${eventId}`, event);
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
    lineItemRequests: registeredEvents.map(event => ({
      eventId: event.id,
      quantity: event.tickets,
    })),
  };
  return protectedResourceAxios.post('/api/v1/protected/checkout/register', body);
}

async function createEventRegistrationAndCheckoutSession(registeredEvents) {
  const body = {
    lineItemRequests: registeredEvents.map(event => ({
      eventId: event.id,
      quantity: event.tickets,
    })),
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

async function getEventRSVP(id) {
  try {
    const { data } = await protectedResourceAxios.get(`/api/v1/protected/events/${id}/rsvps`);
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

async function getRequestStatuses() {
  try {
    const path = '/api/v1/protected/requests/status';
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

async function addContactInfo(body) {
  const path = '/api/v1/protected/user/contact_info';
  return protectedResourceAxios.post(path, body);
}

async function updateAccountInfo(body) {
  const path = '/api/v1/protected/user/contact_info';
  return protectedResourceAxios.put(path, body);
}

async function makePfRequest() {
  const path = 'api/v1/protected/requests';
  return protectedResourceAxios.post(path);
}

async function getRequestData(requestId) {
  const path = `api/v1/protected/requests/${requestId}`;
  return protectedResourceAxios.get(path);
}

async function changeEmail(body) {
  try {
    const path = 'api/v1/protected/user/change_email';
    return protectedResourceAxios.post(path, body);
  } catch (e) {
    return e;
  }
}

async function changePassword(body) {
  const path = 'api/v1/protected/user/change_password';
  return protectedResourceAxios.post(path, body);
}

async function getAccountInformation() {
  const path = 'api/v1/protected/user/contact_info';
  return protectedResourceAxios.get(path);
}

async function deactivateAccount() {
  const path = 'api/v1/protected/user/';
  return protectedResourceAxios.delete(path);
}

export default {
  createEvent,
  editEvent,
  deleteEvent,
  createEventRegistration,
  createEventRegistrationAndCheckoutSession,
  getEvent,
  getEventRSVP,
  getUpcomingEvents,
  getMyEvents,
  getSitewideAnnouncements,
  getEventAnnouncements,
  createAnnouncement,
  getPfRequests,
  getRequestStatuses,
  approveRequest,
  rejectRequest,
  addContactInfo,
  updateAccountInfo,
  getAccountInformation,
  makePfRequest,
  getRequestData,
  changeEmail,
  changePassword,
  deactivateAccount,
};
