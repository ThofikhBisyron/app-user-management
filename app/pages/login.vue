<script setup>
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})
const email = ref('')
const password = ref('')

const loading = ref(false)

const toast = useToast()
async function login() {

  if (!email.value || !password.value) {
    toast.add({
      title: 'Validation Error',
      description: 'Email and password must be filled in',
      color: 'warning'
    })
    return
  }

  loading.value = true
  try {
    await $fetch("/api/auth/sign-in/email", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value
      }
    })
    toast.add({
      title: 'Success',
      description: 'Login Successful',
      color: 'success'
    })
    navigateTo("/dashboard")
  } catch (err) {
    console.log(err)
    toast.add({
      title: 'Login Failed',
      description: 'Incorrect email or password',
      color: 'warning'
    })
  } finally {
    loading.value = false
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
