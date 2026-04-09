'use client'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

// 1️⃣ Zod schema
const resetSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(6, 'Min 6 characters'),
  confirmNewPassword: z.string().min(6, 'Min 6 characters'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'Passwords must match',
  path: ['confirmNewPassword'],
})

export default function ResetPassword() {
  const router = useRouter()
  const { id } = useParams()
  const [user, setUser] = useState<any>(null)

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/users/${id}`)
        setUser(data)
        // Set oldPassword field
        form.reset({
          oldPassword: data.password,
          newPassword: '',
          confirmNewPassword: '',
        })
      } catch (err) {
        console.error(err)
        toast.error('Failed to fetch user')
      }
    }
    fetchUser()
  }, [id])

  const onSubmit = async (values: z.infer<typeof resetSchema>) => {
    try {
      if (!user) return
      await axios.put(`http://localhost:4000/users/${id}`, {
        ...user,
        password: values.newPassword,
      })
      toast.success('Password successfully updated!')
      router.push('/login')
    } catch (err) {
      console.error(err)
      toast.error('Failed to update password')
    }
  }

  if (!user) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-center uppercase">Reset Password</CardTitle>
          <CardDescription className="text-center">
            Change your account password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Old Password */}
              <Controller
                name="oldPassword"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Old Password</FieldLabel>
                    <Input {...field} readOnly className="bg-gray-100" />
                  </Field>
                )}
              />

              {/* New Password */}
              <Controller
                name="newPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>New Password</FieldLabel>
                    <Input {...field} type="password" placeholder="New password" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Confirm New Password */}
              <Controller
                name="confirmNewPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Confirm Password</FieldLabel>
                    <Input {...field} type="password" placeholder="Confirm password" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <CardFooter>
              <Button type="submit" className="w-full mt-2">
                Reset Password
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}