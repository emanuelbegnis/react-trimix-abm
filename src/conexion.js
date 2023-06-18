import axios from "axios";

const apiURL = "http://localhost:8080";
const corsVar = "cors";

function conexion(
  endpoint,
  { data, token, method, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    mode: corsVar,
    headers: {
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  // Configurar token si es necesario
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  // Configurar método y datos según corresponda
  let axiosPromise;
  if (method === "GET") {
    axiosPromise = axios.get(`${apiURL}/${endpoint}`, config);
  } else if (method === "POST") {
    axiosPromise = axios.post(`${apiURL}/${endpoint}`, data, config);
  } else if (method === "PUT") {
    axiosPromise = axios.put(`${apiURL}/${endpoint}`, data, config);
  } else if (method === "DELETE") {
    axiosPromise = axios.delete(`${apiURL}/${endpoint}`, config);
  } else {
    throw new Error(`Método no soportado: ${method}`);
  }

  return axiosPromise
    .then((response) => {
      console.log(response.status);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export { conexion };
