<script setup>
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})
const email = ref('')
const password = ref('')

const loading = ref(false)
async function login() {

  loading.value = true
  try {
    await $fetch("/api/auth/sign-in/email", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value
      }
    })
    loading.value = false
    navigateTo("/dashboard")
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
    <UCard variant="solid" class="w-96">
      <template #header>
        <div class="text-center">Login</div>
      </template>
      <div class="flex flex-col gap-2 items-center">
        <UInput
        class="w-80"
        v-model="email"
        placeholder="Enter Your Email"
        type="email"
        />
        <UInput
        class="w-80"
        v-model="password"
        placeholder="Enter Your Password"
        type="password"
        />
      </div>
      <div class="mt-10 flex justify-center">
        <UButton @click="login" class="w-40 justify-center" :loading="loading">
          Login
        </UButton>
      </div>
    </UCard>
</template>
