/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// Store functionality
import actions from './actions'
import getters from './getters'
import modules from './modules/index.js'
import mutations from './mutations'
import state from './state'
import products from './products'
import admin from './admin'
import auth from './auth'
import userProfile from './userProfile'

Vue.use(Vuex)
axios.defaults.baseURL = 'https://hthastore.com/api'

// Create a new store
export default new Vuex.Store({
  modules: {
  actions,
  getters,
  modules,
  mutations,
  state,
  products,
  userProfile,
  admin,
  auth
  }
})

