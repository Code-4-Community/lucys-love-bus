import { loadStripe } from '@stripe/stripe-js';
import AxiosInstance from '../auth/axiosInstance';

// objToParams: takes a Javascript object and returns a string
// that can be used as GET query parameters
// e.g. { length: 4, name: "None" } -> ?length=4&name=none
// function objToParams(obj) {
//   let res = '';
//   let first = true;
//   Object.entries(obj).forEach(([key, value]) => {
//     if (first) {
//       res += '?';
//       first = false;
//     } else {
//       res += '&';
//     }
//     res += `${key}=${value}`;
//   });
//   return res;
// }

async function createEvent(event) {
  try {
    return await AxiosInstance.post('/api/v1/protected/events/', event, {
      timeout: 10000, // Allow 10 seconds for sending the image
    });
  } catch (err) {
    return err;
  }
}

async function editEvent(eventId, event) {
  try {
    return await AxiosInstance.put(`/api/v1/protected/events/${eventId}`, event);
  } catch (err) {
    return err;
  }
}

async function deleteEvent(eventId) {
  try {
    return AxiosInstance.delete(`api/v1/protected/events/${eventId}`);
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
  return AxiosInstance.post('/api/v1/protected/checkout/register', body);
}

async function createEventRegistrationAndCheckoutSession(registeredEvents) {
  const body = {
    lineItemRequests: registeredEvents.map(event => ({
      eventId: event.id,
      quantity: event.tickets,
    })),
  };
  try {
    const { data } = await AxiosInstance.post('/api/v1/protected/checkout/payment', body);
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
    const { data } = await AxiosInstance.get(`/api/v1/protected/events/${id}`);
    return data;
  } catch (err) {
    return err;
  }
}

async function getEventRSVP(id) {
  try {
    const { data } = await AxiosInstance.get(`/api/v1/protected/events/${id}/rsvps`);
    return data;
  } catch (err) {
    return err;
  }
}

async function getUpcomingEvents() {
  try {
    const { data } = await AxiosInstance.get('/api/v1/protected/events/qualified');
    return data.events;
  } catch (err) {
    return err;
  }
}

async function getMyEvents(start) {
  try {
    const { data } = await AxiosInstance.get(`/api/v1/protected/events/signed_up?start=${start}`);
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
  const { data } = await AxiosInstance.post(path, body);
  return data;
}

// eslint-disable-next-line consistent-return
// async function getSitewideAnnouncements(paramObj) {
//   try {
//     const params = objToParams(paramObj);
//     const data = await AxiosInstance.get(`/api/v1/protected/announcements${params}`);
//     console.log('api', data);
//     return data;
//   } catch (e) {
//     // console.error(e);
//     console.log(e);
//     // return e;
//   }
// }

// export const getSitewideAnnouncements = (paramObj) => {
//   const params = objToParams(paramObj);
//   return AxiosInstance.get(`/api/v1/protected/announcements${params}`);
// }

export const getSitewideAnnouncements = async () => AxiosInstance.get('/api/v1/protected/announcements?count=10');

async function getEventAnnouncements(id) {
  try {
    const path = `/api/v1/protected/announcements/${id}`;
    const { data } = await AxiosInstance.get(path);
    return data;
  } catch (err) {
    return err;
  }
}

async function getPfRequests() {
  try {
    const path = '/api/v1/protected/requests';
    const { data } = await AxiosInstance.get(path);
    return data;
  } catch (err) {
    return err;
  }
}

async function getRequestStatuses() {
  try {
    const path = '/api/v1/protected/requests/status';
    const { data } = await AxiosInstance.get(path);
    return data;
  } catch (err) {
    return err;
  }
}

async function approveRequest(requestId) {
  try {
    const path = `/api/v1/protected/requests/${requestId}/approve`;
    return await AxiosInstance.post(path);
  } catch (err) {
    return err;
  }
}

async function rejectRequest(requestId) {
  try {
    const path = `/api/v1/protected/requests/${requestId}/reject`;
    return await AxiosInstance.post(path);
  } catch (err) {
    return err;
  }
}

async function addContactInfo(body) {
  const path = '/api/v1/protected/user/contact_info';
  return AxiosInstance.post(path, body);
}

async function updateAccountInfo(body) {
  const path = '/api/v1/protected/user/contact_info';
  return AxiosInstance.put(path, body);
}

async function makePfRequest() {
  const path = 'api/v1/protected/requests';
  return AxiosInstance.post(path);
}

async function getRequestData(requestId) {
  const path = `api/v1/protected/requests/${requestId}`;
  return AxiosInstance.get(path);
}

async function changeEmail(body) {
  try {
    const path = 'api/v1/protected/user/change_email';
    return AxiosInstance.post(path, body);
  } catch (e) {
    return e;
  }
}

async function changePassword(body) {
  const path = 'api/v1/protected/user/change_password';
  return AxiosInstance.post(path, body);
}

async function getAccountInformation() {
  const path = 'api/v1/protected/user/contact_info';
  return AxiosInstance.get(path);
}

async function deactivateAccount() {
  const path = 'api/v1/protected/user/';
  return AxiosInstance.delete(path);
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
