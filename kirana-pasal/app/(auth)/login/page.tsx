'use client'

import { useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { loginSucess, logout } from '@/redux/slices/authSlice'

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const authuUser = useSelector((state: RootState) => state.auth)

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email required'),
    password: Yup.string().min(6, 'Min 6 chars').required('Password required'),
  })

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      const response = await fetch('http://localhost:4000/users')
      const users = await response.json()

      const foundUser = users.find(
        (u: any) =>
          u.email === values.email && u.password === values.password
      )

      if (foundUser) {
        const token = `token_${Date.now()}`

        // ✅ SAVE TO REDUX
        dispatch(
          loginSucess({
            token: token,
            user: {
              id: foundUser.id,
              name: foundUser.name,
            },
            loggedIN: true,
          })
        )

        document.cookie = `kirana_auth=true; path=/; max-age=${60 * 60 * 24}`;
        alert(`Login successful! Welcome ${foundUser.name}`)
        router.push('/customer')
      } else {
        alert('Invalid email or password')
      }
    } catch (error) {
      alert('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleForgetPassword = async (email: string) => {
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
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div>
                <label>Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full border p-2"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
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
