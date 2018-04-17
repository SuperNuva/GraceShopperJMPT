const router = require('express').Router()
const {Trip, Category} = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
    Trip.findById({
        where: {
            id: id
        }
    })
    .then(trip => res.send(trip))
    .catch(next)
})

router.post('/', (req, res, next) => {
    //creates and saves trip to database
    Trip.create(req.data)
    //redirects to the singleTrip view for that trip
    .then(trip => res.redirect(`/${trip.id}`))
    .catch(next)
})
