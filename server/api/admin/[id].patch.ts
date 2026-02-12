import { prisma } from '../../utils/prisma'
import { getRouterParam, readBody, getHeaders } from 'h3'
import { auth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    const headers = new Headers(getHeaders(event) as HeadersInit)

    const session = await auth.api.getSession({ headers })

    if (!session?.user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const currentRole = session.user.role

    const id = getRouterParam(event, 'id') as string
    const body = await readBody(event)

    const targetUser = await prisma.user.findUnique({
        where: { id }
    })

    if (!targetUser) {
        throw createError({ statusCode: 404, statusMessage: 'User not found' })
    }

    if (!['admin', 'superadmin'].includes(currentRole)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
    }
    if (session.user.id === id) {
    throw createError({ statusCode: 400, statusMessage: 'Cannot modify your own role' })
    }

    if (currentRole === 'admin' && targetUser.role !== 'user') {
    throw createError({ statusCode: 403, statusMessage: 'Admin cannot modify this user' })
    }

    if (!['admin', 'user'].includes(body.role)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid role' })
    }

    if (currentRole === 'admin' && body.role !== 'user') {
    throw createError({ statusCode: 403, statusMessage: 'Admin cannot promote users' })
    }

    const updatedUser = await prisma.user.update({
        where: { id },
        data: { role: body.role },
        select: {
        id: true,
        name: true,
        email: true,
        role: true
        }
    })

    return updatedUser
})
