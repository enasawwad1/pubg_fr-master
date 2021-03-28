import api from "../services/api";

const state = {
    allProducts :null,
    allProductsWithKeys :null,
    allUsers:null,
    allTransactions:null,
    productsTypes:null,
    pubgPrices:null,
    pubgOrders:null
};

// getters

const getters = {
  pubgOrders(state){
    return state.pubgOrders
  },
  pubgPrices(state){
    return state.pubgPrices
  },
  productsTypes(state){
    return state.productsTypes
  },
 getAllProducts(state){
     return state.allProducts;
 },
 getAllProductsWithKeys(state){
  return state.allProductsWithKeys;
},
 getAllUsers(state){
     return state.allUsers
 },
 getAllTransactions(state){
     return state.allTransactions
 }
      
};

// actions
const actions = {
    async deletePubgItem({commit},{id}){
      await api.deletePubgItem(id)
      .then(res=>{
        
        // commit('setProductsTypes',res.data)
      })
      .catch(err=>{
        console.log('Error While update Pubg Item.')
      })
},
    async updatePubgItem({commit},{data}){
          await api.updatePubgItem(data)
          .then(res=>{
            
            // commit('setProductsTypes',res.data)
          })
          .catch(err=>{
            console.log('Error While update Pubg Item.')
          })
    },
    async getProductsTypes({commit}){
      await api.getProductsTypes()
            .then(res=>{
              
              commit('setProductsTypes',res.data)
            })
            .catch(err=>{
              console.log('Error While Getting ProductsTypes.')
            })

    },
    async getPubgPrices({commit}){
      await api.getPubgPrices()
            .then(res=>{
              
              commit('setPubgPrices',res.data)
            })
            .catch(err=>{
              console.log('Error While Getting getPubgPrices.')
            })

    },

    async getPubgOrders({commit}){
      await api.getPubgOrders()
            .then(res=>{
              
              commit('setPubgOrders',res.data)
            })
            .catch(err=>{
              console.log('Error While Getting getPubgOrders.')
            })

    },
    async getAllProducts({commit}){
      
      await api.getAllProducts()
           .then( res =>{
             //commit('setSections',result.data)
             
             commit('setAllProducts',res.data)
           })
           .catch(err => {
               console.log('Error While getting Sections ...')
           }) 
           
           
   },
    async getAllProducts_2({commit}){
      
         await api.getAllProducts_2()
              .then( res =>{
                //commit('setSections',result.data)
                
                commit('setAllProducts_2',res.data)
              })
              .catch(err => {
                  console.log('Error While getting Sections ...')
              }) 
              
              
      },
      async getAllUsers({commit}){
      
         await api.getAllUsers()
              .then( res =>{
                
                commit('setAllUsers',res.data)
              })
              .catch(err => {
                  console.log('Error While getting Sections ...')
              }) 
              
      },
      async getAllTransactions({commit}){
      
        await api.getAllTransactions()
              .then( result =>{
                // commit('setSections',result.data)
                
                commit('setAllTransactions',result.data)
              })
              .catch(err => {
                  console.log('Error While getting Sections ...')
              })
              
              /* let data =[
                {
                  id: '6r4LVXEUyeYPEyPLlbgO',
                  value: 'Pubg',
                  date: '4/12/2020',
                  user: 'NY5b7Wxc9MRDMpjvG1bD'
                },
                {
                  id: '9Rfux5odr6Ygr5gqLA45',
                  value: 'Ks Key',
                  date: '1/9/2020',
                  user: 'arMkgzI90WpwpcixxHTx'
                },{
                  id: 'DBRYwRE5Hrr0LJe4sN0Q',
                  value: 'Windows Key',
                  date: '11/4/2020',
                  user: 'xmfhRWaKbzTiHis1j6AB'
                },{
                  id: 'JhiFLtjFFbb6kIih0kWo',
                  value: 'PayPal',
                  date: '23/2/2020',
                  user: 'cfXZjhMs5iybdKH2WekS'
                },{
                  id: '5Zb3mOv7KXqqf6QnuKU6',
                  value: 'Google Play',
                  date: '2/6/2020',
                  user: 'NB6ZNiXctwvkpUq7z4vM'
                },
              ] 
              commit('setAllTransactions',data)*/
      },
      async updateProduct({commit},{product,data}){
        await api.updateProduct(product,data)
              .then(res =>{
                
                // commit('updateProduct',res)
              })
              .catch(err=>{
                console.log('Error While Updating Product.')
              })
      },
      async updateProduct2({commit},{product}){
        console.log('updateProduct2.')

        await api.updateProduct2(product)
              .then(res =>{
                
                // commit('updateProduct',res)
              })
              .catch(err=>{
                console.log('Error While Updating Product2222.')
              })
      },
      async deleteProduct({commit},{id}){
        await api.deleteProduct(id)
              .then(res=>{
                
              })
              .catch(err=>{
                console.log('Error White Deleting Product.')
              })
      },
      async updateUserInfo({commit},{user}){
        await api.updateUserInfo(user)
              .then(res=>{
                console.log('1111111.')
                
              })
              .catch(err=>{
                console.log('Error While Updating User Information.')
              })
      },
      async deleteUser({commit},{id}){
        await api.deleteUser(id)
              .then(res=>{
                
              })
              .catch(err=>{
                console.log('Error While Deleting User.')
              })
      }
};

// mutations
const mutations = {
  setPubgOrders(state,data){
    state.pubgOrders = data
  },
  setPubgPrices(state,data){
    state.pubgPrices = data
  },
    setProductsTypes(state,data){
      state.productsTypes = data
    },
    setAllProducts(state,data){
      
      state.allProducts = null;
        state.allProducts = data
    },
    setAllProducts_2(state,data){
      
      state.allProductsWithKeys = null;
        state.allProductsWithKeys = data
    },
    
    setAllUsers(state,data){
        state.allUsers = data
    },
    setAllTransactions(state,data){
        state.allTransactions = data
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
