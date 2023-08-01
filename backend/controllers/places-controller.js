const HttpError = require('../models/http-error')

const DUMMY_PLACES = [
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


const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId
    })
    if(!place){
        // 2nd way to handle error (works for both sync and async code)
        return next(new HttpError("Could not find a place with provided user id.", 404))
    }
    res.json({place})
}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;