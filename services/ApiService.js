import axios from "axios";
import ErrorHandler from "./ErrorHandler"
export default class ApiService extends ErrorHandler {
  async request(method, uri, data, params) {
    if (!method || !uri) {
      return;
    }

    let url = process.env.baseUrl + uri;

    let response = await axios({ method, url, data, params }).catch(err => this.errorHandler(err.response));
    return response;
  }
}
