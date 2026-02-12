<script setup>
import DashboardHeader from '~/components/headers/dashboardHeader.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <DashboardHeader />
    <div class="flex flex-1">      
      <aside class="w-40 bg-white border-r p-4">
        <div class="font-semibold mb-4">Menu</div>
        <div class="space-y-2">
          <div><NuxtLink to="/dashboard" active-class="bg-gray-500 p-2" class="hover:bg-gray-200 p-2">Dashboard</NuxtLink></div>
          <div><NuxtLink to="/users" active-class="bg-gray-500 p-2" class="hover:bg-gray-200 p-2">Users</NuxtLink></div>
          <div><NuxtLink to="/admin" active-class="bg-gray-500 p-2" class="hover:bg-gray-200 p-2">Admin</NuxtLink></div>
          <div><NuxtLink to="/createUser" active-class="bg-gray-500 p-2" class="hover:bg-gray-200 p-2">Create User</NuxtLink></div>
        </div>
      </aside>  
      <main class="flex-1 p-6">
        <slot/>
      </main>
    </div>

  </div>
</template>
