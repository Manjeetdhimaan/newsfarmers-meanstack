const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    id: {
        type: String,
        trim: true
    },
    category: [],
    categoryId: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    urlTitle: {
        type: String,
        trim: true
    },
    imgSrc: {
        type: String,
        trim: true
    },
    instaSimpleLink: {
        type: String,
        trim: true
    },
    twitterSimpleLink: {
        type: String,
        trim: true
    },
    facebookSimpleLink: {
        type: String,
        trim: true
    },
    linkedinSimpleLink: {
        type: String,
        trim: true
    },
    otherFacts:[
        {
            type: Object,
            fact: {
                type: String,
                trim: true
            },
            imgSrc: {
                type: String,
                trim: true
            },
            imgCaption: {
                type: String,
                trim: true
            },
            videoSrc: {
                type: String,
                trim: true
            },
            instaLink: {
                type: String,
                trim: true
            },
        }
    ],
 
}, {
    usePushEach: true
})

module.exports = mongoose.model('News', NewsSchema);
// module.exports = mongoose.model('User', NewsSchema);