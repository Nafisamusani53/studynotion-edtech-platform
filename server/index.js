const express = require("express")
const app = express()
require('dotenv').config()
const {dbConnect} = require('./config/database')

app.use(express.json());

// connect with databases
dbConnect();

// mount the routes
app.use('/api/v1', route);

// start the app
const port = process.env.PORT || 3000
app.listen(port , ()=>{
    console.log("App started")
})

// default route
app.get('/', (req,res) => {
    res.send("This is Homepage")
})