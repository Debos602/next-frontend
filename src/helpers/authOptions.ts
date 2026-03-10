import { sign } from "crypto";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    pages: {
        signIn: "/login"
    }

};

