const express = require('express');
const router = express.Router();
require("dotenv").config();
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage });
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapBoxToken})
const Place = require('../models/place.model'),
Comment = require('../models/comment.model')


//INDEX
router.get('/', async (req, res) => {
    try {
        const places = await Place.find();
        res.json({
            places: places,
            user: req.user,
            authenticated: req.session.auth
        }).status(200).end()
    } catch (err) {
        console.log(err)
    }
})

// :ID SHOW
router.get('/:id', async (req, res) => {
    try {
        const foundPlace = await Place.findById(req.params.id).populate('comments').exec();
        res.json({
            place: foundPlace,
            user: req.user,
            authenticated: req.session.auth
        }).status(200).end()
    } catch (err) {
        console.log(err)
    }
})

//NEW ENTRY
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const geoData = await geocoder.forwardGeocode({
            query: req.body.address,
            limit: 1
        }).send()

        const newPlace = new Place({
            name: req.body.name,
            image: req.file.path,
            address: req.body.address,
            location: geoData.body.features[0].geometry,
            price: req.body.price,
            opened: req.body.opened,
            cuisine: req.body.cuisine,
            menu: req.body.menu,
            telephone: req.body.telephone,
            creator: req.user._id
        })
        await newPlace.save()
        console.log(`User ${req.user.username} added Place - ${newPlace.name} to the DB`)
        res.status(200).end()
    } catch (err) {
        console.log(err)
    }
})

//UPDATE ENTRY
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const geoData = await geocoder.forwardGeocode({
            query: req.body.address,
            limit: 1
        }).send()

        const place = {
            name: req.body.name,
            image: req.file !== undefined ? req.file.path : req.body.image,
            address: req.body.address,
            location: geoData.body.features[0].geometry,
            price: req.body.price,
            opened: req.body.opened,
            cuisine: req.body.cuisine,
            menu: req.body.menu,
            telephone: req.body.telephone,
            creator: req.user._id
        }
        await Place.findByIdAndUpdate(req.params.id, place)
        console.log(`User ${req.user.username} edited ${place.name}`)
        res.status(200).end()
    } catch (err) {
        console.log(err)
    }
})

//DELETE ENTRY
router.delete('/:id', async (req, res) => {
    try {
        await Place.findByIdAndDelete(req.params.id)
        res.status(200).end()
    } catch (err) {
        console.log(err)
    }
})

//POST A COMMENT
router.post('/:id/comments', async (req, res) => { //ADD COMMENT
    try {
        const comment = await Comment.create(req.body);
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        comment.date = Date();
        await comment.save();

        const place = await Place.findById(req.params.id);
        place.comments.unshift(comment);
        await place.save();

        console.log(`Comment by ${req.user.username} for ${place.name} added.`);
        res.status(200).end()
    } catch (err) {
        console.log(err)
    }
})


module.exports = router;