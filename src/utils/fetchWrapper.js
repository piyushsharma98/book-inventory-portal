/**
 *
 * @param {*} response  - response from the fetch api
 * checks whether the response has a status ok or else returns error
 */
const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  return Promise.reject(response);
};

const formatResponse = async (response) => {
  let contentType = response.headers && response.headers.get("content-type");
  if (!contentType) {
    return await "";
  }
  contentType = contentType.toLowerCase();
  if (contentType.indexOf("application/json") !== -1) {
    return await response.json();
  }
  if (contentType.indexOf("text/plain") !== -1) {
    return await response.text();
  }
  if (
    contentType.indexOf("image/") !== -1 ||
    contentType.indexOf("/pdf") !== -1 ||
    contentType.indexOf("/msword") !== -1
  ) {
    // Returning response instead of blob so that the response headers can be read from the control.
    return response;
  }
  return await "";
};

/**
 *
 * @param {*} url - url returned from endpoints getContentServiceUrl
 * @param {*} fetchOptions - other options like body or headers
 */
async function fetchWrapper(url, fetchOptions) {
  const {
    headers,
    redirect,
    referrerPolicy,
    method,
    body = null,
    isMultiPart = false,
    returnWithoutFormat = false,
  } = fetchOptions || {};

  const defaultHeaders = {};
  if (!isMultiPart) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const payload = {
    method: method || "GET",
    headers: { ...defaultHeaders, ...headers },
    body,
    redirect: redirect || "follow", // manual, *follow, error
    referrerPolicy: referrerPolicy || "no-referrer",
  };

  const fetchPayload = {
    ...payload,
  };

  /* eslint-disable no-return-await */
  if (returnWithoutFormat) {
    return await fetch(url, fetchPayload)
      .then(checkStatus)
      .then((res) => res)
      .catch(async (err) => {
        const errorObject = await formatResponse(err);

        const error = {
          errMessage: errorObject.message || err.statusText,
          code: errorObject.errorCode || err.status,
          operationName: url,
          error: true,
          statusCode: err.status,
        };
        return error;
      });
  }

  return await fetch(url, fetchPayload)
    .then(checkStatus)
    .then((res) => formatResponse(res))
    .catch(async (err) => {
      const errorObject = await formatResponse(err);

      const error = {
        errMessage: errorObject.message || err.statusText,
        code: errorObject.errorCode || err.status,
        operationName: url,
        error: true,
        statusCode: err.status,
      };

      return error;
    });
}

export default fetchWrapper;
