const { save } = require('../repository/account.repository')

const saveAccount = (req, res) => {
    const account = req.body
    save(account)
    res.status(201).send({})
}

module.exports = {
    saveAccount
}