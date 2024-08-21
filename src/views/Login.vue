<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
      <h2 class="text-center text-2xl font-extrabold text-gray-900">Sign in to your account</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input v-model="username" id="username" name="username" type="text" autocomplete="username" required
                 class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
        </div>

        <div class="mt-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="relative">
            <input :type="passwordFieldType" v-model="password" id="password" name="password" required
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
            <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              {{ passwordFieldType === 'password' ? 'Show' : 'Hide' }}
            </button>
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" :disabled="loading" 
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>

        <div v-if="error" class="mt-4 text-center text-red-500">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const passwordFieldType = ref('password');
    const loading = ref(false);
    const error = ref(null);
    const router = useRouter();

    const togglePasswordVisibility = () => {
      passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
    };

    const handleLogin = async () => {
      if (!username.value || !password.value) {
        error.value = 'Username and password are required';
        return;
      }

      loading.value = true;
      error.value = null;

      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value
          })
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        console.log(data); // To view the response from the API

        localStorage.setItem('jwt', data.token);

        const redirectPath = localStorage.getItem('redirectPath') || '/';
        router.push(redirectPath);
      } catch (err) {
        error.value = 'Login failed. Please check your credentials.';
      } finally {
        loading.value = false;
      }
    };

    return {
      username,
      password,
      passwordFieldType,
      loading,
      error,
      togglePasswordVisibility,
      handleLogin
    };
  }
};
</script>
