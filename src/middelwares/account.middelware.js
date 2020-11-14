const validator = require('validator')

const validateAccount = (req, res, next) => {
    const { email } = req.body
    if(validator.isEmail(email)){
        next()
    } else {
        return res.status(400).send({
            error: {
                email: 'The email must be a valid address'
            }
        })
    }
}

module.exports = {
    validateAccount
}