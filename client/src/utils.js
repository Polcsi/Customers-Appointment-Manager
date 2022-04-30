export function convertQueryObjectToString(queryObject) {
  let queryString = "";
  if (queryObject) {
    Object.entries(queryObject).forEach(
      ([key, value]) => (queryString += `${key}=${value}&`)
    );
    return queryString.substring(0, queryString.length - 1);
  } else {
    return queryString;
  }
}

export function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}
