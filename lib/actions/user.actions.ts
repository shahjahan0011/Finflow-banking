'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({email, password}: signInProps) => {
    try {
        // Mutation / Database / Make fetch
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email, password );

        return parseStringify(response);
        
    } catch (error) {
        console.error('Error',error);
    }
}

export const signUp = async (userData : SignUpParams) => {

    // we destrucutre the data so that it could be understood bt newUserAccount(destructuring syntax)
    const {email, password, firstName, lastName} = userData;

    try {
        // create a user acocunt through appwrite
        const { account } = await createAdminClient();

            const newUserAccount = await account.create(ID.unique(),
             email, //we dont have to say userData.email cause we destructured it above
             password,
             `${firstName} ${lastName}`
            );

            const session = await account.createEmailPasswordSession(email, password);

            cookies().set("appwrite-session", session.secret, { //'appwrite-session' the name which is first part before the hyphen has to be same as the one you set up during createClientSession in appwrite.ts 
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                secure: true,
        });

        return parseStringify(newUserAccount); //we use this cause is next.Js you cannot pass a large object so we stringify it before passing it to the server

    } catch (error) {
        console.error('Error',error);
    }
}

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const User = await account.get();
      return parseStringify(User);
      
    } catch (error) {
      return null;
    }
  }

export const logoutAccount = async () => {
    try {
      
        const { account } = await createSessionClient();
        cookies().delete('appwrite-session');

        await account.deleteSession('current');
      
    } catch (error) {
      return null;  
    }
}
  