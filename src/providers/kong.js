export const KONG_ADMIN_ENDPOINT=import.meta.env.VITE_KONG_ADMIN_ENDPOINT || "";

import axios from 'axios';

export class KongClient {
  listRoutes() {
    return axios.get(this.requestURL("routes"))
  }

  listServiceRoutes(service_id) {
    return axios.get(this.requestURL(`services/${service_id}/routes`))
  }

  listServices() {
    return axios.get(this.requestURL("services"))
  }

  listPlugins() {
    return axios.get(this.requestURL("plugins"))
  }

  getNode() {
    return axios.get(this.requestURL("/"))
  }

  getRouteService(routeId) {
    return axios.get(this.requestURL(`routes/${routeId}/service`))
  }

  getService(serviceId) {
    return axios.get(this.requestURL(`services/${serviceId}`))
  }

  listEndpoints() {
    return axios.get(this.requestURL("endpoints"))
  }

  requestURL(path) {
    let endpoint = import.meta.env.VITE_KONG_ADMIN_ENDPOINT;
    if (endpoint.endsWith("/")) {
      endpoint = endpoint.slice(0, -1)
    }

    if(path.startsWith("/")) {
      path = path.slice(1)
    }
    return `${endpoint}/${path}`
  }
}
