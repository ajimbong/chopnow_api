const router = require('express').Router();

const cloudinary = require("../utils/cloudinary")
const upload = require('../utils/multer')
const Meal = require('../models/mealmodel')

router.post('/', upload.single('image'), async (req, res)=> {

    try{
        console.log(req.body)
        const result = await cloudinary.uploader.upload(req.file.path)
        let meal = new Meal({
            image: result.secure_url,
            cloudinary_id:result.public_id,
            name: req.body.name,
            details: req.body.details,
            price:  parseInt(req.body.price),
            category: req.body.category
        })
        await meal.save()
        console.log(meal)
        res.json(meal)
    } catch(err){
        console.log('err : ', err)
    }
} )

router.get('/', async (req, res)=> {
    const meals = await Meal.find()
    res.json(meals)
} )

module.exports = router;