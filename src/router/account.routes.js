const express = require('express')

const { validateAccount } = require('../middelwares/account.middelware')

const accountRouter = express.Router()

accountRouter.post('/account', validateAccount, (req, res) => {
    res.status(201).send({})
})

module.exports = accountRouter