'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Login = () => {
  const router = useRouter()

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email required'),
    password: Yup.string().min(6, 'Min 6 chars').required('Password required'),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://localhost:4000/users')
      const users = await response.json()

      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      )

      if (user) {
        alert(`Login successful! Welcome ${user.name}`)
        router.push('/customer')
      } else {
        alert('Invalid email or password')
      }
    } catch {
      alert('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleForgetPassword = async (email) => {
    if (!email) {
      alert('Please enter email first')
      return
    }

    const response = await fetch(
      `http://localhost:4000/users?email=${email}`
    )
    const users = await response.json()

    if (users.length === 0) {
      alert('User not found')
      return
    }

    router.push(`/forgetPassword/${users[0].id}`)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white w-80 p-6 rounded-xl shadow-lg space-y-4">
        <h1 className="text-xl font-bold text-center uppercase">Login</h1>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-3">
              <div>
                <label>Email</label>
                <Field name="email" className="w-full border p-2" />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>

              <div>
                <label>Password</label>
                <Field type="password" name="password" className="w-full border p-2" />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 rounded"
              >
                Login
              </button>

              <div className="flex justify-between gap-2">
                <button
                  type="button"
                  onClick={() => router.push('/register')}
                  className="w-1/2 bg-green-500 text-white py-2 rounded"
                >
                  Register
                </button>

                <button
                  type="button"
                  onClick={() => handleForgetPassword(values.email)}
                  className="w-1/2 bg-red-500 text-white py-2 rounded"
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