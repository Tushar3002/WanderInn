import React, { createContext, useContext, useState } from 'react'
import { authDataContext } from './authcontext'
import axios from 'axios'
import { userDataContext } from './UserContext'
import { listingDataContext } from './ListingContext'

export const bookingDataContext = createContext()

function BookingContext({children}) {
    let [checkIn,setCheckIn]=useState("")
    let [checkOut,setCheckOut]=useState("")
    let [total,setTotal]=useState(0)
    let [night,setNight]=useState(0)
    let {serverUrl} = useContext(authDataContext)
    let {getCurrentUser}=useContext(userDataContext)
    let {getListing} = useContext(listingDataContext)
    let [bookingData,setBookingData] = useState([])

    const handleBooking=async(id) =>{
        try {
            let result = await axios.post(serverUrl + `/api/booking/create/${id}`,
                {
                    checkIn,checkOut,totalRent:total
                },{withCredentials:true})
                await getCurrentUser()
                await getListing()
                setBookingData(result.data)
                console.log(result.data)
        } catch (error) {
            console.log(error)
            setBookingData(null)
        }
    }

    let value={
        checkIn,setCheckIn,
        checkOut,setCheckOut,
        total,setTotal,
        night,setNight,
        bookingData,setBookingData,
        handleBooking
    }
  return (
    <div>
      <bookingDataContext.Provider value={value}>
        {children}
      </bookingDataContext.Provider>
    </div>
  )
}

export default BookingContext
