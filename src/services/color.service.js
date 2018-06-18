import axiosInstance from "../config/axios.config";

export function read() {
  const config = {
    method: "GET",
    headers: {}
  };
  return axiosInstance(`https://hh-interview-server.herokuapp.com:8080/colors`, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function colorScraper() {
  const config = {
    method: "GET",
    headers: {}
  };

  return axiosInstance(`https://hh-interview-server.herokuapp.com:8080/scrape-colors`, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

const responseSuccessHandler = response => {
  return response.data;
};

const responseErrorHandler = error => {
  return Promise.reject(error);
};
