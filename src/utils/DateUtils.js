import moment from 'moment';

function toStringDate(date) {
  const d = moment(date);
  return d.format('M/DD/YYYY');
}

function toStringDateTime(date) {
  const d = moment(date);
  return d.format('M/DD/YYYY h:mm a');
}

function isInPast(date) {
  const d = moment(date);
  return d.isBefore();
}

function is18YearsInPast(date) {
  const d = moment(date);
  return d.isBefore(moment().subtract(18, 'years'));
}

export default {
  toStringDate,
  toStringDateTime,
  isInPast,
  is18YearsInPast,
};
