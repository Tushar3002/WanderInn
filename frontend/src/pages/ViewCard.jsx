import React from 'react'
import { FaArrowLeft } from "react-icons/fa";

function ViewCard() {
  return (
    <div className="w-[100%] h-[100vh] bg-[white] flex items-center justify-center gap-[10px] flex-col overflow-auto relative">
          <div
            onClick={() => navigate("/listingpage2")}
            className="w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px]
             rounded-[50%] flex items-center justify-center "
          >
            <FaArrowLeft className="w-[22px] h-[22px] text-[white]" />
          </div>
          <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]">
            <h1 className="text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden
            px-[70px] md:px-[0px]">
              {`In ${landmark.toUpperCase()} , ${city.toUpperCase()}`}
            </h1>
          </div>
    
          <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:flex-row md:w-[80%]">
          {/* Main Image */}
          <div className="w-[100%] h-[60%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-2 border-white bg-red-500">
            <img src={frontEndImage1} alt="" className="w-full h-full object-cover" />
          </div>
    
          {/* Side Images */}
          <div className="w-full h-full md:w-[30%] md:h-full flex flex-row md:flex-col p-2 md:space-y-2 space-x-2 md:space-x-0">
            <div className="w-1/2 h-full md:w-full md:h-1/2 overflow-hidden border-2">
              <img src={frontEndImage2} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-1/2 h-full md:w-full md:h-1/2 overflow-hidden border-2">
              <img src={frontEndImage3} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
          
        </div>
        <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] ">
          {`${(title || "").toUpperCase()} ${(category || "").toUpperCase()}, ${(landmark || "").toUpperCase()}`}
    
        </div>
        <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] ">
          
        </div>
        <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] ">
          {`${rent.toUpperCase()} `}
        </div>
    
        <div className="w-[95%] h-[50px] flex items-center justify-start px-[110px]">
          <button className="px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] 
                rounded-lg" onClick={handleAddListing}>Edit</button>
        </div>
        </div>
  )
}

export default ViewCard
