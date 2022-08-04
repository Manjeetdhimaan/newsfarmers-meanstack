const router = require('express').Router();
const News = require('../models/News');

router.get('', (req, res) => {
    News.find().then(news => {
        res.status(200).json(news);
    }).catch(err => {
        res.status(500).json({
            error: err.message
        })
    })
})

// router.post('/register', async(req, res) => {
//         const newNews = new News({
//             category: req.body.category,
//             categoryId: req.body.categoryId,
//             name: req.body.name,
//             otherName: req.body.otherName,
//             nickName: req.body.nickName,
//             fullname: req.body.fullname,
//             height: req.body.height,
//             weight: req.body.weight,
//             gender: req.body.gender,
//             profession: req.body.profession,
//             professionId: req.body.professionId,
//             eyeColor: req.body.eyeColor,
//             hairColor: req.body.hairColor,
//             imgSrc: req.body.imgSrc,
//             politicalParty: req.body.politicalParty,
//             politicalPartyImgSrc: req.body.politicalPartyImgSrc,
//             dob: req.body.dob,
//             dod: req.body.dod,
//             deathCause: req.body.deathCause,
//             placeOfDeath: req.body.placeOfDeath,
//             birthPlace: req.body.birthPlace,
//             nationality: req.body.nationality,
//             hometown: req.body.hometown,
//             school: req.body.school,
//             collegeUniversity: req.body.collegeUniversity,
//             qualification: req.body.qualification,
//             religion: req.body.religion,
//             zodiacSign:req.body.zodiacSign,
//             bloodGroup:req.body.bloodGroup,
//             foodHabit:req.body.foodHabit,
//             address:req.body.address,
//             hobbies:req.body.hobbies,
//             debut:req.body.debut,
//             awards:req.body.awards,
//             controversies:req.body.controversies,
//             maritalStatus:req.body.maritalStatus,
//             affairs:req.body.affairs,
//             affairsImgSrc:req.body.affairsImgSrc,
//             wifeOrHusband:req.body.wifeOrHusband,
//             wifeOrHusbandImgSrc:req.body.wifeOrHusbandImgSrc,
//             fiance:req.body.fiance,
//             fianceImgSrc:req.body.fianceImgSrc,
//             children:req.body.children,
//             parents:req.body.parents,
//             siblings:req.body.siblings,
//             favourites:req.body.favourites,
//             styleQoutient:req.body.styleQoutient,
//             moneyFactor:req.body.moneyFactor,
//             tattoos:req.body.tattoos,
//             facts:req.body.facts,
//             otherFacts:req.body.otherFacts,
//             description:req.body.description,
//         })
//         await newNews.save().then(news => {
//             res.status(201).json(news)
//         }).catch((err) => {
//             res.status(500).json({
//                 error: err.message
//             })
//         })
// })

router.post('/register', async(req, res) => {
    const newNews = new News({
        id: req.body.id,
        category: req.body.category,
        categoryId: req.body.categoryId,
        title:req.body.title,
        urlTitle:req.body.urlTitle,
        imgSrc:req.body.imgSrc,
        instaSimpleLink:req.body.instaSimpleLink,
        twitterSimpleLink:req.body.twitterSimpleLink,
        facebookSimpleLink:req.body.facebookSimpleLink,
        linkedinSimpleLink:req.body.linkedinSimpleLink,
        otherFacts:req.body.otherFacts,
        description:req.body.description,
    })
    await newNews.save().then(news => {
        res.status(201).json(news)
    }).catch((err) => {
        res.status(500).json({
            error: err.message
        })
    })
})


module.exports = router;