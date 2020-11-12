const mongoose = require('mongoose');

//Schema setup
let placeSchema = new mongoose.Schema({
    name: String,
    image: String,
    address: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required : true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: String,
    opened: String,
    cuisine: String,
    menu: String,
    telephone: String,
    creator: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model('Place', placeSchema);