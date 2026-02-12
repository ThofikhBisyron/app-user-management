import { auth } from "../../utils/auth"
import { prisma } from "../../utils/prisma"


export default defineEventHandler(async (event) => {
    const headers = new Headers(getHeaders(event) as HeadersInit)

    const session = await auth.api.getSession({ headers })

    if (!session?.user) {
        throw createError({ statusCode: 401})
    }

    const currentRole = session.user.role
    const body = await readBody(event)

    if (!['admin', 'superadmin'].includes(currentRole)) {
        throw createError({ statusCode: 403})
    }

    if (!['admin', 'user'].includes(body.role)) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid Role'})
    }

    if (currentRole === 'admin' && body.role !== 'user') {
        throw createError({ statusCode: 403, statusMessage: 'Admin cannot create admin'})
    }

    const newuser = await auth.api.signUpEmail({
        headers,
        body: {
            name: body.name,
            email: body.email,
            password: body.password,
        }
    })

    const updatedUser = await prisma.user.update({
        where: {id: newuser.user.id},
        data: {role: body.role},
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }
    })

    return updatedUser
})