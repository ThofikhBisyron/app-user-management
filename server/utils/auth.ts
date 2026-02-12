import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from './prisma'

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_BASE_URL!,
    database: prismaAdapter(prisma, { provider: "postgresql",}),

    emailAndPassword: {enabled: true},

    session: {expiresIn: 60 * 60 * 24 * 7},

    user: {
        additionalFields: {
        role: {
            type: "string",
            required: true,
            defaultValue: "user"
            }
        }
    },

    callbacks: {
        async session({ session, user }: { session: any; user: any }) {
        return {
            ...session,
            user: {
            ...session.user,
            role: user.role
            }
        }
    }
}
})
