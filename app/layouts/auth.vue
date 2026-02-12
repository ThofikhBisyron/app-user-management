<script setup>
import AuthHeader from '~/components/headers/authHeader.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <AuthHeader />
    <main class="flex-1 flex items-center justify-center">
      <slot/>
    </main>
  </div>
</template>
