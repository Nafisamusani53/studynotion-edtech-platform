require('dotenv').config()
const express = require("express")
const app = express()
const {dbConnect} = require('./config/database')
const {cloudinaryConnect} = require('./config/cloudinay');
const cors = require('cors')
const cookieparser = require('cookie-parser')
const fileUpload = require('express-fileupload')

// imports all the routes here
const userRoutes = require('./routes/user')
const profileRoutes = require('./routes/profile')
const paymentRoutes = require('./routes/payments')
const courseRoutes = require('./routes/course')
const contactUs = require('./routes/contactUs')

app.use(express.json());

// connect with databases
dbConnect();

// middlewares
// app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: 'https://studynotion-edtech-platform-hazel.vercel.app',
    credentials: true,
}))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}))

// connection with cloudinary
cloudinaryConnect();


// mount the routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/payment', paymentRoutes)
app.use('/api/v1/reach', contactUs)

// default route
app.get('/', (req,res) => {
    res.json({
        success: true,
        message : "Your server is running....."
    })
})

// start the app
const port = process.env.PORT || 4000
app.listen(port , ()=>{
    console.log("App started")
})

