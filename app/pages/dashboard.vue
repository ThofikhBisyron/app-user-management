<script setup>
definePageMeta({
  layout: 'dashboard',
})

const {data: stats} = await useFetch('/api/stats')
const user = useState('auth_user')
</script>
<template>
  <div class="text-center">Welcome Back {{ user?.name || 'User' }}</div>
  <div class="flex justify-between items-center m-40 gap-3">
    <UCard class="bg-blue-200 text-center w-full">
      <div class="text-4xl font-semibold">
        {{ stats?.totalUsers }}
      </div>
      <div>Total Users</div>
    </UCard>
    <UCard class="bg-green-200 text-center w-full">
      <div class="text-4xl font-semibold">
        {{ stats?.totalAdmins }}
      </div>
      <div>Total Admin</div>
    </UCard>
    <UCard  class="bg-red-200 text-center w-full">
      <div class="text-4xl font-semibold">
        {{ stats?.totalSuperAdmins }}
      </div>
      <div>Super Admin</div>
    </UCard>
  </div>
</template>
