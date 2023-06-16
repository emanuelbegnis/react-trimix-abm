const apiURL = "http://localhost:8080";
const corsVar = "cors";

function conexion(
  endpoint,
  { data, token, method, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    mode: corsVar,
    body: data ? new URLSearchParams(data) : undefined,
    headers: {
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => await response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export { conexion };
