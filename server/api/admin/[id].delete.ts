export default defineEventHandler(async (event) => {
    const headers = new Headers(getHeaders(event) as HeadersInit)
    
    const session = await auth.api.getSession({ headers })

    if (!session?.user) {
        throw createError({ statusCode: 401 })
    }

    const currentRole = session.user.role
    const id = getRouterParam(event, 'id') as string

    const targetUser = await prisma.user.findUnique({
        where: { id }
    })

    if (!targetUser) {
        throw createError({ statusCode: 404 })
    }

    if (!['admin', 'superadmin'].includes(currentRole)) {
        throw createError({ statusCode: 403 })
    }

    if (session.user.id === id) {
        throw createError({ statusCode: 400, statusMessage: 'Cannot delete yourself' })
    }

    if (currentRole === 'admin' && targetUser.role !== 'user') {
        throw createError({ statusCode: 403, statusMessage: 'Admin cannot delete this user' })
    }

    await prisma.user.delete({
        where: { id }
    })

    return { message: 'User deleted successfully' }
})