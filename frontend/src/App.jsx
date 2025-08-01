import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import ListingPage1 from './pages/listingPage1'
import ListingPage2 from './pages/ListingPage2'
import ListingPage3 from './pages/ListingPage3'
import { useContext } from 'react'
import { userDataContext } from './Context/UserContext'


function App() {
  let {userData}=useContext(userDataContext)
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/listingpage1' element={userData != null ? <ListingPage1 /> : <Navigate to={"/login"}/>}/>
        <Route path='/listingpage2' element={userData != null ? <ListingPage2 /> : <Navigate to={"/login"}/>}/>
        <Route path='/listingpage3' element={userData != null ? <ListingPage3 /> : <Navigate to={"/login"}/>}/>
      </Routes>
    </>
  )
}

export default App
