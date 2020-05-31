import moment from 'moment';

function toStringDate(date) {
  const d = moment(date);
  return d.format('M/DD/YYYY');
}

function toStringDateTime(date) {
  const d = moment(date);
  return d.format('M/DD/YYYY h:mm a');
}

function stringDateFiveDaysBefore(date) {
  const d = moment(date).subtract(5, 'days');
  return toStringDate(d);
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
  stringDateFiveDaysBefore,
  isInPast,
  is18YearsInPast,
};
