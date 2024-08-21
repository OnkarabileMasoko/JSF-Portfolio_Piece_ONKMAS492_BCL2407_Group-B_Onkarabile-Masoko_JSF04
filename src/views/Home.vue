<template>
    <div class="container mx-auto p-6">
      <div class="mt-4 flex justify-between items-center flex-wrap mb-4">
        <select v-model="selectedCategory" class="border p-2 rounded mb-2 sm:mb-0">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
  
        <div class="flex items-center mb-2 sm:mb-0">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search products..."
            class="border p-2 rounded-l"
          />
          <button
            @click="searchProducts"
            class="bg-white text-black border border-l-0 p-2 rounded-r"
          >
            Search
          </button>
        </div>
  
        <select v-model="sortOrder" class="border p-2 rounded">
          <option value="">Sort by Price</option>
          <option value="default">Default</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>
        <Loading v-if="loading" />
        <ProductGrid :products="filteredProducts" v-else />
      </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import Loading from '../components/Loading.vue';
  import ProductGrid from '../components/ProductGrid.vue';
  
  export default {
    components: {
      Loading,
      ProductGrid
    },
    setup() {
      const products = ref([]);
      const categories = ref([]);
      const searchQuery = ref('');
      const selectedCategory = ref('');
      const sortOrder = ref('');
      const loading = ref(true);
  
      const fetchProducts = async () => {
        loading.value = true;
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        products.value = data;
        loading.value = false;
      };
  
      const fetchCategories = async () => {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        categories.value = data;
      };
  
      const searchProducts = () => {
        // This will trigger the computed property to recalculate
      };
  
      const filteredProducts = computed(() => {
        let prods = products.value;
  
        if (selectedCategory.value) {
          prods = prods.filter(product => product.category === selectedCategory.value);
        }
        if (sortOrder.value === 'asc') {
          prods = prods.sort((a, b) => a.price - b.price);
        } else if (sortOrder.value === 'desc') {
          prods = prods.sort((a, b) => b.price - a.price);
        } else if (sortOrder.value === 'default') {
          prods = prods.sort((a, b) => a.id - b.id);
        }
  
        if (searchQuery.value) {
          prods = prods.filter(product =>
            product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
          );
        }
        return prods;
      });
  
      onMounted(() => {
        fetchProducts();
        fetchCategories();
      });
  
      return {
        products,
        categories,
        searchQuery,
        selectedCategory,
        sortOrder,
        loading,
        searchProducts,
        filteredProducts
      };
    }
  };
  </script>
  /**
 * Home Component
 *
 * This component displays a list of products, allowing users to filter by category, search, and sort by price.
 * It fetches products and categories from the Fake Store API and renders a ProductGrid component with the filtered products.
 *
 * @module Home
 */

// Import necessary components
import { ref, onMounted, computed } from 'vue';
import Loading from '../components/Loading.vue';
import ProductGrid from '../components/ProductGrid.vue';

export default {
  /**
   * Components used in the Home component
   *
   * @type {Object}
   */
  components: {
    Loading,
    ProductGrid
  },

  /**
   * Setup function for the Home component
   *
   * Initializes reactive references, fetches products and categories, and defines computed properties and functions.
   *
   * @returns {Object} An object containing reactive references, computed properties, and functions.
   */
  setup() {
    // Reactive references
    const products = ref([]); // Array to hold products
    const categories = ref([]); // Array to hold categories
    const searchQuery = ref(''); // Search query input
    const selectedCategory = ref(''); // Selected category
    const sortOrder = ref(''); // Sort order (asc, desc, or default)
    const loading = ref(true); // Loading state

    /**
     * Fetch products from the Fake Store API
     *
     * @async
     */
    const fetchProducts = async () => {
      loading.value = true;
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      products.value = data;
      loading.value = false;
    };

    /**
     * Fetch categories from the Fake Store API
     *
     * @async
     */
    const fetchCategories = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const data = await response.json();
      categories.value = data;
    };

    /**
     * Trigger the search function
     */
    const searchProducts = () => {
      // This will trigger the computed property to recalculate
    };

    /**
     * Computed property to filter products based on category, search query, and sort order
     *
     * @returns {Array} An array of filtered products
     */
    const filteredProducts = computed(() => {
      let prods = products.value;

      if (selectedCategory.value) {
        prods = prods.filter(product => product.category === selectedCategory.value);
      }
      if (sortOrder.value === 'asc') {
        prods = prods.sort((a, b) => a.price - b.price);
      } else if (sortOrder.value === 'desc') {
        prods = prods.sort((a, b) => b.price - a.price);
      } else if (sortOrder.value === 'default') {
        prods = prods.sort((a, b) => a.id - b.id);
      }

      if (searchQuery.value) {
        prods = prods.filter(product =>
          product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return prods;
    });

    // Lifecycle function to run when the component mounts
    onMounted(() => {
      fetchProducts();
      fetchCategories();
    });

    // Return reactive references, computed properties, and functions
    return {
      products,
      categories,
      searchQuery,
      selectedCategory,
      sortOrder,
      loading,
      searchProducts,
      filteredProducts
    };
  }
};
<style>
/* Add specific styles for the Home component */
.container {
  background-color: #f0f0f0; /* Add a light gray background color */
}
.flex {
  background-color: #c6efce; /* Add a light green background color */
}
.border {
  border-color: #3e8e41; /* Add a green border color */
}
.bg-white {
  background-color: #34c759; /* Change the background color of the button to green */
}
.text-black {
  color: #fff; /* Change the text color of the button to white */
}
</style>