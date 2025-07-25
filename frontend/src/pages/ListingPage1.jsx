import React from 'react'
import { FaArrowLeft } from "react-icons/fa";

function ListingPage1() {
  return (
    <div className='w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto'>
      <form action="" className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center 
      flex-col md:items-start gap-[10px] overflow-auto'>
            <div onClick={()=>navigate("/")} className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center '>
                <FaArrowLeft className='w-[22px] h-[22px] text-[white]' />
            </div>
      </form>
    </div>
  )
}

export default ListingPage1
