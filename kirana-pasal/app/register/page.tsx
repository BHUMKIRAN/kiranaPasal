'use client'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Register = () => {

  const router = useRouter()
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Min 3 characters')
      .required('Name required'),

    email: Yup.string()
      .email('Invalid email')
      .required('Email required'),

    phone: Yup.string()
      .required('Phone required'),

    password: Yup.string()
      .min(6, 'Min 6 characters')
      .required('Password required'),
  })

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
  }

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('http://localhost:4000/users', values)
      alert('User registered successfully')
      router.push('/customer')
    } catch (error) {
      console.error(error)
      alert('Registration failed')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold">Register</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <Field
                name="name"
                placeholder="Name"
                className="w-full rounded-lg border px-4 py-2"
              />
              <ErrorMessage name="name" component="p" className="text-sm text-red-500" />
            </div>
            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border px-4 py-2"
              />
              <ErrorMessage name="email" component="p" className="text-sm text-red-500" />
            </div>
            <div>
              <Field
                name="phone"
                placeholder="Phone"
                className="w-full rounded-lg border px-4 py-2"
              />
              <ErrorMessage name="phone" component="p" className="text-sm text-red-500" />
            </div>
            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border px-4 py-2"
              />
              <ErrorMessage name="password" component="p" className="text-sm text-red-500" />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Register