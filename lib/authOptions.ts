import { authService } from "@/src/service/auth";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      // eslint-disable-next-line
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const isLogin = await authService.login(credentials);

        if (!isLogin) {
          return null;
        }

        if (isLogin?.access_token) {
          const user = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
            {
              headers: {
                Authorization: `Bearer ${isLogin.access_token}`,
              },
            }
          );

          return {
            email: user.data.email,
            id: String(user.data.id),
            name: user.data.name,
            image: user.data.photo,
            access_token: isLogin.access_token,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: process.env.JWT_TTL ? Number(process.env.JWT_TTL) : 24 * 60 * 60,
  },
  callbacks: {
    // eslint-disable-next-line
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.accessToken = user?.access_token;
        token.id = user?.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          accessToken: token.accessToken,
          id: token.id,
        });
      }
      return session;
    },
  },
};
