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

router.post('/addNews', async(req, res) => {
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


router.put('/updateNews/:news', (req, res) => {
    let newsParam = req.params.news.toLowerCase().split('-');
    let routerUrl_split = newsParam
    let result = []
    for (let i = 0; i < routerUrl_split.length; i++) {
        result.push(routerUrl_split[i].slice(0, 1).toUpperCase() + routerUrl_split[i].slice(1))
    }
    const news = result.join(' ');
    News.findOne({
        "urlTitle":{ '$regex':new RegExp(news, "i")}
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
                if (req.body.title) {
                    foundedObject.title = req.body.title;
                }
                if (req.body.urlTitle) {
                    foundedObject.urlTitle = req.body.urlTitle;
                }
                if (req.body.imgSrc) {
                    foundedObject.imgSrc = req.body.imgSrc;
                }
                if (req.body.instaSimpleLink) {
                    foundedObject.instaSimpleLink = req.body.instaSimpleLink;
                }
                if (req.body.twitterSimpleLink) {
                    foundedObject.twitterSimpleLink = req.body.twitterSimpleLink;
                }
                if (req.body.facebookSimpleLink) {
                    foundedObject.facebookSimpleLink = req.body.facebookSimpleLink;
                }
                if (req.body.linkedinSimpleLink) {
                    foundedObject.linkedinSimpleLink = req.body.linkedinSimpleLink;
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

module.exports = router;