import axios from "axios";
import ErrorHandler from "./ErrorHandler"
let store = {}
if (process.browser) {
  window.onNuxtReady(({ $store }) => {
    store = $store
  })
}

export default class ApiService extends ErrorHandler {
  async request(method, uri, data, params) {
    const token = window.$nuxt.$cookies.get("token");
    if (!method || !uri) {
      return;
    }
    if (token) {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + token,
      };
    }

    let url = "/base_url" + uri; /* use proxy */

    this.setLoading(true)
    await axios({ method, url, data, params }).then((res) => {
      this.setLoading(false)
      return res;
    }).catch((err) => {
      this.setLoading(false)
      return this.errorHandler(err.response)
    });
  }

  async setLoading(val) {
    await store.commit('SET_LOADING', val)
  }
}
