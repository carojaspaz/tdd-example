const express = require('express')

const { validateAccount } = require('../middelwares/account.middelware')
const accountController  = require('../controllers/save.account.controller')

const accountRouter = express.Router()

accountRouter.post('/account', validateAccount, accountController.saveAccount)

module.exports = accountRouter