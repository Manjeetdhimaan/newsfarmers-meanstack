const router = require('express').Router();
const Celebrity = require('../models/Celebrity');


router.get('', (req, res) => {
    Celebrity.find().then(celebrities => {
        res.status(200).json(celebrities);
    }).catch(err => {
        res.status(500).json({
            error: err.message
        })
    })
})


router.get('/getRecentCelebrities', (req, res) => {
    Celebrity.find().sort({
            _id: -1
        }).limit(10).then(c => {
            res.status(200).json(c);
        })
        .catch(e => {
            res.status(500).json({
                error: err.message
            })
        });
})

router.post('/register', async (req, res) => {
    const newCelebrity = new Celebrity({
        id: req.body.id,
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
        zodiacSign: req.body.zodiacSign,
        bloodGroup: req.body.bloodGroup,
        foodHabit: req.body.foodHabit,
        address: req.body.address,
        hobbies: req.body.hobbies,
        debut: req.body.debut,
        awards: req.body.awards,
        controversies: req.body.controversies,
        maritalStatus: req.body.maritalStatus,
        affairs: req.body.affairs,
        affairsImgSrc: req.body.affairsImgSrc,
        wifeOrHusband: req.body.wifeOrHusband,
        wifeOrHusbandImgSrc: req.body.wifeOrHusbandImgSrc,
        fiance: req.body.fiance,
        fianceImgSrc: req.body.fianceImgSrc,
        children: req.body.children,
        parents: req.body.parents,
        siblings: req.body.siblings,
        favourites: req.body.favourites,
        styleQoutient: req.body.styleQoutient,
        moneyFactor: req.body.moneyFactor,
        tattoos: req.body.tattoos,
        facts: req.body.facts,
        otherFacts: req.body.otherFacts,
        description: req.body.description,
    })
    await newCelebrity.save().then(celebrity => {
        res.status(201).json(celebrity)
    }).catch((err) => {
        res.status(500).json({
            error: err.message
        })
    })
})

router.get('/:celebrity', (req, res) => {
    let celebrity = req.params.celebrity.toLowerCase().split('-');
    let routerUrl_split = celebrity
    let result = []
    for (let i = 0; i < routerUrl_split.length; i++) {
        result.push(routerUrl_split[i].slice(0, 1).toUpperCase() + routerUrl_split[i].slice(1))
    }
    const celebrityName = result.join(' ');
    Celebrity.findOne({
        name: celebrityName
    }).then(user => {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(401).json({
                error: 'No Celebrity Found'
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        })
    })
})

module.exports = router;