import api from "axios";

export default {
  deletePubgItem(id) {
    
    return api.delete(`https://hthastore.com/api/pubgItem/${id}`)

  },
  updatePubgItem(data) {
    let my_id = data.id;
    delete data.id
    if(data.username == undefined || data.username == null || data.username.length == 0){
      delete data.username
    }
    if(data.mobile_number == undefined || data.mobile_number == null || data.mobile_number.length == 0){
      delete data.mobile_number
    }
    
    return api.put(`https://hthastore.com/api/pubgItem/${my_id}`,data)

  },
  getUserProduct(id) {
    
    return api.get(`https://hthastore.com/api/userProducts/${id}`)

  },
  blockUser(id, valid) {
    let my_data = {
      "id": id,
      "valid": valid
    }
    
    return api.post(`https://hthastore.com/api/block/user`, my_data)

  },

  generalSearch(data) {
    let my_data = {
      query: data
    }
    return api.post(`https://hthastore.com/api/product/search`, my_data)

  },
  supportMessage(data) {

    return api.post(`https://hthastore.com/api/support`, data)

  },
  getAllTransactions(data) {

    return api.get(`https://hthastore.com/api/transactions`)

  },
  getSupportMessage(data) {

    return api.get(`https://hthastore.com/api/support`)

  },
  saveOrderInfo(order) {

    return api.post(`https://hthastore.com/api/product/successPaypal`, order)

  },
  reduceCredit(data, id, usedWay) {
    let my_data = {
      "credit": data
    };
    /* if (usedWay == 'credit') {
      my_data = {
        "credit": data
      }
    } else {
      my_data = {
        debit: data
      }
    } */
    debugger
    return api.put(`https://hthastore.com/api/userCredit/${id}`, my_data)
  },
  updatePubgPricesList(list) {

    let my_data = {
      itemList: list
    }
    return api.post(`https://hthastore.com/api/pubgPrice`, my_data)
  },
  chargePubgAccount(obj) {
    // debugger
    return api.post(`https://hthastore.com/api/pubg`, obj)
  },
  checkProdctItemsAvailability(obj) {
    return api.post(`https://hthastore.com/api/product/buy`, obj)
  },
  successBuy(obj) {
    return api.post(`https://hthastore.com/api/product/successBuy`, obj)
  },
  updateUserProfile(id, data) {
    if(data.user_type !== undefined){
      delete data.user_type
    }
    
    return api.put(`https://hthastore.com/api/user/${id}`, data)
  },
  buyProducts(items) {
    return api.post(`https://hthastore.com/api/product/buy`, items)
  },
  getUserProfile(id) {
    return api.get(`https://hthastore.com/api/user/${id}`)

  },
  login(data) {
    return api.post(`https://hthastore.com/api/login`, data)

  },
  createNewUser(user_info) {

    user_info.credit = 0;
    user_info.debit = 0;

    return api.post(`https://hthastore.com/api/user`, user_info)

  },
  getProductsTypes() {
    return api.get(`https://hthastore.com/api/category`)
  },
  getPubgPrices() {
    return api.get(`https://hthastore.com/api/pubgPrice`)
  },
  getPubgOrders() {
    return api.get(`https://hthastore.com/api/pubg`)
  },
  getProductsItems(id) {
    return api.get(`https://hthastore.com/api/product/${id}`)
  },
  addProduct(product) {

   /*  let my_product = {
      "name": product.name,
      "quantity": 1,
      "price_for_dealer": product.dealers_price,
      "price_for_customer": product.customers_price,
      "link": product.link,
      "productId": product.productId,
      "key": product.key
    }
    Object.keys(my_product).forEach(key => {
      if (my_product[key].length === 0) {
        delete my_product[key]
      }
    }) */

    return api.post('https://hthastore.com/api/product/item', product)
  },
  addProductFull(product) {

    return api.post('https://hthastore.com/api/product', product)
  },
  addCategory(cat) {

    return api.post('https://hthastore.com/api/category', cat)
  },
  addDealer(dealer) {

    let my_dealer = {

      "name": dealer.name,
      "email": dealer.email,
      "username": dealer.username,
      "password": dealer.password,
      "phone": dealer.phone,
      "address": dealer.address,
      "gender": dealer.gender
    }

    my_dealer.credit = 0;
    my_dealer.debit = 0;

    return api.post('https://hthastore.com/api/userDealer', my_dealer)
  },

  getAllProducts() {
    return api.get('https://hthastore.com/api/category')
  },
  getAllProducts_2() {
    return api.get('https://hthastore.com/api/productItems')
  },
  getAllUsers() {
    return api.get('https://hthastore.com/api/users')
  },
  updateProduct(product,data) {

    let my_prod = {
      "name": product.product_item_name,
      "price": 20,
      "quantity": product.product_item_quantity,
      "price_for_dealer": product.product_item_price_dealer,
      "price_for_customer": product.product_item_price_customer,
      "link": product.product_item_link,
      "key": product.product_item_key,
      "coverPhoto": null,
      "productId": product.product_id
    }
    
    return api.put(`https://hthastore.com/api/productItem/${product.product_item_id}`, data)
  },
  updateProduct2(product) {
    
    let my_prod = {
      "quantity": 1
    }
    return api.put(`https://hthastore.com/api/productItem/${product.id}`, my_prod)
  },
  deleteProduct(id) {
    return api.delete(`https://hthastore.com/api/productItem/${id}`)
  },

  updateUserInfo(user) {
    return api.put(`https://hthastore.com/api/user/${user.id}`, user)
  },
  deleteUser(id) {

    return api.delete(`https://hthastore.com/api/user/${id}`)

  }
}
