const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    text: String,
    pros: String,
    cons: String,
    rating: Number,
    date: String
});

module.exports = mongoose.model('Comment', commentSchema);