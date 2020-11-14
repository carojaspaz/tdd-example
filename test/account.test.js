const test = require('ava')
const request = require('supertest')

const app = require('../src/app')

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
    .post('/account')
    .send(account)
    .expect('Content-Type', /json/)
    .expect(201)
    .end((err, res) => {
        t.falsy(err, 'Should not error')
        t.end()
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
    .post('/account')
    .send(account)
    .expect('Content-Type', /json/)
    .expect(400)
    .end((err, res) => {
        t.falsy(err, 'Should not error')
        t.deepEqual(res.body, {
            error: {
                email: 'The email must be a valid address'
            }
        })
        t.end()
    })
})