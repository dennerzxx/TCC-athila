//UserRoutes.js

const router = require('express').Router()

const UserController = require('../Controller/UserController')
const { imageUpload } = require('../Helpers/image-upload')
const verifyToken = require('../Helpers/verify-token')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)

router.patch(
    '/edit/:id',
    verifyToken,
    imageUpload.single('image'),
    UserController.editUser
)

router.patch('/addPlano/:id',verifyToken, UserController.addPlano)



module.exports = router