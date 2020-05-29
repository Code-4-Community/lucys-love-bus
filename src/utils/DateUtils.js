import moment from 'moment';

function toStringDate(date) {
  const d = moment(date);
  return d.format('M/DD/YYYY');
}

function toStringDateTime(date) {
  const d = moment(date);
  return d.format('M/DD/YYYY h:mm a');
}

export default {
  toStringDate,
  toStringDateTime,
};
