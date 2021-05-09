export function createSerializedFormData(dataMap) {
  let formData = "";
  for (const key in dataMap) {
    formData = `${formData + key}=${dataMap[key]}&`;
  }

  if (formData.length) {
    formData = formData.slice(0, -1);
  }

  console.log(formData);
  return formData;
}

/**
 *
 * @param {*} cname - cookie name
 * @param {*} cvalue  - cookie value
 * @param {*} expiryValue - expiry time of the cookie
 * @param {*} expiryUnit  - It can be either of "d - day", "m - minute", "s- seconds"
 */
export function setCookie(cname, cvalue, expiryValue = "1", expiryUnit = "s") {
  const d = new Date();
  const multiplier = {
    s: 1 * 1000, // seconds
    m: 60 * 1000, // minutes
    h: 60 * 60 * 1000, // hours
    d: 60 * 60 * 24 * 1000, // days
  };

  const expiryTime = expiryValue * multiplier[expiryUnit];
  d.setTime(d.getTime() + expiryTime);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}
