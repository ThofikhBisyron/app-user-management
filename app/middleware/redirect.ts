type SessionResponse = {
  user: {
    id: string 
    email: string
    role: string
  } | null
}

export default defineNuxtRouteMiddleware(async () => {
  try {
    const session = await $fetch<SessionResponse>('/api/auth/get-session')

    if (session?.user) {
      return navigateTo('/dashboard')
    } else {
      return navigateTo('/login')
    }
  } catch (error) {
    return navigateTo('/login')
  }
})
