/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '',
    // Relative to /src/views
    view: 'Home'
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/Login',
    name: 'Login',
    view: 'Login',
  },
  {
    path: '/product/:id',
    name: 'product',
    view: 'product',
  },
  {
    path: '/Admin',
    view: 'Admin'
  },
  {
    path: '/Admin/newDealer',
    name: 'New Dealer',
    view: 'newDealer'
  },
  {
    path: '/Admin/newProduct',
    name: 'New Product',
    view: 'newProduct'
  },
  {
    path: '/pubg',
    name: 'Pubg Charging',
    view: 'pubg'
  }
]
