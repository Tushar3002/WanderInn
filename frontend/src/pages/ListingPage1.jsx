import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function ListingPage1() {
  let navigate=useNavigate()
  return (
    <div className='w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto'>
      <form action="" className='max-w-[900px] w-[90%] h-[550px] flex items-center justify-start 
      flex-col md:items-start gap-[10px] overflow-auto mt-[50px]'>
            <div onClick={()=>navigate("/")} className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center '>
                <FaArrowLeft className='w-[22px] h-[22px] text-[white]' />
            </div>
            <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center 
            justify-center absolute top-[5%] right-[10px] rounded-[30px] shadow-lg'>SetUP Your Home</div>
            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="title" className='text-[20px] '>Title</label>
              <input type="text" id="title" className='w-[90%] h-[40px] border-[2px] border-[#555656]
               rounded-lg text-[18px] px-[20px]' required/>
            </div>
            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="des" className='text-[20px] '>Description</label>
              <textarea name="des" id="des" className='w-[90%] h-[80px] border-[2px] border-[#555656]
               rounded-lg text-[18px] px-[20px]' required></textarea>
            </div>
            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="img1" className='text-[20px] '>Image 1</label>
              <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
                <input type="file" id="img1" className='w-[100%] text-[15px] px-[10px]' required/>
              </div>
              
            </div>
            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="img2" className='text-[20px] '>Image 2</label>
              <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
                <input type="file" id="img2" className='w-[100%] text-[15px] px-[10px]' required/>
              </div>
              
            </div>
            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="img3" className='text-[20px] '>Image 3</label>
              <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
                <input type="file" id="img3" className='w-[100%] text-[15px] px-[10px]' required/>
              </div>
              
            </div>

            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="rent" className='text-[20px] '>Rent</label>
              <input type="text" id="rent" className='w-[90%] h-[40px] border-[2px] border-[#555656]
               rounded-lg text-[18px] px-[20px]' required/>
            </div>

            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="city" className='text-[20px] '>City</label>
              <input type="text" id="city" className='w-[90%] h-[40px] border-[2px] border-[#555656]
               rounded-lg text-[18px] px-[20px]' required/>
            </div>

            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="landmark" className='text-[20px] '>Landmark</label>
              <input type="text" id="landmark" className='w-[90%] h-[40px] border-[2px] border-[#555656]
               rounded-lg text-[18px] px-[20px]' required/>
            </div>
            <button className='px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] 
            rounded-lg'>Next </button>
          
      </form>
    </div>
  )
}

export default ListingPage1
