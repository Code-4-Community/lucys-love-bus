function dollarsToCents(dollarValue) {
  return Math.round(dollarValue * 100);
}

function centsToDollars(centValue) {
  const inDollars = centValue / 100;
  return Number.parseFloat(inDollars).toFixed(2);
}

export default {
  dollarsToCents,
  centsToDollars,
};
