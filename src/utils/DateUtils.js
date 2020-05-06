import moment from 'moment';

function toStringDate(date) {
  const d = moment(date);
  return d.format('M/DD/YYYY');
}

export default {
  toStringDate,
};
