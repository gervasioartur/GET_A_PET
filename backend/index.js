const express = require('express')
const cors = require('cors')
const port = 4000


//config  express, JSON response, solve cros and setiing a public folder for images
const app = express()
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.static('public'))


//configuring routes 
const userRoutes = require('./routes/userRoutes')
const petRoutes = require('./routes/petRoutes')

//Setting the routes
app.use('/users', userRoutes)
app.use('/pets', petRoutes)

app.listen(port)