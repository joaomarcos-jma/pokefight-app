import axios from "axios";
import ErrorHandler from "./ErrorHandler"
let store = {}
window.onNuxtReady(({ $store }) => {
  store = $store
})

export default class ApiService extends ErrorHandler {
  async request(method, uri, data, params) {
    if (!method || !uri) {
      return;
    }

    let url = process.env.baseUrl + uri;

    this.setLoading(true)
    let response = await axios({ method, url, data, params }).catch(err => this.errorHandler(err.response));
    this.setLoading(false)
    return response;
  }

  async setLoading(val) {
    await store.commit('SET_LOADING', val)
  }
}
