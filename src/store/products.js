import api from "../services/api";
import router from '../router'
import cookies from "js-cookie"


const state = {
  productsItems : null,
  cart_items:[],
  buyData:null,
  amountFromRes:0,
  productsFounded:0,
  support:null,
  resultSearch : null

};

// getters

const getters = {
  getSearchRes(){
    return state.resultSearch;

  },
  getProductsFounded(){
    return state.productsFounded;

  },
  getCartItems(state){
    return state.cart_items;
  },
  buyData(state){
    return state.buyData
  },
  productsItems(state){
    
       return state.productsItems
    },
    supportMessages(state){
      return state.support
   },
      
};

// actions
const actions = {
  async generalSearch({commit},{data}){
    
    await api.generalSearch(data)
          .then((res)=>{
            
            commit('setSearchResults',res.data)
          })
          .catch(()=>{
            console.log('Error While Saving Order Details.')
          })
    },
       
  async getSupportMessage({commit}){
    
    await api.getSupportMessage()
          .then((res)=>{
            
            commit('setSupportMessages',res.data)
          })
          .catch(()=>{
            console.log('Error While Saving Order Details.')
          })
  },
  async supportMessage({commit},{data}){
    
    await api.supportMessage(data)
          .then(()=>{

          })
          .catch(()=>{
            console.log('Error While Saving Order Details.')
          })
  },
  async saveOrderDetails({commit},{order}){
    
    await api.saveOrderInfo(order)
          .then(()=>{

          })
          .catch((e)=>{
            console.log('Error While Saving Order Details.',e)
          })
  },
  async updatePubgPricesList({commit},{list}){
    await api.updatePubgPricesList(list)
          .then(res => {

          })
          .catch(err => {
            console.log('Error While Updating Pubg Prices List.')
          })
  },
  async chargePubgAccount({commit},{data}){
    await api.chargePubgAccount(data)
          .then(res=>{

          })
          .catch(err =>{
            console.log('Error while charging pubg account.')
          })
  },
  async checkProdctItemsAvailability({commit},{products}){
    await api.checkProdctItemsAvailability(products)
          .then(res => {
            
            commit('productsAvailable',res.data)
          })
          .catch(err => {
            console.log('Error While check Prodct Items Availability.')
          })
  },
  async successBuy({commit},{obj}){
    await api.successBuy(obj)
          .then(res=>{
            console.log('successBuy >>> ',res)

          })
          .catch(err=>{
            console.log('Error While Buying Products.')
          }) 
  },
  async buyProducts({commit},{items}){
    await api.buyProducts(items)
          .then(res=>{
            commit('setBuyData',res.data)
          })
          .catch(err=>{
            console.log('Error While Buying Products.')
          }) 
  },
  removeAllCartItems({commit}){
    commit('removeAllCartItems')
  },
    addCartItem({commit},{item}){
      commit('addCartItem',item)
    },
    removeCartItem({commit},{id}){
      commit('removeCartItem',id)
    },
    async getProductsItems({commit},{prod_id}){
      
       
         await api.getProductsItems(prod_id)
              .then( res =>{
                
                commit('setProductsItems',res.data)
              })
              .catch(err => {
                  console.log('Error While getting Sections ...')
              }) 
              
      },

    async addProduct({commit},{product}){
      
      await api.addProduct(product)
            .then(res => {
              
              // commit('setProduct')
            })
            .catch(err =>{
              console.log('Error While adding new product.')
            })
    },
    async addCategory({commit},{cat}){
      
      await api.addCategory(cat)
            .then(res => {
              
              // commit('setProduct')
            })
            .catch(err =>{
              console.log('Error While adding new product.')
            })
    },
    async addProductFull({commit},{product}){
      
      await api.addProductFull(product)
            .then(res => {
              
              // commit('setProduct')
            })
            .catch(err =>{
              console.log('Error While adding new product.')
            })
    }
};

// mutations
const mutations = {
  setSearchResults(state,data){
    state.resultSearch = data;
  },
  setSupportMessages(state,data){
    state.support = data;
  },
  productsAvailable(state,data){
    if(data.message!==undefined && data.message.includes('buy is successfuly complete')){
      state.productsFounded = 1;

    }else if(data.message!==undefined &&  data.message.includes('the quantity was not valid!') ){
      state.productsFounded = -1;

    }else{
      state.productsFounded = -2;

    }
  },
  setBuyData(state,data){
    
    cookies.set('amount',data.transactions[0].amount.total);
    
    state.buyData = data
    for(let i in data.links){
      if(data.links[i].rel == 'approval_url'){
        window.open(data.links[i].href,"_self");
      }
    }
  },
  removeAllCartItems(state){
    
    state.cart_items=[]
  },
  addCartItem(state,item){
    state.cart_items.push(item)
  },
  removeCartItem(state,id){
    
    let index = state.cart_items.findIndex(item => item.id === id)
    if(index !== -1){
      state.cart_items.splice(index,1)
    }
  },
  setProductsItems(state, data){
      
        state.productsItems = data
      }
};

export default {
    state,
    getters,
    actions,
    mutations
};
