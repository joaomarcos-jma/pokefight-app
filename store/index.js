import axios from "@/plugins/axios"
import { API_BASE } from '@/util/enviroments'
export const state = () => ({
    isMobile: null,
    isAuthenticated: false,
    isLoading: false,
    expires: '',
    expiresUser: '',
    token: '',
    access_token: '',
    refresh_token: '',
    isLoggedIn: false,
    data: []
})

export const mutations = {
    CHECK_MOBILE(state, value) {
        state.isMobile = value
    },
    SET_AUTHENTICATED(state, value) {
        state.isAuthenticated = true
        state.expires = Math.round(new Date().getTime() / 1000) + value.expires_in
    },
    AUTH_USER(state, value) {
        state.isLoggedIn = true
        state.access_token = value.access_token;
        state.refresh_token = value.refresh_token;
        state.token = value.access_token;
        state.expiresUser = Math.round(new Date().getTime() / 1000) + value.expires_in
    },
    SET_LOADING(state, value) {
        state.isLoading = value
    },
    LOGOUT(state, payload) {
        window.$nuxt.$cookies.remove('token')
        Object.keys(state).forEach(key => state[key] = payload)
        state.isLoading = false
        state.isLoggedIn = false
    },
    DATA_EXAMPLE(state, value) {
        state.data = value

    }
}
export const actions = {
    async authenticated({ commit }) {
        let auth_body = {
            grant_type: 'client_credentials',
            client_id: 3,
            client_secret: 'bwsaeVPUJQg8MEzj3qzUYR91qVYoQCKGDVe2WtNq',
        }
        let response = await axios.request('post', '/oauth/token', auth_body)
        commit('SET_AUTHENTICATED', response.data)
        window.$nuxt.$cookies.set('token', response.data.access_token)
    },

    async login({ commit }, payload) {
        commit('SET_LOADING', true)
        let auth_body = {
            'grant_type': 'password',
            'username': payload.username,
            'password': payload.password,
            'client_id': '2',
            'client_secret': '3nMocUr42n2Hw31c6UPh1nDshs9H6u9rby2LSZpw'
        }
        let response = await axios.request('post', '/oauth/token', auth_body)
        commit('SET_LOADING', false)
        if (response.status !== 200) {
            return this.$swal.fire('Usuario ou Senha Invalidos', '', 'error')
        }
        commit('AUTH_USER', response.data)
    },

    async refreshToken({ state, dispatch, commit }) {
        let refresh_token = state.refresh_token
        if (!refresh_token) {
            commit('LOGOUT');
            return false;
        }
        let auth_body = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'client_id': '2',
            'client_secret': '3nMocUr42n2Hw31c6UPh1nDshs9H6u9rby2LSZpw'
        };
        await axios.request('post', '/oauth/token', auth_body).then(async response => {
            await new Promise(async resolve => {
                await dispatch('updateToken', response.data);
                // await dispatch('getUser');
                resolve();
            }).then(() => {
                return true;
            });
        }).catch(() => {
            commit('LOGOUT');
            return false;
        })
    },
    updateToken({ commit }, data) {
        commit('AUTH_USER', data);
    },

    async getDataExample({ commit, state }, payload) {
        commit('SET_LOADING', true)
        // use params type 1 
        // let obj = {
        //     page: payload.page,
        //     field: this.$functions.isNumeric(this.$mask.unmask(payload.search))
        //         ? this.$mask.unmask(payload.search)
        //         : payload.search
        // };
        // let params = this.$functions.objParams(obj);
        // let concatParam =
        //     params.page +
        //     (params.name || params.cpf ? params.name || params.cpf : "");
        // let response = await axios.request("get", `/api/route?${concatParam}`)

        // type 2
        this.$axios.setToken(state.token)
        let response = await this.$axios.get(`${API_BASE}/api/route`, {
            params: payload
        })

        commit('SET_LOADING', false)
        if (response.status === 200) {
            commit("DATA_EXAMPLE", response.data);
        }
    },

}