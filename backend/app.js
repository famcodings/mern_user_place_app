const express = require('express')
const bodyParser = require('body-parser')

const placesRouter = require('./routes/places-routes')

const HttpError = require('./models/http-error')

const app = express()

app.use(bodyParser.json())

app.use('/api/places', placesRouter)

// This middleware is responsible to handle undefined routes (it should be at the end of all routes)
// Req will reach to this middle only if we have not defined a route to handle that request
// Bcz if we handle a request we will send response and not call next
app.use((req, res, next) => {
    throw new HttpError("Could not find this route.", 404)
})

// We will add that middleware at the end of our routes
// Since it takes 4 params, the express will recognize this and use it as error handling middleware
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occured!'})
})

app.listen(3000)