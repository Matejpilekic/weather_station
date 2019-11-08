import axios from "axios";

export default axios.create({
  //baseURL: 'http://192.168.1.24:3001',
  baseURL: 'http://192.168.1.241:3001',
  responseType: "json"
});