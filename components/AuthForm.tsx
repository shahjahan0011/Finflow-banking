'use client';

import Link from 'next/link'
import React, { useState } from 'react'
import Image from "next/image"
import { Loader2 } from 'lucide-react';

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { AuthFormSchema } from '@/lib/utils';
import SignUp from '@/app/(auth)/sign-up/page';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';
 
const AuthForm = ({type}:{type: string}) => {
    const router = useRouter();
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const loggedInUser = getLoggedInUser();

    const formschema = AuthFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      email: "", 
      password: "",
    }
  })
 
  // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof 
    formschema>) => {
    setIsLoading(true);
    
    try {
       // sign-up with appwrite and create a plaid link token
       if (type === 'sign-up') {
            const newUser = await signUp(data); //we made everthing except for email/pw optional to get rid of error
            //even though we know, the optional parameters are going to be present we can do this cause the zod-validation on the form is protecting us
            setUser(newUser);
       } 

       if (type === 'sign-in') {
            const response = await signIn({
                email: data.email,
                password: data.password,
            })
            if(response) router.push('/')
        }        
    } catch (error) {
        console.log(error)  
    }finally {
        setIsLoading(false)
    }
    
  }    

  return (
    <section className="auth-form">
        <header className="flex flex-col gap-5 md:gap-8">
            {/* copied the whole link part from mobilenav.tsx */}
            <Link href="/" className="cursor-pointer flex items-center gap-1">
            <Image 
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Finflow logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold
             text-black-1">Finflow</h1>
            </Link>

            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                    {user
                        ? 'Link Account'
                        : type === 'sign-in'
                            ? 'Sign In'
                            : 'Sign Up'
                    }
                    <p className="text-16 font-normal text-gray-600">
                        {user
                            ? 'Link your account to get started'
                            : 'Please enter your details'
                        }
                    </p>
                </h1>
            </div>
        </header>
        {user ?(
            <div className="flex flex-col gap-4">
                {/* Plaidlink */}
            </div>
        ):(
            <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* we check if type is equal to sign-up than  */}
                 {type === 'sign-up' && (
                    <>
                    <div className="flex gap-4">
                        <CustomInput 
                            control={form.control}
                            name="firstName"
                            label="First Name"
                            placeholder="Enter your first name"
                        /> 
                        <CustomInput 
                            control={form.control}
                            name="lastName"
                            label="Last Name"
                            placeholder="Enter your lastname"
                        /> 
                    </div>
                    <CustomInput 
                        control={form.control}
                        name="address1"
                        label="Address"
                        placeholder="Enter your address"
                    /> 
                    <CustomInput 
                        control={form.control}
                        name="city"
                        label="City"
                        placeholder="Enter your city"
                    /> 
                    <div className="flex gap-4">
                        <CustomInput 
                            control={form.control}
                            name="state"
                            label="State"
                            placeholder="Ex: BC"
                        /> 
                        <CustomInput 
                            control={form.control}
                            name="postalCode"
                            label="Postal Code"
                            placeholder="Ex: V1V 1V8"
                        /> 
                    </div>
                    <div className="flex gap-4">
                        <CustomInput 
                            control={form.control}
                            name="dateOfBirth"
                            label="Date of Birth"
                            placeholder="YYYY-MM-DD"
                        /> 
                        <CustomInput 
                            control={form.control}
                            name="ssn"
                            label="SSN"
                            placeholder="Ex: 123-456-687"
                        /> 
                    </div>
                    </>
                 )} 

                   {/* below fields are common for both sign-in and sign-up  */}
                    <CustomInput 
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                    /> 
                    
                    <CustomInput 
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                    />
                    <div className="flex flex-col gap-4">
                        <Button className="form-btn" type="submit" disabled={isLoading}> {/*disabled makes sure user cannot spam the button when it is loading */}
                            {isLoading ?(
                                <>
                                    <Loader2 size={20} //had to import it manually from lucide-react
                                    className="animate-spin"
                                    /> &nbsp;
                                    Loading...
                                </>
                            ): type === 'sign-in'  //else if type equals to sign-in 
                            ? 'Sign In' : 'Sign Up'}  
                                                        {/* show Sign In else show Sign Up  */}
                        </Button>
                    </div>
                </form>
            </Form>

            <footer className="flex justify-center gap-1">
                        <p className="text-14 font-normal text-gray-600">
                            { type === 'sign-in'
                            ? "Don't have an account?"
                            : "Already have an account?"
                            }
                        </p>
                        <Link href={type === 'sign-in' ? '/sign-up':'sign-in'}
                            className="form-link">
                            {type === 'sign-in' ? 'Sign Up':'Sign In'}
                        </Link>
            </footer>
            </>
        )}
    </section>
  )
}

export default AuthForm