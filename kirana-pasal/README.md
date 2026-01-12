# Mero Kirana Pasal

**Mero Kirana Pasal** is a full-stack web application built using **Next.js**, **React**, and **Tailwind CSS**, designed as an e-commerce platform for groceries. It features **user authentication**, **admin panel**, **product management**, and **shopping cart** functionality. The project uses **Fake Store API** as the backend for testing purposes.

---

## Features

### User Features
- **Login & Registration** forms with **Formik** and **Yup** for form validation.
- **Password Reset / Forget Password** functionality with validation.
- **Product Listing** with detailed views.
- **Shopping Cart** to add/remove products.
- **Responsive Design** using Tailwind CSS.

### Admin Features
- **Admin Dashboard** with sidebar navigation .
- **Header & Sidebar Components** for consistent layout.
- **Product Management** (CRUD operations).
- **Cart Overview** for admin monitoring (optional).

---

## Tech Stack

- **Frontend:**
  - Next.js 16.x
  - React 18.x
  - Tailwind CSS (for UI styling)
  - Formik (for form handling)
  - Yup (for form validation)
  - Shadcn/UI (for components)

- **Backend / API:**
  - Fake Store API (`https://fakestoreapi.com`) for:
    - Users: `/users`
    - Products: `/products`
  - Supports **POST** to add new users and **GET** to retrieve user data.


##  Forms & Validation

All forms use **Formik** and **Yup** for consistent validation and handling:

1. **Login Form**
   - Email & Password
   - Validation: required, email format, min password length
   - Inline Tailwind CSS for styling
   - Login checks against Fake Store API `/users`

2. **Register Form**
   - Full Name, Email, Password, Confirm Password
   - Validation: required, email format, password match
   - POST request to `/users` on submission

3. **Reset / Forget Password Form**
   - New Password & Confirm Password
   - Validation: required, password match
   - Alerts success on change (can integrate with API)

**Design Consistency:**  
All forms have the same width, padding, margin, shadow, border-radius, and input/button styling using **Tailwind classes**.

---
##  API Usage

- **Get All Users**
```js
fetch('https://fakestoreapi.com/users')
  .then(res => res.json())
  .then(data => console.log(data));
Create New User

js
Copy code
fetch('https://fakestoreapi.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 0,
    username: 'John Doe',
    email: 'john@example.com',
    password: '123456'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
Get Single User

js
Copy code
fetch('https://fakestoreapi.com/users/1')
  .then(res => res.json())
  .then(data => console.log(data));
🖥 Admin Panel
Built with Next.js + Shadcn/UI for sidebar navigation.