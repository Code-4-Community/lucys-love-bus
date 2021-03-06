import moment from 'moment';

function toStringDate(date) {
  const d = moment(date);
  return d.format('M/DD/YYYY');
}

function toStringDateTime(date) {
  const d = moment(date);
  return d.format('M/DD/YYYY h:mm a');
}

function timeBefore(start, end) {
  const s = moment(start, 'HH:mm');
  const e = moment(end, 'HH:mm');
  return s.isBefore(e);
}

function stringDateFiveDaysBefore(date) {
  const d = moment(date).subtract(5, 'days');
  return toStringDate(d);
}

function isInPast(date, start) {
  const str = date.concat(', ', start);
  const d = moment(str, 'YYYY-MM-DD, HH:mm');
  return d.isBefore();
}

function is18YearsInPast(date) {
  const d = moment(date);
  return d.isBefore(moment().subtract(18, 'years'));
}

export default {
  toStringDate,
  toStringDateTime,
  timeBefore,
  stringDateFiveDaysBefore,
  isInPast,
  is18YearsInPast,
};
