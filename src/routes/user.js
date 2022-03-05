const router = require('express').Router()
const User = require('../models/usermodel')
const { loginValidation, registerValidation } = require('../validations/userValidation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//temp
const verify = require('../middlewares/verifyToken')


router.post('/', async (req, res)=>{
    const {error, value} = registerValidation(req.body)
    if(error){
        res.json({error : error.details[0].message})
        return
    }

    //check if data is in the exists
    const emailExist = await User.findOne({email: value.email})
    if(emailExist)return res.status(400).json({error :'Email already exists'})

    //hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(value.password, salt)

    const user = new User({
        name: value.name,
        email: value.email,
        password: hashPass
    })
    
    try{
        await user.save()
        res.json({id: user.id})
    }catch(err){
        console.log(err)
        res.json({error: 'Sorry ther was an error'})
    }
    
})
router.get('/', async (req, res)=>{
    const {error, value} = loginValidation(req.body)
    if(error){
        res.json({error : error.details[0].message})
        return
    }

    const user = await User.findOne({email: value.email})
    if(!user)return res.status(400).json({error :'Email or Passward is not correct'})

    //check the password

    const validPass = await bcrypt.compare(value.password, user.password)
    if(!validPass) return res.status(400).json({error : 'Invalid Password'})


    //auth 
    const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).json({id : user.id, token})
})

router.get('/test', verify, (req, res)=>{
    res.json({id: req.user})
} )

module.exports = router;