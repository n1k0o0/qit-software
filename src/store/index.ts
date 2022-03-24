import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: JSON.parse(localStorage.getItem('data')) ?? []
  },
  mutations: {
    ADD_DATA (state, payload) {
      state.data.push(payload)
      localStorage.setItem('data', JSON.stringify(state.data))
    },
    REMOVE_DATA (state, payload) {
      state.data = state.data.filter(value => !payload.includes(value))
      localStorage.setItem('data', JSON.stringify(state.data))
    }
  },
  actions: {
    ADD_DATA ({ commit }, payload) {
      commit('ADD_DATA', payload)
    },
    REMOVE_DATA ({ commit }, payload) {
      commit('REMOVE_DATA', payload)
    }
  },
  getters: {
    GET_DATA (state) {
      return state.data
    }
  }
})
