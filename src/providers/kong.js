export const KONG_ADMIN_ENDPOINT=import.meta.env.VITE_KONG_ADMIN_ENDPOINT || "";

import axios from 'axios';

export class KongClient {
  listRoutes() {
    return axios.get(`${KONG_ADMIN_ENDPOINT}/routes`)
  }

  listServiceRoutes(service_id) {
    return axios.get(`${KONG_ADMIN_ENDPOINT}/services/${service_id}/routes`)
  }

  listServices() {
    return axios.get(`${KONG_ADMIN_ENDPOINT}/services`)
  }

  listPlugins() {
    return axios.get(`${KONG_ADMIN_ENDPOINT}/plugins`)
  }

  getNode() {
    return axios.get(`${KONG_ADMIN_ENDPOINT}`)
  }

  getRouteService(routeId) {
    return axios.get(`${KONG_ADMIN_ENDPOINT}/routes/${routeId}/service`)
  }

  getService(serviceId) {
    return axios.get(`${KONG_ADMIN_ENDPOINT}/services/${serviceId}`)
  }

  listEndpoints() {
    return axios.get(`${KONG_ADMIN_ENDPOINT}/endpoints`)
  }
}
