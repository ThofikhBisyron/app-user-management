<script setup>
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()

const scrolled = computed(() => y.value > 1)

const router = useRouter()

const errorMessage = ref('')
const loading = ref(false)
const toast = useToast()

const user = useState('auth_user')

async function logout() {
  errorMessage.value = ''
  loading.value = true
  try { 
    await $fetch("/api/auth/sign-out", {
      method: "POST",
      body: {}
    })
    toast.add({
      title: 'Success',
      description: 'Successfully Logout',
      color: 'green'
    })
    user.value = null
  router.push('/login')
  } catch (err) {
    console.log(err)
    errorMessage.value = 'Something went wrong'
    toast.add({
        title: 'Error',
        description: errorMessage,
        color: 'red'
    })
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <header 
  :class="['h-16 flex items-center justify-between px-6 border-b sticky top-0 z-50 shadow-sm transition-all duration-100',
    scrolled ? 'bg-gray-300/50' : 'bg-gray-300'
  ]"
  >   
    <div class="font-bold text-lg">
      Admin Panel
    </div>
    <div class="flex items-center gap-5">
      <span class="text-sm text-gray-600">
        Hello, {{ user?.name || 'User' }}
      </span>
      <UButton @click="logout" :loading="loading">
        Logout
      </UButton>
    </div>

  </header>
</template>
