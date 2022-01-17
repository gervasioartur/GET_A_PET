const router = require('express').Router()
const PetController = require('../controllers/PetController')

//middleware
const verifyToken = require('../helpers/verify-token')
const { imageUpaload } = require('../helpers/image-upload')


router.post('/create', verifyToken, imageUpaload.array("images"), PetController.create)
router.get('/', PetController.getAll)
router.get('/mypets', verifyToken, PetController.getAllUserPets)
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoption)
router.get('/:id', PetController.getPetById)
router.delete('/:id', verifyToken, PetController.removePetById)
router.patch('/:id', verifyToken, imageUpaload.array('images'), PetController.updatePet)
router.patch('/schedule/:id', verifyToken, PetController.schedule)
router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption)

module.exports = router