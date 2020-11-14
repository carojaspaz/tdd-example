const express = require('express')
const bodyParser = require('body-parser')

const accountRoutes = require('./router/account.routes')

const app = express()

app.use(bodyParser.urlencoded({ extends: false}))
app.use(bodyParser.json())

app.use(accountRoutes)

module.exports = app

