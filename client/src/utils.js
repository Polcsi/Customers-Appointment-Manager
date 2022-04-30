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
