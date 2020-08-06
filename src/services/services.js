import axios from 'axios';
import { encode as btoa } from 'base-64';
import { BASE_URL, DEFAULT_TIMEOUT } from './config';

const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    Authorization: `Basic ${btoa(`juan-pablo.martina@mediamonks.com:mmba2019!`)}`,
  },
});

const apiRequest = ({ method, endpoint, headers = null, params = null, body = null }) =>
  apiInstance
    .request({
      url: endpoint,
      method,
      params,
      data: body,
      headers,
    })
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    });

export const apiGet = ({ endpoint, endpointProps, headers, params, body }) =>
  apiRequest({ method: 'GET', endpoint, endpointProps, headers, params, body });
export const apiPost = ({ endpoint, endpointProps, headers, params, body }) =>
  apiRequest({ method: 'POST', endpoint, endpointProps, headers, params, body });
export const apiPatch = ({ endpoint, endpointProps, headers, params, body }) =>
  apiRequest({ method: 'PUT', endpoint, endpointProps, headers, params, body });
export const apiDelete = ({ endpoint, endpointProps, headers, params, body }) =>
  apiRequest({ method: 'DELETE', endpoint, endpointProps, headers, params, body });
