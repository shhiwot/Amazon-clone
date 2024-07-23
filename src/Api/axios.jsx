import axios, { Axios } from "axios";
const axiosInstace = axios.create({
  //for local run time only!!!
  // baseURL: "http://127.0.0.1:5001/clone-627ee/us-central1/api",
  // APi end point from firebase
    baseURL: " https://api-bo6ljwve4q-uc.a.run.app",
});

export { axiosInstace };
