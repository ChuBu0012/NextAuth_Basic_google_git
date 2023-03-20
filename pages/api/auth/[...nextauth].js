import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongoDB from '../../../databases/conn';
import Users from '../../../model/schema';
import { compare } from 'bcryptjs';

export default NextAuth({
    providers: [
        // Google Provider
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET
        }),
        GithubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET
        }),
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials, req) {
                connectMongoDB().catch(err => err)

                // เช็คว่ามีผู้ใช้อยู่
                const result = await Users.findOne({ email: credentials.email })
                if (!result) throw new Error("No user Found with Email Please sign Up...!")

                // compare()
                const checkPassword = await compare(credentials.password, result.password)
                if (!checkPassword || result.email !== credentials.email) throw new Error("Username or Password doesn't match")
                const { username } = result

                console.log(req);
                return { ...result, name: username }
            }
        })
    ],
    secret: "yH+sOgef5JvuB6TAQYfU535CMS4u99E8KV51/fdAGw8=",
})