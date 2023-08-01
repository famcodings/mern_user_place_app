const express = require('express')
const bodyParser = require('body-parser')

const placesRouter = require('./routes/places-routes')

const app = express()

app.use('/api/places', placesRouter)


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