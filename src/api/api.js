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

const stripePromise = loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);

async function handleClickCheckout(cartEvents, userLevel) {
  if (userLevel === 'ADMIN' || userLevel === 'PF') {
    const body = {
      lineItems: cartEvents.map(event => ({
        id: event.id,
        name: event.title,
        description: event.details.description,
        amount: 5,
        currency: 'usd',
        quantity: 1,
      })),
      successUrl: `${process.env.VUE_APP_API_DOMAIN}/my-events/?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${process.env.VUE_APP_API_DOMAIN}/checkout`,
    };

    try {
      await protectedResourceAxios.post('/api/v1/protected/checkout/event', body);
      // eslint-disable-next-line
      alert('successfully placed order');
    } catch (e) {
      // eslint-disable-next-line
      alert('failed to place order')
    }
  } else {
    try {
      const body = {
        lineItems: cartEvents.map(event => ({
          id: event.id,
          name: event.title,
          description: event.details.description,
          amount: 5,
          currency: 'usd',
          quantity: 1,
        })),
        successUrl: 'http://localhost:8080/?session_id={CHECKOUT_SESSION_ID}',
        cancelUrl: 'http://localhost:8080/checkout',
      };
      const { data } = await protectedResourceAxios.post('/api/v1/protected/checkout/session', body);
      // console.log(data);
      const stripeResponse = await stripePromise;
      await stripeResponse.redirectToCheckout({
        sessionId: data,
      });
    } catch (e) {
      // eslint-disable-next-line
      alert('Error placing order');
    }
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

export default {
  handleClickCheckout,
  createEvent,
  getEvent,
  getUpcomingEvents,
  getMyEvents,
};
