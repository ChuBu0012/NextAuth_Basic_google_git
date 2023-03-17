import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    providers : [
        // Google Provider
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET
        })
    ]
})