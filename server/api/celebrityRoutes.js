const router = require('express').Router();
const User = require('../models/User');

router.get('', (req, res) => {
    User.find().then(users => {
        console.log(users)
        res.status(200).json(users);
    }).catch(err => {
        res.status(500).json({
            error: err.message
        })
    })
})

router.post('/register', async(req, res) => {
  
        const newUser = new User({
            category: req.body.category,
            categoryId: req.body.categoryId,
            name: req.body.name,
            otherName: req.body.otherName,
            nickName: req.body.nickName,
            fullname: req.body.fullname,
            height: req.body.height,
            weight: req.body.weight,
            gender: req.body.gender,
            profession: req.body.profession,
            professionId: req.body.professionId,
            eyeColor: req.body.eyeColor,
            hairColor: req.body.hairColor,
            imgSrc: req.body.imgSrc,
            politicalParty: req.body.politicalParty,
            politicalPartyImgSrc: req.body.politicalPartyImgSrc,
            dob: req.body.dob,
            dod: req.body.dod,
            deathCause: req.body.deathCause,
            placeOfDeath: req.body.placeOfDeath,
            birthPlace: req.body.birthPlace,
            nationality: req.body.nationality,
            hometown: req.body.hometown,
            school: req.body.school,
            collegeUniversity: req.body.collegeUniversity,
            qualification: req.body.qualification,
            religion: req.body.religion,
            zodiacSign:req.body.zodiacSign,
            bloodGroup:req.body.bloodGroup,
            foodHabit:req.body.foodHabit,
            address:req.body.address,
            hobbies:req.body.hobbies,
            debut:req.body.debut,
            awards:req.body.awards,
            controversies:req.body.controversies,
            maritalStatus:req.body.maritalStatus,
            affairs:req.body.affairs,
            affairsImgSrc:req.body.affairsImgSrc,
            wifeOrHusband:req.body.wifeOrHusband,
            wifeOrHusbandImgSrc:req.body.wifeOrHusbandImgSrc,
            fiance:req.body.fiance,
            fianceImgSrc:req.body.fianceImgSrc,
            children:req.body.children,
            parents:req.body.parents,
            siblings:req.body.siblings,
            favourites:req.body.favourites,
            styleQoutient:req.body.styleQoutient,
            moneyFactor:req.body.moneyFactor,
            tattoos:req.body.tattoos,
            facts:req.body.facts,
            otherFacts:req.body.otherFacts,
            description:req.body.description,
        })
        await newUser.save().then(user => {
            res.status(201).json(user)
        }).catch((err) => {
            res.status(500).json({
                error: err.message
            })
        })
})


module.exports = router;