export function checkCookieExists() {
  return document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("admin="));
}

export function getAdminFromCookie() {
  let adminObject;
  try {
    let cookieValue = document.cookie
      .split(";")
      .find((item) => item.trim().startsWith("admin="));
    adminObject = JSON.parse(cookieValue.split("=")[1]);
  } catch (error) {
    adminObject = null;
  }

  return adminObject;
}
