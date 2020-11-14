const test = require('ava')
const request = require('supertest')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

let app =  null
let accountStub = null

const sandbox = sinon.createSandbox()

test.before((t) => {
    accountStub = {
        save() {}
    }
    accountStub['@global'] = true

    sandbox.stub(accountStub, 'save')
    accountStub.save.withArgs({}).returns(true)

    app = proxyquire('../src/app.js', {
        '../src/repository/account.repository' : accountStub
    })

})

test.after( (t) => {
    sandbox.restore()
})

/*
Crear una cuenta
Criterio de aceptación
Las cuentas se deben crear con un saldo mínimo de $ 50.000
Al crear la cuenta el saldo es de $ 50.000
*/

test.serial.cb('Crear cuenta', (t) => {
    const account = {
        name: 'Carlos',
        sureName: 'Rojas',
        email: 'carojaspaz@gmail.com',
        amount: '50000'
    }
    request(app)
    .post('/v1/account')
    .send(account)
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err, res) => {
        t.falsy(err, 'Should not error')
        t.end()

        // Agurar que solo se invoque una vez
        sandbox.assert.calledOnce(accountStub.save)

        // Asegurar que se envien los parametros adecuados
        sandbox.assert.calledWith(accountStub.save, account)
    })
})

test.serial.cb('Validar email', (t) => {
    const account = {
        name: 'Carlos',
        sureName: 'Rojas',
        email: 'carojaspazgmail.com',
        amount: '50000'
    }
    request(app)
    .post('/v1/account')
    .send(account)
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, res) => {
        t.falsy(err, 'Should not error')
        t.deepEqual(res.body, {
            error: {
                msg: 'Wrong data'
            }
        })
        t.end()
    })
})

test.serial.cb('Validar Saldo inicial', (t) => {
    const account = {
        name: 'Carlos',
        sureName: 'Rojas',
        email: 'carojaspazgmail.com',
        amount: '49999'
    }
    request(app)
    .post('/v1/account')
    .send(account)
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, res) => {
        t.falsy(err, 'Should not error')
        t.deepEqual(res.body, {
            error: {
                msg: 'Wrong data'
            }
        })
        t.end()
    })
})