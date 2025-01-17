import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
 
import { getUserByEmail } from "@/data/user";
import LoginSchema from "./schemas/LoginSchema";
import { UserType } from "@prisma/client";

export default {
 secret:process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          role: profile.role  as UserType ?? "STUDENT",  
          ...profile,
        };
      },
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
       
    }),
    Credentials({
  
       
      async authorize(credentials) {
        
        const validatedFields = LoginSchema.safeParse(credentials);
    
          
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
     
       
          
          const user = await getUserByEmail(email);
      
          
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password,
          ); 

          if (passwordsMatch) return user;
        }
         
        return null;
      }
    })
  ],
} satisfies NextAuthConfig