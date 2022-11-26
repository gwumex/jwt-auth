const User = require('../models/User');
const jwt = require('jsonwebtoken')

//handle errors
const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    //duplicate error code
    if (err.code === 11000) {
        errors.email = 'the email is already registered'
        return errors;
    }

    //validation error
    if (err._message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

//create json webtoken
const maxAge = 3 * 24 * 60  * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'net ninja secret', {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signin_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({user: user._id})
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
}

module.exports.signin_post = (req, res) => {
    console.log(req.body);
    res.send(req.body);
}