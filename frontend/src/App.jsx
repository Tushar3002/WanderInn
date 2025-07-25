import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import ListingPage1 from './pages/listingPage1'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/listingpage1' element={<ListingPage1 />}/>
      </Routes>
    </>
  )
}

export default App
