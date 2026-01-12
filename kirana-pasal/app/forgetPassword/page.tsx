'use client'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const ResetPassword = () => {
  const validationSchema = Yup.object({
    newPassword: Yup.string().min(6, 'Min 6 chars').required('New password required'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password required')
  })

  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    console.log('New Password:', values.newPassword)
    alert('Password successfully changed!')
    resetForm()
    setSubmitting(false)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="flex flex-col bg-white w-80 p-6 rounded-xl shadow-lg space-y-4">
        <h1 className="text-xl font-bold text-center uppercase">Reset Password</h1>

        <Formik
          initialValues={{ newPassword: '', confirmNewPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-3">
              {['newPassword','confirmNewPassword'].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="font-medium mb-1" htmlFor={field}>
                    {field === 'newPassword' ? 'New Password' : 'Confirm Password'}
                  </label>
                  <Field
                    type="password"
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
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ResetPassword