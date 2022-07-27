const mongoose = require('mongoose');

const CelebritySchema = new mongoose.Schema({
    id: {
        type: String,
        trim: true
    },
    category: [],
    categoryId: [],
    name: {
        type: String,
        trim: true
    },
    otherName: {
        type: String,
        trim: true
    },
    nickName: {
        type: String,
        trim: true
    },
    fullname: {
        type: String,
        trim: true
    },
    height: {
        type: String,
        trim: true
    },
    weight: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    profession: {
        type: String,
        required: false,
        trim: true
    },
    professionId: {
        type: String,
        required: false,
        trim: true
    },
    eyeColor: {
        type: String,
        trim: true
    },
    hairColor: {
        type: String,
        required: false,
        trim: true
    },
    imgSrc: {
        type: String,
        required: false,
        trim: true
    },
    politicalParty: {
        type: String,
        required: false,
        trim: true
    },
    politicalPartyImgSrc: {
        type: String,
        required: false,
        trim: true
    },
    dob: {
        type: Object,
        date: {
            type: String,
            trim: true
        },
        month: {
            type: String,
        },
        year: {
            type: String
        },
    },
    dod: {
        type: Object,
        date: {
            type: String,
            trim: true
        },
        month: {
            type: String,
        },
        year: {
            type: String
        },
    },
    deathCause: {
        type: String,
        trim: true
    },
    placeOfDeath: {
        type: String,
        trim: true
    },
    birthPlace: {
        type: String,
        trim: true
    },
    nationality: {
        type: String,
        trim: true
    },
    hometown: {
        type: String,
        trim: true
    },
    school: {
        type: String,
        trim: true
    },
    collegeUniversity: {
        type: String,
        trim: true
    },
    qualification: {
        type: String,
        trim: true
    },
    religion: {
        type: String,
        trim: true
    },
    zodiacSign: {
        type: String,
        trim: true
    },
    bloodGroup: {
        type: String,
        trim: true
    },
    foodHabit: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    hobbies: {
        type: String,
        trim: true
    },
    debut: {
        type: Object,
        lyrical:{
            type: String,
            trim: true
        },
        lyricalImgSrc:{
            type: String,
            trim: true
        },
        punjabiFilm:{
            type: String,
            trim: true
        },
        punjabiFilmImgSrc:{
            type: String,
            trim: true
        },
        bollywoodFilm:{
            type: String,
            trim: true
        },
        bollywoodFilmImgSrc:{
            type: String,
            trim: true
        },
        hollywoodFilm:{
            type: String,
            trim: true
        },
        hollywoodFilmImgSrc:{
            type: String,
            trim: true
        },
        tollywoodFilm:{
            type: String,
            trim: true
        },
        tollywoodFilmImgSrc:{
            type: String,
            trim: true
        },
        tamilFilm:{
            type: String,
            trim: true
        },
        tamilFilmImgSrc:{
            type: String,
            trim: true
        },
        kannadaFilm:{
            type: String,
            trim: true
        },
        kannadaFilmImgSrc:{
            type: String,
            trim: true
        },
        punjabiAlbum:{
            type: String,
            trim: true
        },
        punjabiAlbumImgSrc:{
            type: String,
            trim: true
        },
        hindiAlbum:{
            type: String,
            trim: true
        },
        hindiAlbumImgSrc:{
            type: String,
            trim: true
        },
        singles:{
            type: String,
            trim: true
        },
        singlesImgSrc:{
            type: String,
            trim: true
        },
        musicDirection:{
            type: String,
            trim: true
        },
        musicDirectionImgSrc:{
            type: String,
            trim: true
        },
        filmDirection:{
            type: String,
            trim: true
        },
        filmDirectionImgSrc:{
            type: String,
            trim: true
        },
        tv:{
            type: String,
            trim: true
        },
        tvImgSrc:{
            type: String,
            trim: true
        },
        webSeries:{
            type: String,
            trim: true
        },
        webSeriesImgSrc:{
            type: String,
            trim: true
        },
        production:{
            type: String,
            trim: true
        },
        productionImgSrc:{
            type: String,
            trim: true
        },
        filmWriter:{
            type: String,
            trim: true
        },
        filmWriterImgSrc:{
            type: String,
            trim: true
        },
        lastSong:{
            type: String,
            trim: true
        },
        lastSongImgSrc:{
            type: String,
            trim: true
        },
        lastFilm:{
            type: String,
            trim: true
        },
        lastFilmImgSrc:{
            type: String,
            trim: true
        },
    },
        awards:[
            {
                type:Object,
                year:{
                    type: String
                },
                award: {
                    type: String
                }
            }
        ],
        controversies:[
            {
                type:Object,
                title:{
                    type: String
                },
                controversy: {
                    type: String
                }
            }
        ],
        maritalStatus:{
            type: String,
            trim: true
        },
        affairs:{
            type: String,
            trim: true
        },
        affairsImgSrc:{
            type: String,
            trim: true
        },
        wifeOrHusband:{
            type: String,
            trim: true
        },
        wifeOrHusbandImgSrc:{
            type: String,
            trim: true
        },
        fiance:{
            type: String,
            trim: true
        },
        fianceImgSrc:{
            type: String,
            trim: true
        },
        children:{
            type: Object,
            son: {
                type: String,
                trim: true
            },
            sonImgSrc: {
                type: String,
                trim: true
            },
            sonImgSrc1: {
                type: String,
                trim: true
            },
            sonImgSrc2: {
                type: String,
                trim: true
            },
            daughter: {
                type: String,
                trim: true
            },
            daughterImgSrc: {
                type: String,
                trim: true
            },
        },
        parents:{
            type: Object,
            father: {
                type: String,
                trim: true
            },
            fatherImgSrc: {
                type: String,
                trim: true
            },
            mother: {
                type: String,
                trim: true
            },
            motherImgSrc: {
                type: String,
                trim: true
            }
        },
        siblings:{
            type: Object,
            brother: {
                type: String,
                trim: true
            },
            brotherImgSrc: {
                type: String,
                trim: true
            },
            sister: {
                type: String,
                trim: true
            },
            sisterImgSrc: {
                type: String,
                trim: true
            }
        },
        favourites:{
            type: Object,
            food: {
                type: String,
                trim: true
            },
            fruit: {
                type: String,
                trim: true
            },
            beverages: {
                type: String,
                trim: true
            },
            actor: {
                type: String,
                trim: true
            },
            actress: {
                type: String,
                trim: true
            },
            singer: {
                type: String,
                trim: true
            },
            fashionBrand: {
                type: String,
                trim: true
            },
            colour: {
                type: String,
                trim: true
            },
            destination: {
                type: String,
                trim: true
            },
            sports: {
                type: String,
                trim: true
            },
            sportsman: {
                type: String,
                trim: true
            },
            dress: {
                type: String,
                trim: true
            },
            song: {
                type: String,
                trim: true
            },
            film: {
                type: String,
                trim: true
            },
            director: {
                type: String,
                trim: true
            },
        },
        styleQoutient:{
            type: Object,
            carsCollection: {
                type: String,
                trim: true
            },
            imgSrc: {
                type: String,
                trim: true
            }
        },
        moneyFactor:{
            type: Object,
            earning: {
                type: String,
                trim: true
            },
            netWorth: {
                type: String,
                trim: true
            },
            imgSrc: {
                type: String,
                trim: true
            }
        },
        tattoos:[
            {
                type: Object,
                tattoo: {
                    type: String,
                    trim: true
                },
                tattooImgSrc: {
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
            }
        ],
        facts:{
            type: Object,
            smoke: {
                type: String,
                trim: true
            },
            alcoholic: {
                type: String,
                trim: true
            }
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
        description: {
            type: String,
            trim: true
        }
}, {
    usePushEach: true
})

module.exports = mongoose.model('Celebrity', CelebritySchema);