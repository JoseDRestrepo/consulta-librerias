const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const controller = require('../controllers/items.controller');

const rules = [
    body('name').escape().notEmpty().withMessage('Ingrese un nombre'),
    body('wage').escape().notEmpty().withMessage('El campo wage esta vacio').bail().isNumeric().withMessage('El campo wage debe ser un numero'),
    body('email').escape().notEmpty().withMessage('El campo email esta vacio').bail().isEmail().withMessage('El campo email debe ser un email valido'),
    body('password').escape().isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
        }).withMessage('El campo password debe tener al menos 6 caracteres, 1 numero, 1 mayuscula y 1 minuscula'),
]

router.post('/', rules, controller.store)

module.exports = router;