const HttpError = require('../models/http-error')
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator')


let DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      location: {
        lat: 40.7484474,
        lng: -73.9871516
      },
      address: '20 W 34th St, New York, NY 10001',
      creator: 'u1'
    }
]

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid // {pid: 'value'}
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId
    })
    if(!place){
        // 1st way to handle error (only for synchronous code)
        throw new HttpError("Could not find a place with provided id.", 404)
    }
    res.json({place}) // {place} ==> {place: place}
}


const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId
    })
    if(!places || places.length === 0){
        // 2nd way to handle error (works for both sync and async code)
        return next(new HttpError("Could not find places with provided user id.", 404))
    }
    res.json({places})
}

const createPlace = (req, res, next) => {
    // Validate Request
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        throw new HttpError("Invalid input data", 422)
    }

    // Create Place
    const { title, description, coordinates, address, creator } = req.body
    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }
    DUMMY_PLACES.push(createdPlace)
    res.status(201).json(createdPlace)
}

const updatePlace = (req, res, next) => {
     // Validate Request
     const errors = validationResult(req)
     console.log(errors)
     if(!errors.isEmpty()){
         throw new HttpError("Invalid input data", 422)
     }

    //  Update Place
    const placeId = req.params.pid
    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) }
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId)
    
    updatedPlace.title = req.body.title
    updatedPlace.description = req.body.description

    DUMMY_PLACES[placeIndex] = updatedPlace
    res.status(200).json({place: updatedPlace})
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid
    const place = DUMMY_PLACES.find(p => p.id === placeId)
    if(!place){
        throw new HttpError("Place with provided ID does not exist.", 404)
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId)
    res.status(200).json({message: "Deleted place."})
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;