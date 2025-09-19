// path: /src/app/api/auth/[...nextauth]/options.ts

import dbConnect from '@/app/lib/dbconnect';
import UserModel from '@/app/modal/User';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

// Define interface for your user
interface IUser {
  _id: ObjectId;
  username?: string;
  name?: string;
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',

      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password');
        }

        await dbConnect();

        try {
          // Find user
          const user = (await UserModel.findOne({
            $or: [{ email: credentials.email }, { username: credentials.email }],
          })) as IUser | null;

          if (!user) {
            throw new Error('User not found!');
          }

          // Check password
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordCorrect) {
            throw new Error('Invalid password!');
          }

          // Return user object
          return {
            id: user._id.toString(),
            name: user.username || user.name,
            email: user.email,
          };
        } catch (err: any) {
          throw new Error(err.message || 'Authorization failed');
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.email = (user as any).email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).id = token.id as string;
        (session.user as any).email = token.email as string;
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/page',
  },
};
