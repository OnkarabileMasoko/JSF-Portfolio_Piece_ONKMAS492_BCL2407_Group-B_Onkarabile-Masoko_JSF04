import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import axios from 'axios';

export const useShoppingStore = defineStore('shopping', {
  state: () => ({
    products: [],
    cartItems: [],
  }),
  getters: {
    countCartItems: (state) => state.cartItems.length,
    getCartItems: (state) => state.cartItems,
  },
  actions: {
    // Fetch products from the API
    async fetchProducts() {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        this.products = response.data;
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    },
    // Add an item to the cart
    addToCart(item) {
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
        this.showNotification('success', 'Your item has been updated');
      } else {
        this.cartItems.push({ ...item, quantity: 1 });
        this.showNotification('success', 'Your item has been added to the cart');
      }
    },
    // Increment the quantity of an item in the cart
    incrementQ(item) {
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
        this.showNotification('success', 'Item quantity has been increased');
      }
    },
    // Decrement the quantity of an item in the cart
    decrementQ(item) {
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems[index].quantity -= 1;
        if (this.cartItems[index].quantity === 0) {
          this.cartItems.splice(index, 1);
          this.showNotification('success', 'Item has been removed from the cart');
        } else {
          this.showNotification('success', 'Item quantity has been decreased');
        }
      }
    },
    // Remove an item from the cart
    removeFromCart(item) {
      const index = this.cartItems.findIndex(product => product.id === item.id);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        this.showNotification('success', 'Item has been removed from the cart');
      }
    },
    // Show notification using Swal
    showNotification(icon, title) {
      Swal.fire({
        position: 'top-end',
        icon: icon,
        title: title,
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
});
