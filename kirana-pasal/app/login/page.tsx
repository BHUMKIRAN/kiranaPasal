'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Login = () => {
  const router = useRouter()
  const {id} = useParams()

  const handleForgetPassword = () => router.push('/forgetPassword')
  const handleRegister = () => router.push('/register')

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email required'),
    password: Yup.string().min(6, 'Min 6 chars').required('Password required'),
  })

  const handleSubmit = async (values,  {setSubmitting} ) => {
    try {
      const response = await fetch('http://localhost:4000/users')
      const users = await response.json()
      const user = users.find((u) => u.email === values.email && u.password === values.password)
      if (user) {
        alert(`Login successful! Welcome ${user.name}`)
        router.push('/customer')
      } else alert('Invalid email or password')
    } catch {
      alert('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="flex flex-col bg-white w-80 p-6 rounded-xl shadow-lg space-y-4">
        <h1 className="text-xl font-bold text-center uppercase">Login</h1>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-3">
              {/* Email */}
              <div className="flex flex-col">
                <label className="font-medium mb-1" htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="w-full border rounded p-2 ring ring-blue-300/50"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label className="font-medium mb-1" htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="w-full border rounded p-2 ring ring-blue-300/50"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded font-semibold text-white bg-blue-500 hover:bg-blue-600"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>

              <div className="flex justify-between mt-2 space-x-2">
                <button
                  type="button"
                  onClick={handleRegister}
                  className="w-1/2 py-2 rounded font-semibold text-white bg-green-500 hover:bg-green-600"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={handleForgetPassword}
                  className="w-1/2 py-2 rounded font-semibold text-white bg-red-500 hover:bg-red-600"
                >
                  Forget Password
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
