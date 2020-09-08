import ApiService from "@/services/ApiService"
const api = new ApiService()
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
  data: {},
  battle: {}
})

export const mutations = {
  CHECK_MOBILE(state, value) {
    state.isMobile = value
  },
  SET_LOADING(state, value) {
    state.isLoading = value
  },
  DATA_POKEMON(state, value) {
    state.data = value
  },
  FIGHTER_ONE(state, value) {
    state.battle.fighter_one = value
  },
  FIGHTER_TWO(state, value) {
    state.battle.fighter_two = value
  }
}
export const actions = {

  async getPokemon({ dispatch }) {
    await dispatch('pokemonRandom', 1)
    await dispatch('pokemonRandom', 2)
  },

  async  pokemonRandom({ dispatch }, payload) {
    let index = Math.floor(Math.random() * 893)
    const data = {
      type: payload,
      id: index
    }
    await dispatch('getPokemonById', data)
  },

  async getPokemonById({ commit }, payload) {
    let response = await api.request('get', `/pokemon/${payload.id}`)
    payload.type === 1 ? commit('FIGHTER_ONE', response.data) : commit('FIGHTER_TWO', response.data)
  }

}
