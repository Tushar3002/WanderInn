import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './Context/AuthContext.jsx'
import UserContext from './Context/UserContext.jsx'
import ListingContext from './Context/ListingContext.jsx'
import BookingContext from './Context/BookingContext.jsx'
import AdminContext from './Context/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthContext>
  <AdminContext>
    <ListingContext>
      <UserContext>
        <BookingContext>
          <App />
        </BookingContext>
      </UserContext>
    </ListingContext>
  </AdminContext>
</AuthContext>
    
  </BrowserRouter>,
)
