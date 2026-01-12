'use client'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Register = () => {
  const validationSchema = Yup.object({
    fullname: Yup.string().min(3, 'Min 3 chars').required('Full name required'),
    email: Yup.string().email('Invalid email').required('Email required'),
    password: Yup.string().min(6, 'Min 6 chars').required('Password required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password required'),
  })

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      const payload = { id: 0, username: values.fullname, email: values.email, password: values.password }
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      console.log('User created:', data)
      alert('Registration successful!')
      resetForm()
    } catch {
      alert('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="flex flex-col bg-white w-80 p-6 rounded-xl shadow-lg space-y-4">
        <h1 className="text-xl font-bold text-center uppercase">Register</h1>

        <Formik
          initialValues={{ fullname: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-3">
              {['fullname','email','password','confirmPassword'].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="font-medium mb-1" htmlFor={field}>
                    {field === 'fullname' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <Field
                    type={field.includes('password') ? 'password' : 'text'}
                    name={field}
                    placeholder={`Enter ${field}`}
                    className="w-full border rounded p-2 ring ring-blue-300/50"
                  />
                  <ErrorMessage name={field} component="div" className="text-red-500 text-sm mt-1" />
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded font-semibold text-white bg-blue-500 hover:bg-blue-600"
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Register