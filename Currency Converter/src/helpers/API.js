async function sendRequest(url, method = "GET", options) {
  const response = await fetch(url, {
    method: method,
    ...options,
  });
  const result = await response.json();
  return result;
}

export default sendRequest;
