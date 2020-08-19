import axios from 'axios'
// import { API_BASE } from '~/util/enviroments'
export default {
    request(method, uri, data, params) {
        const token = window.$nuxt.$cookies.get("token")
        if (!method || !uri) {
            return
        }
        if (token) {
            axios.defaults.headers.common = {
                'Authorization': "Bearer " + token
            };
        }

        // let url = API_BASE + uri   
        let url = '/base_url' + uri /* use proxy */

        return axios({ method, url, data, params }).catch(err => err)
    }
}