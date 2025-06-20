const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const store = async (req, res) => {
    const result = validationResult(req);
    console.log(result);

    if (!result.isEmpty()) {
        return res.status(422).json({
            errors: result.array()
        });
    }

    const salts = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salts);

    res.status(201).json({
        ...req.body,
        password: hashedPassword
    });
}

module.exports = {
    store
};