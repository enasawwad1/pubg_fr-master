import api from "../services/api";
import cookies from "js-cookie"
import router from '../router'
import axios from 'axios'



const state = {
    userProfile:null,
    UserLoginInfo:null,
    credit:0,
    debit:0,
    userStatus:'true',
    userProduct:null,
  user: null

};

// getters

const getters = {
  isLogged: state => !!state.user,
    userProduct(state){
        return state.userProduct
    },
    userStatus(state){
        return state.userStatus
    },
    credit(state){
        return state.credit
    },
    debit(state){
        return state.debit
    },
    userProfile(state){
        return state.userProfile
    },
    getUserLoginInfo(state){
        
        return state.userLoginInfo
    }
};

// actions
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
          .catch(errr=>{
            
            // if (errr.response.status === 400 ) {
              app.__vue__.$eventBus.$emit('LoginErrorIncorrectUserOrPass')
            // }
          })
      },
    
      logout({
        commit
      }) {
        commit('clearUserData')
      },
  async getUserProduct({commit},{id}){
    await api.getUserProduct(id)
          .then(res=>{
               
              commit('setUserProduct',res.data)
          })
          .catch(err => {
              console.log('Error While getting User Product.',err)
          })
},
  async blockUser({commit},{id,valid}){
        await api.blockUser(id,valid)
              .then(res=>{
                    
                    if(res.data[0] == 1){
                        app.__vue__.$eventBus.$emit('userBlocked')

                    }
                  //commit('userBlocked',data)
              })
              .catch(err => {
                  console.log('Error While Block User.',err)
              })
    },
    resetCreditDebit({commit}){
        commit('resetCreditDebit')
    },
    async login({commit},{login_info,ctx}){ // OUT
        
        await api.login(login_info)
              .then(res=>{
                let data ={
                    result : res.data,
                    ctx:ctx
                }
                  commit('setUserLoginInfo',data)
              })
              .catch(err => {
                  console.log('Error While Login Process.',err)
              })
    },
    async createNewUser({commit},{user_info}){
        await api.createNewUser(user_info)
              .then(res=>{
                  
                app.__vue__.$eventBus.$emit('createNewUserSuccess')
              })
              .catch(err => {
                  
                  console.log('Error While Creating New User.')
                app.__vue__.$eventBus.$emit('createNewUserError')

              })
    },
    async getUserProfile({commit},{id,ctx}){
        
       
         await api.getUserProfile(id)
              .then( result =>{
                  
                commit('setUserProfile',result.data)
              })
              .catch(err => {
                  console.log('Error While getting UserProfile ...')
              }) 
              
      },

    async updateUserProfile({commit},{id,data}){
           await api.updateUserProfile(id,data)
                .then((result)=>{
                  //  debugger
                    commit('updateUserProfile',result.data)
                })
                .catch(()=>{
                    console.log('Error While updating user profile ...')
                })
      },

    async addDealer({commit},{dealer}){
        await api.addDealer(dealer)
              .then(res=>{
                  
                // commit('setDealer')
              })
              .catch(err=>{
                  console.log('Error While Creating New Dealer.')
              })
    },
   async reduceCredit({commit},{data,id,usedWay}){
    await api.reduceCredit(data,id,usedWay)
    .then(res=>{
        
      // commit('setDealer')
    })
    .catch(err=>{
        console.log('Error While Updating User Credit.')
    })
      }

};

// mutations
const mutations = {
    setUserData(state, userData) {
        console.log('2- setUserData')
        // app.__vue__.$eventBus.$emit('userBlocked')
        
        if (userData != undefined && userData != null && userData.accessToken != undefined && userData.accessToken != null && userData.accessToken.length > 0) {
            // userData.id = "2b3f2622-36fe-4ecc-aa88-3db2c47fae16"
            state.user = userData
          
          localStorage.setItem('token', userData.accessToken)
          axios.defaults.headers.common.Authorization = `Bearer ${userData.accessToken}`

          localStorage.setItem('user_id', userData.id)
          localStorage.setItem('name', userData.name)

          state.userLoginInfo = userData;
          state.credit = userData.credit;
          state.debit = userData.debit;
          state.userStatus = userData.valid
                
            if(userData.id == "2b3f2622-36fe-4ecc-aa88-3db2c47fae16"){
                    app.__vue__.$eventBus.$emit('admin_here')
            }

            app.__vue__.$eventBus.$emit('login')
            router.push('/')
        }else{
            app.__vue__.$eventBus.$emit('LoginErrorIncorrectUserOrPass')
        }

        
      },
      setToken(state, userData) {
    
        if (userData != undefined && userData != null && userData.length > 0) {
          localStorage.setItem('token', userData)
          axios.defaults.headers.common.Authorization = `Bearer ${userData}`
        }
      },
      setUserId(state, userId) {
    
        if (userId != undefined && userId != null && userId.length > 0) {
          localStorage.setItem('user_id', userId)
        }
      },
    
      clearUserData() {
        localStorage.removeItem('token', userData.accessToken)
          // axios.defaults.headers.common.Authorization = `Bearer ${userData.accessToken}`
          localStorage.removeItem('user_id', userData.id)
          localStorage.removeItem('name', userData.name)
      },
    setUserProduct(state,data){
        
            state.userProduct= data

      },
    reduceCreditCard(state,my_data){
        if(my_data.usedWay == 'credit'){
            state.credit -= my_data.data

        }else{
            state.debit += my_data.data
        }
      },
    resetCreditDebit(state){
        
        state.credit = 0;
        state.debit =0;
    },
    setUserProfile(state,data){
        
        state.userProfile = data;
        state.credit = data.credit;
        state.debit = data.debit;
        state.userStatus = data.valid

    },
    updateUserProfile(state,data){
        
        state.userProfile = data;
    },
    setUserLoginInfo(state,data){ // OUT
        if(data.result !== undefined && data.result!== null){
            try{
                state.userLoginInfo = data.result;
                state.credit = data.result.credit;
                state.debit = data.result.debit;
                state.userStatus = data.result.valid
                cookies.set('name',data.result.name);
                cookies.set('email',data.result.email);
                cookies.set('username',data.result.username)
                cookies.set('id',data.result.id)
                cookies.set('user__type',data.result.userTypeId)
                

                if(data.result.id == "2b3f2622-36fe-4ecc-aa88-3db2c47fae16"){
                    data.ctx.$eventBus.$emit('admin_here')

                }
            }
            catch(e){
            }
            app.__vue__.$eventBus.$emit('login')
            // router.push('/')
        }else{
            app.__vue__.$eventBus.$emit('LoginErrorIncorrectUserOrPass')
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
