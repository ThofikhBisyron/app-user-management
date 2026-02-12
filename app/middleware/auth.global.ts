type SessionResponse = {
  user: {
    id: string
    email: string
    role: string
  } | null
}

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/login') return

  const authUser = useState<SessionResponse['user']>('auth_user', () => null)

  if (!authUser.value) {
    try {
      const session = await $fetch<SessionResponse>('/api/auth/get-session')
      authUser.value = session.user
    } catch {
      authUser.value = null
    }
  }

  if (!authUser.value) {
    return navigateTo('/login')
  }
})