import { query as q } from "faunadb"

import NextAuth from 'next-auth'
import { signIn } from 'next-auth/client'
import Providers from 'next-auth/providers'

import { fauna } from "../../../services/fauna"

// api router
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
  ],
  callbacks: {
    async signIn(user, account, profile){
      const { email } = user

      try {
        await fauna.query(
          q.Create(
            q.Collection('users'),
            { data: { email } }
          )
        )
  
        return true
      } catch {
        return false
      }
    },
  }
})