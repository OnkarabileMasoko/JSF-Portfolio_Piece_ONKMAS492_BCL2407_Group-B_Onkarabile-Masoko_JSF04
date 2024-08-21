<template>
  <div v-for="n in 20" class="max-w-screen-xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div class="bg-gray-200 p-4 rounded shadow animate-pulse">
      <div class="bg-gray-300 h-48 mt-3 rounded"></div>
      <div class="h-6 bg-gray-300 mt-4 rounded"></div>
      <div class="h-4 bg-gray-300 mt-2 rounded"></div>
      <div class="h-4 bg-gray-300 mt-2 rounded"></div>
      <div class="h-6 bg-gray-300 mt-4 w-1/2 rounded"></div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingComponent',
  };
  </script>
  
  <style scoped>
  </style>
  