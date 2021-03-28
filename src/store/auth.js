/* import axios from 'axios'


const state = {
  user: null
}

const mutations = {
  setUserData(state, userData) {
    console.log('2- setUserData')
    // app.__vue__.$eventBus.$emit('userBlocked')
    if (userData != undefined && userData != null && userData.accessToken != undefined && userData.accessToken != null && userData.accessToken.length > 0) {
      state.user = userData
      localStorage.setItem('token', userData.accessToken)
      axios.defaults.headers.common.Authorization = `Bearer ${userData.accessToken}`
    }
  },
  setToken(state, userData) {
    // console.log('2- setUserData')

    if (userData != undefined && userData != null && userData.length > 0) {
      // state.user = userData
      localStorage.setItem('token', userData)
      axios.defaults.headers.common.Authorization = `Bearer ${userData}`
    }
  },

  clearUserData() {
    localStorage.removeItem('user')
    location.reload()
  }
}

const actions = {
  loginNew({
    commit
  }, credentials) {
    console.log('1- loginNew')
    return axios
      .post('/login', credentials)
      .then(({
        data
      }) => {
        commit('setUserData', data)
      })
  },

  logout({
    commit
  }) {
    commit('clearUserData')
  }
}

const getters = {
  isLogged: state => !!state.user
}

export default {
  state,
  getters,
  actions,
  mutations
};
 */