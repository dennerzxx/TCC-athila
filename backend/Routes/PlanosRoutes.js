//UserRoutes.js

const router = require('express').Router()

const PlanosController = require('../Controller/PlanosController')
const verifyToken = require('../Helpers/verify-token')

router.post('/create', PlanosController.create)

module.exports = router