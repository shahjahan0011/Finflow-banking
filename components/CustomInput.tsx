import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldPath } from 'react-hook-form'
import { Interface } from 'readline'
import { z } from 'zod'
import { AuthFormSchema } from '@/lib/utils'

const formschema = AuthFormSchema('sign-up');

interface CustomInput {
    control: Control<z.infer<typeof formschema>>,
    name: FieldPath<z.infer<typeof formschema>>,
    label: string,
    placeholder: string
}

const CustomInput = ({control, name,label,placeholder}: CustomInput) => {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
       <div className="form-item">
            <FormLabel className="form-label">
                {label}
            </FormLabel>
            <div className="flex w-full flex-col">
                <FormControl>
                    <Input
                    placeholder={placeholder}
                    className="input-class"
                    type= {name === "password" ? "password" : "text"}
                    // if name equals to password then type password else text
                    {...field }
                    />
                </FormControl>
                <FormMessage className="form-message mt-2"/>
            </div>
       </div>
    )}
/>
  )
}

export default CustomInput