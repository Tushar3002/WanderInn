# Wander Inn - Project Setup Guide

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Cloudinary account

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the backend directory with the following variables:

   ```env
   # Database Configuration
   MONGODB_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/wander_inn

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173

   # Node Environment
   NODE_ENV=development

   # Server Port
   PORT=8000
   ```

4. **Create public directory:**

   ```bash
   mkdir public
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🔧 Configuration Details

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace `your_username`, `your_password`, and `your_cluster` in the MONGODB_URL

### Cloudinary Setup

1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret from the dashboard
3. Add them to your .env file

### JWT Secret

Generate a strong random string for JWT_SECRET (you can use any random string generator)

## 🎯 Features

### ✅ Working Features

- User authentication (signup/login/logout)
- Property listing creation and management
- Property search and filtering
- Booking system with date validation
- Rating system
- Admin dashboard
- Responsive design

### 🔧 Recent Fixes Applied

1. **ViewCard Route**: Fixed missing ID parameter
2. **Authentication**: Fixed response data access
3. **Booking System**: Fixed date selection state synchronization
4. **Category Mapping**: Fixed UI/backend category mismatch
5. **Admin Dashboard**: Fixed hardcoded URLs
6. **Import Paths**: Fixed AdminContext import

## 🚨 Important Notes

1. **Environment Variables**: Make sure all required environment variables are set
2. **Public Directory**: The backend needs a `public` directory for file uploads
3. **CORS**: Frontend URL is configured for localhost:5173
4. **Database**: Ensure MongoDB Atlas is accessible
5. **Cloudinary**: Required for image uploads

## 🐛 Troubleshooting

### Common Issues:

1. **"MongoDB connection failed"**: Check your MONGODB_URL
2. **"Cloudinary upload failed"**: Verify your Cloudinary credentials
3. **"CORS error"**: Ensure FRONTEND_URL matches your frontend URL
4. **"JWT verification failed"**: Check your JWT_SECRET

### Development Tips:

- Use browser dev tools to check for console errors
- Check network tab for API call failures
- Verify environment variables are loaded correctly
- Ensure both frontend and backend are running

## 📱 Available Routes

### Frontend Routes:

- `/` - Home page with property listings
- `/login` - User login
- `/signup` - User registration
- `/listingpage1` - Property creation step 1
- `/listingpage2` - Property creation step 2 (category selection)
- `/listingpage3` - Property creation step 3 (preview)
- `/viewcard/:id` - Property details and booking
- `/mylisting` - User's property listings
- `/mybooking` - User's bookings
- `/booked` - Booking confirmation
- `/admin` - Admin dashboard

### Backend API Routes:

- `/api/auth/*` - Authentication endpoints
- `/api/user/*` - User management
- `/api/listing/*` - Property management
- `/api/booking/*` - Booking management
- `/api/admin/*` - Admin functions
