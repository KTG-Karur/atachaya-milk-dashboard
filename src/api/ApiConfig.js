// import { baseURL, ports } from "./ApiConfig";
import axios from "axios";
/* const dotenv= require('dotenv');*/

const baseURL = process.env.NODE_DEV_BASE_URL;
const ports = process.env.PORT; 

function getBaseUrl(url, type) {
    if (url === "login") {    
        axios.defaults.baseURL = baseURL;    
      }
      else if (url.includes("employee-management")) {    
        axios.defaults.baseURL = baseURL+ports;    
      }else {
        axios.defaults.baseURL = baseURL;    
      }
      return url;
}

export function getAPIUrl(url) {
  let baseURLVal = baseURL+ports;
  baseURLVal = baseURLVal+url
  return baseURLVal;
}

export function apiReturnCallBack(method, url, object = null, config = null) {  
  
  axios.defaults.headers['Content-Type'] = 'application/json';
  axios.defaults.headers['Cache-Control'] = 'no-cache';
  axios.defaults.headers['If-Modified-Since'] = 0;
//    axios.defaults.headers['unit_id'] = 1;
  switch (method) {
    case 'GET':      
      return axios.get(getBaseUrl(url), object, config);
    case 'POST':      
      return axios.post(getBaseUrl(url), object, config);
    case 'PUT':
      return axios.put(getBaseUrl(url), object, config);
    case 'DELETE':
      return axios.delete(getBaseUrl(url), object, config);
    case 'FORMPUT':
      const configs = {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Content-Length': JSON.stringify(object).length,
          'content-type': 'multipart/form-data'
        }
      }
      return axios.put(getBaseUrl(url), object, configs);
    case 'FORMPOST':
      const postConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Content-Length': JSON.stringify(object).length,
          'content-type': 'multipart/form-data'
        }
      }
      return axios.post(getBaseUrl(url), object, postConfig);
  }
}
