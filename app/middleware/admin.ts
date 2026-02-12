export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'user' | 'admin' | 'superadmin'
}

interface SessionResponse {
  user: AuthUser | null
}

export default defineNuxtRouteMiddleware(async () => {
  const authUser = useState<SessionResponse['user']>('auth_user')

  if (!authUser.value) {
    return navigateTo('/login')
  }

  if (!['admin', 'superadmin'].includes(authUser.value.role)) {
    return navigateTo('/unauthorized')
  }
})