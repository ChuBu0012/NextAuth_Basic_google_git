import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github';

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
        })
    ],
    secret: "yH+sOgef5JvuB6TAQYfU535CMS4u99E8KV51/fdAGw8="
})