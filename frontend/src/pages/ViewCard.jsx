import React, { useContext, useEffect } from 'react'
import { FaArrowLeft } from "react-icons/fa";

import { listingDataContext } from '../Context/ListingContext';
import { useNavigate } from 'react-router-dom';
import {userDataContext} from '../Context/UserContext'
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { authDataContext } from '../Context/authcontext';

function ViewCard() {
  let navigate=useNavigate()
  let {cardDetails} = useContext(listingDataContext)
  let {userData} = useContext(userDataContext)
  let [updatePopUp,setUpdatePopUp]=useState(false)
  let [bookingPopUp,setBookingPopUp]=useState(false)
  let [title, setTitle] = useState(cardDetails.title)
      let [description, setDescription] = useState(cardDetails.description)
      let [backEndImage1, setBackEndImage1] = useState(null)
      let [backEndImage2, setBackEndImage2] = useState(null)
      let [backEndImage3, setBackEndImage3] = useState(null)
      let [rent, setRent] = useState(cardDetails.rent)
      let [city, setCity] = useState(cardDetails.city)
      let [landmark, setLandmark] = useState(cardDetails.landmark)
      let {serverUrl}=useContext(authDataContext)
      let {updating,setUpdating}=useContext(listingDataContext)
      let {deleting,setDeleting}=useContext(listingDataContext)
      let [minDate,setMinDate]=useState("")

  const handleUpdateListing=async()=>{
    setUpdating(true)
    try {
            let formData = new FormData()
            formData.append("title", title)
            if(backEndImage1){formData.append("image1", backEndImage1)}
            if(backEndImage2){formData.append("image2", backEndImage2)}
            if(backEndImage3){formData.append("image3", backEndImage3)}
            formData.append("description", description)
            formData.append("rent", rent)
            formData.append("city", city)
            formData.append("landmark", landmark)

            const result = await axios.post(serverUrl + `/api/listing/update/${cardDetails._id}`, formData, { withCredentials: true })
            setUpdating(false)
            console.log(result)
            navigate("/")
            setTitle("")
            setDescription(null)
            setBackEndImage1(null)
            setBackEndImage2(null)
            setBackEndImage3(null)
            setRent("")
            setCity("")
            setLandmark("")
        } catch (error) {
          setUpdating(false)
            console.log(error)
        }
  }
  const handleDeleteListing = async()=>{
    setDeleting(true)
    try {
      const result = await axios.delete(serverUrl + `/api/listing/delete/${cardDetails._id}`, 
         { withCredentials: true })
      console.log(result.data)
      navigate("/")
      setDeleting(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleImage1 = (e) => {
  console.log("handleImage1 e.target.files:", e.target.files);
  if (e.target.files && e.target.files.length > 0) {
    let file = e.target.files[0];
    setBackEndImage1(file);
  } else {
    console.error("No files found in handleImage1");
  }
};

const handleImage2 = (e) => {
  console.log("handleImage2 e.target.files:", e.target.files);
  if (e.target.files && e.target.files.length > 0) {
    let file = e.target.files[0];
    setBackEndImage2(file);
  } else {
    console.error("No files found in handleImage1");
  }
};

const handleImage3 = (e) => {
  console.log("handleImage3 e.target.files:", e.target.files);
  if (e.target.files && e.target.files.length > 0) {
    let file = e.target.files[0];
    setBackEndImage3(file);
  } else {
    console.error("No files found in handleImage3");
  }
};

  useEffect(()=>{
    let today=new Date().toISOString().split('T')[0]
    setMinDate(today)
  },[])

  return (
    <div className="w-[100%] h-[100vh] bg-[white] flex items-center justify-center gap-[10px] flex-col overflow-auto relative">
          <div
            onClick={() => navigate("/")}
            className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px]
             rounded-[50%] flex items-center justify-center " 
          >
            <FaArrowLeft className="w-[22px] h-[22px] text-[white]" />
          </div>
          <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]">
            <h1 className="text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden
            px-[70px] md:px-[0px]">
              {`In ${cardDetails.landmark.toUpperCase()} , ${cardDetails.city.toUpperCase()}`}
            </h1>
          </div>
    
          <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:flex-row md:w-[80%]">
          {/* Main Image */}
          <div className="w-[100%] h-[60%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-2 border-white bg-red-500">
            <img src={cardDetails.image1} alt="" className="w-full h-full object-cover" />
          </div>
    
          {/* Side Images */}
          <div className="w-full h-full md:w-[30%] md:h-full flex flex-row md:flex-col p-2 md:space-y-2 space-x-2 md:space-x-0">
            <div className="w-1/2 h-full md:w-full md:h-1/2 overflow-hidden border-2">
              <img src={cardDetails.image2} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-1/2 h-full md:w-full md:h-1/2 overflow-hidden border-2">
              <img src={cardDetails.image3} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
          
        </div>
        <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] ">
          {`${(cardDetails.title || "").toUpperCase()} ${(cardDetails.category || "").toUpperCase()}, ${(cardDetails.landmark || "").toUpperCase()}`}
    
        </div>
        <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] ">
          {`${cardDetails.description} `}
        </div>
        <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] ">
          {`${cardDetails.rent} `}
        </div>
    
        <div className="w-[95%] h-[50px] flex items-center justify-start px-[110px]">
          {cardDetails.host == userData._id && <button className="px-[30px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] 
                rounded-lg text-nowrap" onClick={()=>setUpdatePopUp(prev => !prev)}>Edit Listing</button>}
          {cardDetails.host != userData._id && <button className="px-[30px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] 
                rounded-lg text-nowrap" onClick={()=>setBookingPopUp(prev => !prev)}>Reserve</button>}
        </div>

            {/* Update Listing Page */}
            {updatePopUp && <div className='w-[100%] h-[100%] flex items-center justify-center bg-[#000000c6] absolute
            top-[0px] z-[100] backdrop-blur-sm'>
              <RxCross2 onClick={() => setUpdatePopUp(false)}
            className="w-[30px] h-[30px] bg-[red] cursor-pointer absolute top-[6%] left-[25px]
             rounded-[50%] flex items-center justify-center "/>
             <form action="" className='max-w-[900px] w-[90%] h-[550px] flex items-center justify-start 
                   flex-col gap-[10px] overflow-auto mt-[50px] text-white bg-[#272727] p-[20px] rounded-lg' 
                   onSubmit={(e)=>{e.preventDefault()}}>
                         <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[#ffffff] flex items-center 
                         justify-center absolute top-[5%] right-[10px] rounded-[30px] shadow-lg'>Update Your Details</div>
                         <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                           <label htmlFor="title" className='text-[20px] ' >Title</label>
                           <input type="text" id="title" className='w-[90%] h-[40px] border-[2px] border-[#555656]
                            rounded-lg text-[18px] px-[20px] text-black' required placeholder='Give a Title' onChange={(e)=>setTitle(e.target.value)} value={title}/>
                         </div>
                         <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                           <label htmlFor="des" className='text-[20px] '>Description</label>
                           <textarea name="des" id="des" className='w-[90%] h-[80px] border-[2px] border-[#555656]
                            rounded-lg text-[18px] px-[20px] text-black' required onChange={(e)=>setDescription(e.target.value)} value={description || ''}></textarea>
                         </div>
                         <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                           <label htmlFor="img1" className='text-[20px] '>Image 1</label>
                           <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
                             <input type="file" id="img1" className='w-[100%] text-[15px] px-[10px]' required onChange={handleImage1}/>
                           </div>
                           
                         </div>
                         <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                           <label htmlFor="img2" className='text-[20px] '>Image 2</label>
                           <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
                             <input type="file" id="img2" className='w-[100%] text-[15px] px-[10px]' required onChange={handleImage2}/>
                           </div>
                           
                         </div>
                         <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                           <label htmlFor="img3" className='text-[20px] '>Image 3</label>
                           <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
                             <input type="file" id="img3" className='w-[100%] text-[15px] px-[10px]' required onChange={handleImage3}/>
                           </div>
                           
                         </div>
             
                         <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                           <label htmlFor="rent" className='text-[20px] '>Rent</label>
                           <input type="text" id="rent" className='w-[90%] h-[40px] border-[2px] border-[#555656]
                            rounded-lg text-[18px] px-[20px] text-black' required  placeholder='RS ____/day' onChange={(e)=>setRent(e.target.value)} value={rent}/>
                         </div>
             
                         <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                           <label htmlFor="city" className='text-[20px] '>City</label>
                           <input type="text" id="city" className='w-[90%] h-[40px] border-[2px] border-[#555656]
                            rounded-lg text-[18px] px-[20px] text-black' required onChange={(e)=>setCity(e.target.value)} value={city}/>
                         </div>
             
                         <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
                           <label htmlFor="landmark" className='text-[20px] '>Landmark</label>
                           <input type="text" id="landmark" className='w-[90%] h-[40px] border-[2px] border-[#555656]
                            rounded-lg text-[18px] px-[20px] text-black' required onChange={(e)=>setLandmark(e.target.value)} value={landmark}/>
                         </div>
                        <div className='w-[100%] flex items-center justify-center gap-[30px] mt-[20px]'>
                          <button className='px-[10px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] 
                         rounded-lg md:text-[18px] text-nowrap' onClick={handleUpdateListing} disabled={updating}>{updating?"updating ...":"Update Listing "}</button>
                        <button className='px-[10px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] 
                         rounded-lg md:text-[18px] text-nowrap' onClick={handleDeleteListing} disabled={deleting}>{deleting?"deleting ...":"Delete Listing"}</button>
                        </div>
                       
                   </form>
            </div>}
            {bookingPopUp && <div className='w-[100%] min-h-[100%] flex items-center justify-center flex-col
             gap-[30px] bg-[#ffffffcd] absolute top-[0px] z-[100] backdrop-blur-sm md:flex-row md:gap-[100px]'>
              <RxCross2 onClick={() => setBookingPopUp(false)}
              className="w-[30px] h-[30px] bg-[red] cursor-pointer absolute top-[6%] left-[25px]
              rounded-[50%] flex items-center justify-center "/>
              
              <form className='max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f7fbfcfe] p-[20px]
              rounded-lg flex items-center justify-start flex-col gap-[10px] border-[1px] border-[#dedddd]'>
                <h1 className='w-[100%] flex items-center justify-center py-[10px] text-[25px] 
                border-b-[1px] border-[#a3a3a3]'>Confirm and Book</h1>
                <div className='w-[100%] h-[70%] mt-[10px] rounded-lg p-[10px]'>
                  <h3 className='text-[19px] font-semibold'>Your Trip</h3>
                  <div className='w-[90%] flex items-start justify-start gap-[24px] mt-[20px] md:items-start
                   md:justify-center flex-col md:flex-row'>
                  <label htmlFor="checkIn" className='text-[18px] md:text-[20px]'>CheckIn</label>
                  <input type="date" min={minDate} id="checkIn" className='w-[200px] h-[40px] border-2 border-[#555656]
                    rounded-[10px] text-[15px] md:text-[18px] px-[10px] bg-transparent' required />
                  </div>

                  <div className='w-[90%] flex items-start justify-start gap-[10px] mt-[40px] md:items-start
                   md:justify-center flex-col md:flex-row'>
                  <label htmlFor="checkOut" className='text-[18px] md:text-[20px]'>CheckOut</label>
                  <input type="date" min={minDate} id="checkOut" className='w-[200px] h-[40px] border-2 border-[#555656]
                    rounded-[10px] text-[15px] md:text-[18px] px-[10px] bg-transparent' required />
                  </div>
                </div>
                <div className='w-[100%] flex items-center justify-center'>
                  <button className='px-[10px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] 
                  rounded-lg md:text-[18px] text-nowrap'> Book Now</button>
                        
                </div>
              </form>
              <div className='max-w-[450px] w-[90%] h-[450px] bg-[#f7fbfcfe] p-[20px]
              rounded-lg flex items-center justify-center flex-col gap-[10px] border-[1px] border-[#e2e1e1]'>
                <div className='w-[95%] h-[30%] border-[1px] border-[#dedddd]  rounded-lg flex items-center 
                justify-center gap-[8px] p-[20px] overflow-hidden'>
                  <div className='w-[70px] h-[90px] flex items-center justify-center flex-shrink-0 rounded-lg md:w-[100%] 
                  md:h-[100%]'>
                    <img className='w-[50%] h-[100px] rounded-lg ' src={cardDetails.image1} alt="" />
                  
                    <div className='w-[80%] h-[100px] gap-[5px] px-3'>
                      <h1 className='w-[90%] truncate'>{`IN ${cardDetails.landmark.toUpperCase()},${cardDetails.city.toUpperCase()}`}</h1>
                      <h1>{cardDetails.title.toUpperCase()}</h1>
                      <h1>{cardDetails.category.toUpperCase()}</h1>
                    </div>
                  </div>
                </div>
              </div>

            </div>}
        </div>
  )
}

export default ViewCard
