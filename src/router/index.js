import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import ProductDetail from '../views/ProductDetails.vue';
import Wishlist from '../views/Wishlist.vue';
import Cart from '../views/Cart.vue'

const routes = [
  { path: '/', name:'home', component: Home },
  { path: '/login', name:'login', component: Login },
  { path: '/product/:id', name:'product', component: ProductDetail, props: true, meta: { requiresAuth: true } },
  { path: '/wishlist', name:'wishlist', component: Wishlist },
  { path: '/cart', name:'cart', component: Cart }
];

const router = createRouter({
  history: createWebHistory('/'),  // Updated to use a static base URL
  routes
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('jwt');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    localStorage.setItem('redirectPath', to.fullPath);
    next('/login');
  } else {
    next();
  }
});

export default router;

