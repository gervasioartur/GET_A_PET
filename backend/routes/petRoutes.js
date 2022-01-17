const router = require('express').Router()
const PetController = require('../controllers/PetController')

//middleware
const verifyToken = require('../helpers/verify-token')
const { imageUpaload } = require('../helpers/image-upload')


router.post('/create',verifyToken,imageUpaload.array("images"), PetController.create)

module.exports = router