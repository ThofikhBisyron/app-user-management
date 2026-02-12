export default defineEventHandler(async () => {
    const totalUsers = await prisma.user.count({where: {role: 'user'}})
    const totalAdmins = await prisma.user.count({where: {role: 'admin'}})
    const totalSuperAdmins = await prisma.user.count({where: {role: 'superadmin'}})

    return{
        totalUsers,
        totalAdmins,
        totalSuperAdmins
    }
})