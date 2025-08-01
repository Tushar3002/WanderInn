import React, { useContext } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../Context/ListingContext';

function ListingPage1() {
  let navigate=useNavigate()
  let {
    title, setTitle,
        description, setDescription,
        frontEndImage1, setFrontEndImage1,
        frontEndImage2, setFrontEndImage2,
        frontEndImage3, setFrontEndImage3,
        backEndImage1, setBackEndImage1,
        backEndImage2, setBackEndImage2,
        backEndImage3, setBackEndImage3,
        rent, setRent,
        city, setCity,
        landmark, setLandmark,
        category, setCategory
  }=useContext(listingDataContext)

  const handleImage1 = (e) => {
  console.log("handleImage1 e.target.files:", e.target.files);
  if (e.target.files && e.target.files.length > 0) {
    let file = e.target.files[0];
    setBackEndImage1(file);
    setFrontEndImage1(URL.createObjectURL(file));
  } else {
    console.error("No files found in handleImage1");
  }
};

const handleImage2 = (e) => {
  console.log("handleImage2 e.target.files:", e.target.files);
  if (e.target.files && e.target.files.length > 0) {
    let file = e.target.files[0];
    setBackEndImage2(file);
    setFrontEndImage2(URL.createObjectURL(file));
  } else {
    console.error("No files found in handleImage1");
  }
};

const handleImage3 = (e) => {
  console.log("handleImage3 e.target.files:", e.target.files);
  if (e.target.files && e.target.files.length > 0) {
    let file = e.target.files[0];
    setBackEndImage3(file);
    setFrontEndImage3(URL.createObjectURL(file));
  } else {
    console.error("No files found in handleImage3");
  }
};

  return (
    <div className='w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto'>
      <form action="" className='max-w-[900px] w-[90%] h-[550px] flex items-center justify-start 
      flex-col md:items-start gap-[10px] overflow-auto mt-[50px]' onSubmit={
        (e)=>{e.preventDefault()
          navigate("/listingpage2")
        }
      }>
            <div onClick={()=>navigate("/")} className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center '>
                <FaArrowLeft className='w-[22px] h-[22px] text-[white]' />
            </div>
            <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center 
            justify-center absolute top-[5%] right-[10px] rounded-[30px] shadow-lg'>SetUP Your Home</div>
            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="title" className='text-[20px] '>Title</label>
              <input type="text" id="title" className='w-[90%] h-[40px] border-[2px] border-[#555656]
               rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setTitle(e.target.value)} value={title}/>
            </div>
            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="des" className='text-[20px] '>Description</label>
              <textarea name="des" id="des" className='w-[90%] h-[80px] border-[2px] border-[#555656]
               rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setDescription(e.target.value)} value={description}></textarea>
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
               rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setRent(e.target.value)} value={rent}/>
            </div>

            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="city" className='text-[20px] '>City</label>
              <input type="text" id="city" className='w-[90%] h-[40px] border-[2px] border-[#555656]
               rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setCity(e.target.value)} value={city}/>
            </div>

            <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]'>
              <label htmlFor="landmark" className='text-[20px] '>Landmark</label>
              <input type="text" id="landmark" className='w-[90%] h-[40px] border-[2px] border-[#555656]
               rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setLandmark(e.target.value)} value={landmark}/>
            </div>
            <button className='px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] 
            rounded-lg'>Next </button>
          
      </form>
    </div>
  )
}

export default ListingPage1
