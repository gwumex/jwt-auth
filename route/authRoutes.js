const {Router} = require('express');
const authController = require('../controller/authController')

const router = Router();

router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)
router.get('/login', authController.signin_get)
router.post('/login', authController.signin_post)


module.exports = router;