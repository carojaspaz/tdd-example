const validator = require('validator')

const validateAccount = (req, res, next) => {
    const { email, amount } = req.body
    if(validator.isEmail(email)){
        if(amount < 50000){
            return res.status(400).send({
                error: {
                    msg: 'Wrong data'
                }
            })            
        }
        next()
    } else {
        return res.status(400).send({
            error: {
                msg: 'Wrong data'
            }
        })
    }
}

module.exports = {
    validateAccount
}