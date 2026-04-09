"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { link } from "fs"

// 1️⃣ Zod schema
const loginSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be at least 5 characters.")
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(32, "Password must be at most 32 characters."),
})

export function LoginForm() {
  const router = useRouter()
  const [loginSuccess, setLoginSuccess] = React.useState(false)
  const [loggedInUser, setLoggedInUser] = React.useState<any>(null)
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  React.useEffect(() => {
    if (loginSuccess && loggedInUser) {
      document.cookie = `kirana_auth=${loggedInUser.id}; path=/; max-age=${60 * 60 * 24}; secure; samesite=strict`
      toast.success("Login successful!")
      router.push("/customer") // redirect to customer menu
    }
  }, [loginSuccess, loggedInUser, router])

  // ✅ Fixed postData function
  const postData = async (data: z.infer<typeof loginSchema>) => {
    try {
      // Fetch user by email from backend
      const res = await axios.get(`http://localhost:4000/users?email=${data.email}`)
      const user = res.data[0] // JSON Server returns an array
      console.log(user)

      if (!user) {
        toast.error("Email not found")
        return
      }

      // Check password
      if (user.password !== data.password) {
        toast.error("Password is incorrect")
        return
      }

      // Success: Set auth cookie and redirect
      setLoggedInUser(user)
      setLoginSuccess(true)

    } catch (err) {
      console.error(err)
      toast.error("Something went wrong. Try again!")
    }
  }

  return (
    <div className="flex justify-center mt-20">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to log in.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(postData)}>
            <FieldGroup>
              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="login-password"
                      type="password"
                      placeholder="********"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="vertical">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="login-form">
              Login
            </Button>
            <Button variant="link" onClick={()=>router.push('/register')}>Register</Button>
            <Button variant="link" onClick={()=>router.push ('/forgetPassword')}>Forgot Password</Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginForm