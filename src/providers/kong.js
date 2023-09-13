export const KONG_ADMIN_ENDPOINT=import.meta.env.VITE_KONG_ADMIN_ENDPOINT;

import axios from 'axios';

export class KongClient {
  listRoutes(service_id) {
    return axios.get(`${KONG_ADMIN_ENDPOINT}/services/${service_id}/routes`)
  }

  listServices() {
    return axios.get(`${KONG_ADMIN_ENDPOINT}/services/`)
  }

  listPlugins() {
    return axios.get(`${KONG_ADMIN_ENDPOINT}/plugins/`)
  }
}
