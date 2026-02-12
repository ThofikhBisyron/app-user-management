import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const users = await prisma.user.findMany({
        where: query.role ? {role: String(query.role)} : undefined,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        }
    })

    return users
})