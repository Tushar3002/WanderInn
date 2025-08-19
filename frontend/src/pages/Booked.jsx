import React, { useContext, useState } from 'react'
import { GiConfirmed } from "react-icons/gi";
import { bookingDataContext } from '../Context/BookingContext';
import { useNavigate } from 'react-router-dom';
import Star from '../Component/Star';
import axios from 'axios';
import { userDataContext } from '../Context/UserContext';
import { listingDataContext } from '../Context/ListingContext';

function Booked() {
    let { bookingData } = useContext(bookingDataContext)
    let [star, setStar] = useState(null)
    let navigate = useNavigate()
    let { getCurrentUser } = useContext(userDataContext)
    let { getListing, cardDetails } = useContext(listingDataContext)

    // ✅ Fix: define serverUrl from env
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    const handleRating = async (id) => {
        try {
            let result = await axios.post(`${serverUrl}/api/listing/ratings/${id}`, {
                ratings: star
            }, { withCredentials: true })

            await getListing()
            await getCurrentUser()
            console.log(result)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const handleStar = (value) => {
        setStar(value)
        console.log("You Rated : ", value)
    }

    return (
        <div className='w-[100vw] min-h-[100vh] flex  items-center justify-center gap-[30px] bg-slate-200 flex-col'>
            <div className='w-[95%] min-w-[500px] h-[400px] bg-[white] flex items-center justify-center border-[1px]
            border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg'>
                <div className='w-[100%] h-[50%] text-[20px] flex items-center justify-center flex-col gap-[20px]
                font-semibold'><GiConfirmed className='w-[100px] h-[100px] text-[green]' />Booking Confirmed</div>
                <div className='w-[100%] flex items-center justify-between text-[16px] md:text-[18px]'>
                    <span>Booking Id : </span><span>{bookingData._id}</span>
                </div>
                <div className='w-[100%] flex items-center justify-between text-[16px] md:text-[18px]'>
                    <span>Owner Details : </span><span>{bookingData.host?.email}</span>
                </div>
                <div className='w-[100%] flex items-center justify-between text-[16px] md:text-[18px]'>
                    <span>Total Rent: </span><span>{bookingData.totalRent}</span>
                </div>
            </div>
            <div className='w-[95%] min-w-[600px] h-[200px] bg-[white] flex items-center justify-center border-[1px]
            border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg'>
                <h1 className='text-[18px]'>{star} of 5 Rating</h1>
                <Star onRate={handleStar} />
                <button
                    className="px-[30px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg text-nowrap"
                    onClick={() => handleRating(cardDetails._id)}
                >
                    Submit
                </button>
            </div>
            <button
                className="px-[30px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg text-nowrap absolute top-[10px] right-[20px]"
                onClick={() => navigate("/")}
            >
                Back To Home
            </button>
        </div>
    )
}

export default Booked
