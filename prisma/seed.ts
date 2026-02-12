import 'dotenv/config'
import { auth } from '../server/utils/auth'
import { prisma } from '../server/utils/prisma'

async function main() {
  const users = [
    {
      name: 'Super Admin',
      email: 'admin@mail.com',
      password: 'admin123',
      role: 'superadmin',
    },
    {
      name: 'User One',
      email: 'user1@mail.com',
      password: 'user1234',
      role: 'admin',
    },
    {
      name: 'User Two',
      email: 'user2@mail.com',
      password: 'user1234',
      role: 'user',
    },
  ]

  for (const user of users) {
    const existing = await prisma.user.findUnique({
      where: { email: user.email },
    })

    if (!existing) {
      await auth.api.signUpEmail({
        body: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      })

      await prisma.user.update({
        where: { email: user.email },
        data: { role: user.role },
      })

      console.log(`User ${user.email} created`)
    } else {
      console.log(`User ${user.email} already exists`)
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
