import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { authDataContext } from './authcontext'

export const listingDataContext = createContext() 

function ListingContext({children}) {
    let {title,setTitle}= useState("")
    let [description, setDescription]=useState("")
    let [frontEndImagel, setFrontEndImagel]=useState(null)
    let [frontEndImage2, setFrontEndImage2]=useState(null)
    let [frontEndImage3, setFrontEndImage3]=useState(null)
    let [backEndImagel, setBackEndImagel]=useState(null)
    let [backEndImage2, setBackEndImage2]=useState(null)
    let [backEndImage3, setBackEndImage3]=useState(null)
    let [rent, setRent]=useState("")
    let [city, setCity]=useState("")
    let [landmark, setLandmark]=useState("")
    let [category, setCategory]=useState("")
    let {serverUrl}=useContext(authDataContext)

    let formData = new FormData()
    formData.append("title", title)
    formData.append ("image1", backEndImagel)
    formData.append ("image2", backEndImage2)
    formData.append ("image3", backEndImage3)
    formData.append ("description", description)
    formData.append ("rent", rent)
    formData.append ("city",city)
    formData.append ("landmark", landmark)
    formData.append ("category", category)

    const handleAddListing=async()=>{
        try {
            let formData = new FormData()
            formData.append("title", title)
            formData.append ("image1", backEndImagel)
            formData.append ("image2", backEndImage2)
            formData.append ("image3", backEndImage3)
            formData.append ("description", description)
            formData.append ("rent", rent)
            formData.append ("city",city)
            formData.append ("landmark", landmark)
            formData.append ("category", category)

            const result = await axios.post(serverUrl+"/api/listing/add",formData,{withCredentials:true})
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    let value={
        title, setTitle,
        description, setDescription,
        frontEndImagel, setFrontEndImagel,
        frontEndImage2, setFrontEndImage2,
        frontEndImage3, setFrontEndImage3,
        backEndImagel, setBackEndImagel,
        backEndImage2, setBackEndImage2,
        backEndImage3, setBackEndImage3,
        rent, setRent,
        city, setCity,
        landmark, setLandmark,
        category, setCategory,
        handleAddListing
    }
  return (
    <div>
      <listingDataContext.Provider value={value}>
        {children}
      </listingDataContext.Provider>
    </div>
  )
}

export default ListingContext
