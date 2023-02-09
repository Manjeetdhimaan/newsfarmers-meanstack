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
        }).limit(8).then(recentCelbs => {
            res.status(200).json(recentCelbs);
        })
        .catch(e => {
            res.status(500).json({
                error: err.message
            })
        });
})

router.post('/addCelebrity', async (req, res) => {
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

// update celebrity

router.put('/updateCelebrity/:celebrity', (req, res) => {
    let celebrity = req.params.celebrity.toLowerCase().split('-');
    let routerUrl_split = celebrity
    let result = []
    for (let i = 0; i < routerUrl_split.length; i++) {
        result.push(routerUrl_split[i].slice(0, 1).toUpperCase() + routerUrl_split[i].slice(1))
    }
    const celebrityName = result.join(' ');
    Celebrity.findOne({
        "name": { '$regex':new RegExp(celebrityName, "i")}
    }, (err, foundedObject) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            if (!foundedObject) {
                res.status(404).send();
            } else {
        
                if (req.body.id) {
                    foundedObject.id = req.body.id;
                }
                if (req.body.category) {
                    foundedObject.category = req.body.category;
                }
                if (req.body.categoryId) {
                    foundedObject.categoryId = req.body.categoryId;
                }
                if (req.body.name) {
                    foundedObject.name = req.body.name;
                }
                if (req.body.otherName) {
                    foundedObject.otherName = req.body.otherName;
                }
                if (req.body.nickName) {
                    foundedObject.nickName = req.body.nickName;
                }
                if (req.body.fullname) {
                    foundedObject.fullname = req.body.fullname;
                }
                if (req.body.height) {
                    foundedObject.height = req.body.height;
                }
                if (req.body.weight) {
                    foundedObject.weight = req.body.weight;
                }
                if (req.body.gender) {
                    foundedObject.gender = req.body.gender;
                }
                if (req.body.profession) {
                    foundedObject.profession = req.body.profession;
                }
                if (req.body.professionId) {
                    foundedObject.professionId = req.body.professionId;
                }
                if (req.body.eyeColor) {
                    foundedObject.eyeColor = req.body.eyeColor;
                }
                if (req.body.hairColor) {
                    foundedObject.hairColor = req.body.hairColor;
                }
                if (req.body.imgSrc) {
                    foundedObject.imgSrc = req.body.imgSrc;
                }
                if (req.body.politicalParty) {
                    foundedObject.politicalParty = req.body.politicalParty;
                }
                if (req.body.politicalPartyImgSrc) {
                    foundedObject.politicalPartyImgSrc = req.body.politicalPartyImgSrc;
                }
                if (req.body.dob) {
                    foundedObject.dob = req.body.dob;
                }
                if (req.body.dod) {
                    foundedObject.dod = req.body.dod;
                }
                if (req.body.deathCause) {
                    foundedObject.deathCause = req.body.deathCause;
                }
                if (req.body.placeOfDeath) {
                    foundedObject.placeOfDeath = req.body.placeOfDeath;
                }
                if (req.body.birthPlace) {
                    foundedObject.birthPlace = req.body.birthPlace;
                }
                if (req.body.nationality) {
                    foundedObject.nationality = req.body.nationality;
                }
                if (req.body.hometown) {
                    foundedObject.hometown = req.body.hometown;
                }
                if (req.body.school) {
                    foundedObject.school = req.body.school;
                }
                if (req.body.collegeUniversity) {
                    foundedObject.collegeUniversity = req.body.collegeUniversity;
                }
                if (req.body.qualification) {
                    foundedObject.qualification = req.body.qualification;
                }
                if (req.body.religion) {
                    foundedObject.religion = req.body.religion;
                }
                if (req.body.zodiacSign) {
                    foundedObject.zodiacSign = req.body.zodiacSign;
                }
                if (req.body.bloodGroup) {
                    foundedObject.bloodGroup = req.body.bloodGroup;
                }
                if (req.body.foodHabit) {
                    foundedObject.foodHabit = req.body.foodHabit;
                }
                if (req.body.address) {
                    foundedObject.address = req.body.address;
                }
                if (req.body.hobbies) {
                    foundedObject.hobbies = req.body.hobbies;
                }
                if (req.body.debut) {
                    foundedObject.debut = req.body.debut;
                }
                if (req.body.awards) {
                    foundedObject.awards = req.body.awards;
                }
                if (req.body.controversies) {
                    foundedObject.controversies = req.body.controversies;
                }
                if (req.body.maritalStatus) {
                    foundedObject.maritalStatus = req.body.maritalStatus;
                }
                if (req.body.affairs) {
                    foundedObject.affairs = req.body.affairs;
                }
                if (req.body.affairsImgSrc) {
                    foundedObject.affairsImgSrc = req.body.affairsImgSrc;
                }
                if (req.body.wifeOrHusband) {
                    foundedObject.wifeOrHusband = req.body.wifeOrHusband;
                }
                if (req.body.wifeOrHusbandImgSrc) {
                    foundedObject.wifeOrHusbandImgSrc = req.body.wifeOrHusbandImgSrc;
                }
                if (req.body.fiance) {
                    foundedObject.fiance = req.body.fiance;
                }
                if (req.body.fianceImgSrc) {
                    foundedObject.fianceImgSrc = req.body.fianceImgSrc;
                }
                if (req.body.children) {
                    foundedObject.children = req.body.children;
                }
                if (req.body.siblings) {
                    foundedObject.siblings = req.body.siblings;
                }
                if (req.body.favourites) {
                    foundedObject.favourites = req.body.favourites;
                }
                if (req.body.styleQoutient) {
                    foundedObject.styleQoutient = req.body.styleQoutient;
                }
                if (req.body.moneyFactor) {
                    foundedObject.moneyFactor = req.body.moneyFactor;
                }
                if (req.body.tattoos) {
                    foundedObject.tattoos = req.body.tattoos;
                }
                if (req.body.facts) {
                    foundedObject.facts = req.body.facts;
                }
                if (req.body.otherFacts) {
                    foundedObject.otherFacts = req.body.otherFacts;
                }
                if (req.body.description) {
                    foundedObject.description = req.body.description;
                }
                foundedObject.save((err, updatedObject) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send();
                    } else {
                        res.send(updatedObject)
                    }
                })
            }
        }
    })
})

router.get('/getCelebrity/:celebrity', (req, res) => {
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
});

router.get('/getRandomCelebrity', (req, res) => {
    Celebrity.aggregate([{ 
        $sample: { size: 1 } 
    }]).then(celebrity => {
        if (celebrity) {
           return res.status(200).json(celebrity)
        } else {
            return res.status(401).json({
                error: 'No Celebrity Found'
            })
        }
    }).catch(err => {
        return res.status(500).json({
            error: err.message
        })
    })
})

router.get('/getRandomCelebrityForHome', (req, res) => {
    Celebrity.aggregate([{ 
        $sample: { size: 1 } 
    }]).then(celebrity => {
        if (celebrity) {
           return res.status(200).json(celebrity)
        } else {
            return res.status(401).json({
                error: 'No Celebrity Found'
            })
        }
    }).catch(err => {
        return res.status(500).json({
            error: err.message
        })
    })
})

router.get('/getFilteredCelebrities/:filter', (req, res) => {
    const filter = req.params.filter.split('-').join(' ');
    Celebrity.find({ "category" : { $regex : new RegExp(filter, "i") } }).sort({
            _id: -1
        }).limit(100).then(recentCelbs => {
            return res.status(200).json(recentCelbs);
        })
        .catch(e => {
            return res.status(500).json({
                error: err.message
            })
        });
})

module.exports = router;