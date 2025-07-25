import express from "express"
import isAuth from "../middleware/isAuth"
import upload from "../middleware/multer"
import { addListing } from "../controllers/listing.controller"

let listingRouter = express.Router()

listingRouter.post("/add",isAuth,upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1}
]),addListing)

export default listingRouter