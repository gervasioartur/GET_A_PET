const router = require('express').Router()
const UserController = require('../controllers/UserController')


//middleware
const verifyToken = require('../helpers/verify-token')
const { imageUpaload } = require('../helpers/image-upload')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch(
    '/edit/:id',
    verifyToken,
    imageUpaload.single("image"),
    UserController.editUser
)

module.exports = router