'use client'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'

const ResetPassword = () => {
  const router = useRouter()
  const { id } = useParams()

  const [user, setUser] = useState<any>(null)

  const validationSchema = Yup.object({
    newPassword: Yup.string().min(6, 'Min 6 chars').required('New password required'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm password required')
  })

  // Fetch user by ID
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`http://localhost:4000/users/${id}`)
      setUser(data)
    }
    fetchUser()
  }, [id])

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    await axios.put(`http://localhost:4000/users/${id}`, {
      ...user,
      password: values.newPassword
    })

    alert('Password successfully changed!')
    setSubmitting(false)
    router.push('/login')
  }

  if (!user) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-80 p-6 rounded-xl shadow-lg space-y-4">
        <h1 className="text-xl font-bold text-center uppercase">Reset Password</h1>

        <Formik
          initialValues={{
            oldPassword: user.password,
            newPassword: '',
            confirmNewPassword: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form className="space-y-3">

              {/* OLD PASSWORD */}
              <div>
                <label className="font-medium">Old Password</label>
                <Field
                  type="text"
                  name="oldPassword"
                  readOnly
                  className="w-full border rounded p-2 bg-gray-100"
                />
              </div>

              {/* NEW PASSWORD */}
              <div>
                <label className="font-medium">New Password</label>
                <Field
                  type="password"
                  name="newPassword"
                  className="w-full border rounded p-2"
                />
                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="font-medium">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmNewPassword"
                  className="w-full border rounded p-2"
                />
                <ErrorMessage name="confirmNewPassword" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-500 text-white rounded font-semibold"
              >
                {isSubmitting ? 'Updating...' : 'Reset Password'}
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ResetPassword