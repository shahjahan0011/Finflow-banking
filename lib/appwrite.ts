// src/lib/server/appwrite.js
"use server";

import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

// we are creating a new appwrite client and setting its end point in Project so that the appwrite client
// knows exactly what appwrite project to modify which in this case is the JS_Finflow project
// the createSessionClient function validates that it is the correct appwrite session
export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    // we check here if a session exists , if it does not then it displays the Error message
  const session = cookies().get("appwrite-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

//   otherwise we attach the session to the client and then using the get method extract the data
  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

// similarly we do the same thing for the createAdminClient but also added the setKey which allows 
// it to do everything with the appwrite project as we gave API key full permissions for 
// databases,auth,storage and more
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database(){
        return new Databases(client);
    },
    get user(){
        return new Users(client);
    }
  };
}
