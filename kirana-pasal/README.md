# Kirana Pasal - Project Documentation

**Kirana Pasal** is a frontend e-commerce application for grocery shopping. It features a complete customer-facing storefront and a comprehensive admin dashboard for managing products, users, and orders.

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Components & UI](#components--ui)
6. [Pages & Routes](#pages--routes)
7. [Tools & Libraries](#tools--libraries)
8. [API Integration](#api-integration)
9. [How to Run](#how-to-run)
10. [Database](#database)

---

## 🎯 Project Overview

**Kirana Pasal** is a modern e-commerce platform built with cutting-edge web technologies. It serves two main user roles:

- **Customers**: Browse products, manage shopping cart, and place orders
- **Admins**: Manage products, users, and orders through a dedicated admin dashboard

The application uses **Next.js 16** with **TypeScript** and **React 19** for the frontend, **Tailwind CSS** for styling, and a **JSON Server** mock backend for API operations.

---

## 🛠️ Tech Stack

### **Frontend Framework**
- **Next.js 16.1.1** - React meta-framework for production-ready applications
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **React DOM 19.2.3** - DOM rendering library

### **Styling & UI**
- **Tailwind CSS 4** - Utility-first CSS framework for responsive design
- **Shadcn/UI** - High-quality React components built on Radix UI
- **Lucide React 0.562.0** - Icon library
- **Class Variance Authority 0.7.1** - CSS utility for component variants
- **CLSX 2.1.1** - Utility for conditional classnames
- **Tailwind Merge 3.4.0** - Merge Tailwind classes without conflicts
- **TW Animate CSS 1.4.0** - Tailwind animation utilities

### **Form Handling & Validation**
- **Formik 2.4.9** - Form state management
- **Yup 1.7.1** - Schema validation library

### **HTTP & API Communication**
- **Axios 1.13.2** - Promise-based HTTP client
- **Apollo Client 4.1.0** - GraphQL client (integrated but not heavily used)
- **GraphQL 16.12.0** - Query language

### **Data & Charts**
- **Recharts 2.15.4** - Composable charting library for React
- **RxJS 7.8.2** - Reactive programming library

### **AI Integration**
- **@google/generative-ai 0.24.1** - Google Generative AI SDK
- **@google/genai 1.38.0** - Google GenAI client

### **UI Components (Radix UI)**
- **@radix-ui/react-dialog 1.1.15** - Dialog component primitive
- **@radix-ui/react-separator 1.1.8** - Separator/divider component
- **@radix-ui/react-slot 1.2.4** - Slot component for composition
- **@radix-ui/react-tooltip 1.2.8** - Tooltip component

### **Development & Build Tools**
- **ESLint 9** - Code linting and quality checking
- **JSON Server 1.0.0-beta.3** - Mock REST API server
- **Concurrently 9.2.1** - Run multiple npm scripts concurrently
- **PostCSS 4** - CSS transformation tool
- **Tailwindcss/postcss 4** - PostCSS plugin for Tailwind

### **Type Definitions**
- **@types/node 20** - Node.js type definitions
- **@types/react 19** - React type definitions
- **@types/react-dom 19** - React DOM type definitions

---

## 📁 Project Structure

```
kirana-pasal/
├── app/                           # Next.js App Router
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Google Generative AI chat endpoint
│   ├── (dashboard)/              # Route group for layouts
│   │   ├── admin/               # Admin dashboard routes
│   │   │   ├── layout.tsx       # Admin layout with sidebar
│   │   │   ├── page.tsx         # Admin dashboard home
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx     # Orders list
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx # Order details
│   │   │   ├── products/
│   │   │   │   ├── page.tsx     # Products list
│   │   │   │   ├── ProductTable.tsx # Products table component
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── EditProduct/
│   │   │   │   │   │   └── page.tsx # Edit product
│   │   │   │   │   └── ViewProduct/
│   │   │   │   │       └── page.tsx # View product details
│   │   │   │   └── CreateProduct/
│   │   │   │       └── page.tsx # Create new product
│   │   │   └── users/
│   │   │       ├── page.tsx     # Users list
│   │   │       ├── [id]/
│   │   │       │   ├── EditUser/
│   │   │       │   │   └── page.tsx # Edit user
│   │   │       │   └── ViewUser/
│   │   │       │       └── page.tsx # View user details
│   │   │       └── CreateUsers/
│   │   │           └── page.tsx # Create new user
│   │   └── customer/             # Customer dashboard
│   │       ├── page.tsx         # Customer home
│   │       └── [id]/
│   │           └── page.tsx     # Customer details
│   ├── cart/
│   │   └── page.jsx             # Shopping cart page
│   ├── chat/
│   │   └── page.tsx             # Chat with AI
│   ├── forgetPassword/
│   │   └── [id]/
│   │       └── page.tsx         # Password reset
│   ├── home/
│   │   └── page.tsx             # Home page
│   ├── login/
│   │   └── page.tsx             # Login page
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx         # Product details
│   ├── register/
│   │   └── page.tsx             # Registration page
│   ├── test/
│   │   └── page.tsx             # Test page
│   ├── styles/
│   │   └── product.css          # Product-specific CSS
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home/landing page
│   └── globals.css              # Global styles
├── components/
│   ├── header/
│   │   └── page.tsx             # Navigation header
│   ├── adminsidebar.jsx         # Admin sidebar navigation
│   ├── sidebarall.tsx           # Customer sidebar
│   ├── LogOut/
│   │   └── page.jsx             # Logout component
│   └── ui/                      # Shadcn/UI Components
│       ├── button.tsx           # Button component
│       ├── card.tsx             # Card component
│       ├── chart.tsx            # Chart component
│       ├── input.tsx            # Input component
│       ├── separator.tsx        # Separator component
│       ├── sheet.tsx            # Sheet/Dialog component
│       ├── sidebar.tsx          # Sidebar component
│       ├── skeleton.tsx         # Skeleton loading component
│       └── tooltip.tsx          # Tooltip component
├── data/
│   └── products.jsx             # Sample/dummy data
├── hooks/
│   └── use-mobile.ts            # Custom hook for mobile detection
├── lib/
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
├── db.json                      # JSON Server database
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── tailwind.config.mjs           # Tailwind CSS configuration
├── postcss.config.mjs            # PostCSS configuration
├── eslint.config.mjs             # ESLint configuration
├── components.json              # Shadcn/UI configuration
├── check-model.js               # Model checking utility
├── README.md                    # Project README
└── next-env.d.ts                # Next.js type definitions
```

---

## ✨ Features

### **Customer Features**
-  **User Authentication**: Login and registration with Formik + Yup validation
-  **Product Browsing**: Browse products in a responsive grid layout
-  **Product Details**: View detailed information about products
-  **Shopping Cart**: Add/remove products, manage quantities
-  **Password Recovery**: Forget password functionality
-  **Responsive Design**: Mobile-first responsive layout using Tailwind CSS
-  **AI Chat**: Chat with Google Generative AI for assistance

### **Admin Features**
-  **Admin Dashboard**: Complete admin control panel
-  **Product Management**: 
  - View all products in a table
  - Create new products
  - Edit existing products
  - Delete products
  - View product details
-  **User Management**:
  - View all users
  - Create new users
  - Edit user information
  - View user details
  - Delete users
-  **Order Management**:
  - View all orders
  - Update order status
  - Delete orders
-  **Sidebar Navigation**: Easy navigation between admin sections
-  **Admin Header**: Logout button and notifications section

---

## 🧩 Components & UI

### **Layout Components**
| Component | Purpose |
|-----------|---------|
| `Header` | Navigation bar with logo, cart, and user options |
| `AdminSidebar` | Admin panel navigation menu |
| `SideBarAll` | Customer sidebar for navigation |

### **Shadcn/UI Components**
| Component | Purpose |
|-----------|---------|
| `Button` | Customizable button component |
| `Card` | Container component for content |
| `Input` | Form input field |
| `Separator` | Divider/separator line |
| `Sheet` | Slide-out panel/dialog |
| `Sidebar` | Sidebar with menu structure |
| `Tooltip` | Tooltip hover information |
| `Skeleton` | Loading state skeleton |
| `Chart` | Data visualization |

### **Styling System**
- **Tailwind CSS Utility Classes**: All components use Tailwind for styling
- **Custom CSS**: Product-specific styles in `app/styles/product.css`
- **CSS Variables**: Theme colors and sizing via CSS variables
- **Responsive Breakpoints**: Mobile-first design with `sm:`, `md:`, `lg:` prefixes



### **API Routes**
| Endpoint | Method | Purpose |

| `/api/chat` | `POST` | Google Generative AI chat endpoint |


## 🔧 Tools & Libraries

### **Form Management**
- **Formik**: Form state management with validation integration
- **Yup**: Schema validation for forms
- Validates: email format, password length, required fields

### **HTTP Client**
- **Axios**: Making API requests to JSON Server
- Error handling and request interceptors

### **UI/UX Libraries**
- **Lucide React**: Icon library for beautiful, consistent icons
- **Class Variance Authority**: Dynamic component styling
- **CLSX**: Conditional className joining
- **Tailwind Merge**: Resolving Tailwind class conflicts

### **Data Visualization**
- **Recharts**: Charts and graphs for analytics (for future use)

### **State Management**
- **React Hooks**: `useState`, `useEffect` for component state
- **Next.js Navigation**: `useRouter`, `usePathname` for routing

### **AI Integration**
- **Google Generative AI**: For chat functionality with Gemini models
- Uses `@google/generative-ai` SDK

### **Development Tools**
- **ESLint**: Code quality and linting
- **TypeScript**: Type safety and better IDE support
- **Tailwind CLI**: CSS generation and optimization
- **PostCSS**: CSS processing pipeline

---

## 🌐 API Integration

### **JSON Server Backend** (Mock API)
Runs on `http://localhost:4000`

**Endpoints:**
- `GET /products` - Fetch all products
- `POST /products` - Create new product
- `PUT /products/[id]` - Update product
- `DELETE /products/[id]` - Delete product
- `GET /users` - Fetch all users
- `POST /users` - Create new user
- `PUT /users/[id]` - Update user
- `DELETE /users/[id]` - Delete user
- `GET /orders` - Fetch all orders
- `PATCH /orders/[id]` - Update order status
- `DELETE /orders/[id]` - Delete order
- `GET /cart` - Fetch cart items
- `POST /cart` - Add to cart

### **Data Format Examples**

**Product Object:**
```json
{
  "id": 1,
  "Title": "Product Name",
  "Image": "https://image-url.com/image.jpg",
  "Price": 99.99,
  "Category": "Grocery"
}
```

**User Object:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "secure_password"
}
```

**Order Object:**
```json
{
  "id": 1,
  "customerName": "John Doe",
  "status": "pending",
  "items": [],
  "total": 100.00
}
```

---

## 🚀 How to Run

### **Prerequisites**
- Node.js 18+ and npm/yarn
- Basic knowledge of Next.js and React

### **Installation**
```bash
# Install dependencies
npm install

# or with yarn
yarn install
```

### **Development Mode**
```bash
# Run Next.js dev server and JSON Server together
npm run dev:all

# Or run them separately:
# Terminal 1 - Next.js dev server
npm run dev

# Terminal 2 - JSON Server
npm run json-server
```

### **Build for Production**
```bash
# Build the Next.js app
npm run build

# Start production server
npm start
```

### **Linting**
```bash
# Check code quality
npm run lint
```

### **Access the Application**
- **Customer App**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
- **Mock API Server**: http://localhost:4000

---

## 💾 Database

### **JSON Server Database** (`db.json`)
The application uses **JSON Server** as a mock backend database. This file contains:
- Products collection
- Users collection  
- Orders collection
- Cart items collection

### **Database Features**
- ✅ RESTful API endpoints for CRUD operations
- ✅ Persistent storage (data saved to `db.json`)
- ✅ Auto-increment IDs
- ✅ Query filtering and pagination support
- ✅ Perfect for development and testing

### **Database Structure**
```json
{
  "products": [],
  "users": [],
  "orders": [],
  "cart": []
}
```

---

## 🔐 Authentication & Security

### **Current Implementation**
- Simple email/password authentication with Formik validation
- No token-based authentication (uses session/localStorage)
- Password validation via Yup schema

### **Future Improvements**
- Implement JWT tokens
- Add refresh token mechanism
- Hash passwords using bcrypt
- Implement session management

---

## 📱 Responsive Design

The application is fully responsive using Tailwind CSS breakpoints:
- **Mobile**: Default base styles
- **Tablet**: `sm:` (640px), `md:` (768px)
- **Desktop**: `lg:` (1024px), `xl:` (1280px), `2xl:` (1536px)

---

## 🎨 Color Scheme & Typography

### **Tailwind Color Palette**
- **Primary**: Slate (base color)
- **Accent**: Amber, Red, Pink (header gradient)
- **Backgrounds**: White, Gray (200, 50, 100)
- **Text**: Gray (600, 700, 800)

### **Typography**
- **Fonts**: Geist Sans, Geist Mono
- **Sizes**: Using Tailwind text utilities (text-sm, text-base, text-lg, text-xl, text-2xl)
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

---

## 📦 Key Dependencies Summary

| Package | Version | Purpose |
|---------|---------|---------|
| Next.js | 16.1.1 | React framework |
| React | 19.2.3 | UI library |
| Tailwind CSS | 4 | Styling |
| Shadcn/UI | Latest | Component library |
| Formik | 2.4.9 | Form management |
| Yup | 1.7.1 | Validation |
| Axios | 1.13.2 | HTTP client |
| Lucide React | 0.562.0 | Icons |
| Recharts | 2.15.4 | Charts |
| Apollo Client | 4.1.0 | GraphQL client |
| Google GenAI | 0.24.1 | AI integration |

---

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications for orders
- [ ] User reviews and ratings
- [ ] Inventory management
- [ ] Analytics dashboard
- [ ] Advanced search and filtering
- [ ] Wishlist functionality
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Order tracking real-time updates

---

## 📧 Contact & Support

For questions or issues regarding this project, please refer to the repository or contact the development team.

---

**Last Updated**: January 26, 2026  
**Project Name**: Kirana Pasal  
**Version**: 0.1.0
