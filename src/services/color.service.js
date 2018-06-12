import axiosInstance from "../config/axios.config";

const base_url = process.env.APP_BASEPATH;

export function read() {
  const config = {
    method: "GET",
    headers: {}
  };
  return axiosInstance("http://localhost:8080/colors", config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

const responseSuccessHandler = response => {
  return response.data;
};

const responseErrorHandler = error => {
  return Promise.reject(error);
};
