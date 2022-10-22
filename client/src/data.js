export const monthsArr = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const today = new Date();
export const yearsArr = [
  today.getFullYear() - 4,
  today.getFullYear() - 3,
  today.getFullYear() - 2,
  today.getFullYear() - 1,
  today.getFullYear(),
  today.getFullYear() + 1,
  today.getFullYear() + 2,
  today.getFullYear() + 3,
  today.getFullYear() + 4,
];
