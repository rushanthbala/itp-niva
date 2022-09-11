import axios from "axios";

const instance = axios.create({
  // https://api.staket.io/
  // http://staket-api.us-east-2.elasticbeanstalk.com/lots/26
  // https://staketapi.moodfor.codes/
  // https://staketapi01.moodfor.codes/
  baseURL: "https://staketapi01.moodfor.codes/",

  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Accept: "multipart/form-data",
  },
});

export default instance;
