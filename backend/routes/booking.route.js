import express from "express"
import isAuth from "../middleware/isAuth.js"
import { cancelBooking, cancelBookingByListing, createBooking, getBooking } from "../controllers/booking.controller.js"

let bookingRouter = express.Router()

bookingRouter.post("/create/:id",isAuth,createBooking)
bookingRouter.get("/:id",isAuth,getBooking)
bookingRouter.delete("/cancel/:id",isAuth,cancelBooking)
bookingRouter.delete("/cancel-by-listing/:listingId",isAuth,cancelBookingByListing)

export default bookingRouter