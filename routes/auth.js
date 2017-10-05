const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
/* GET home page. */

function checkAuth(req, res, next) {
        if (!req.session.isLoggedIn) {
            return next();
        } else {
            res.status(401);
            res.send('You are already logined');
        }
    };
router.get('/', checkAuth, authController.index);
router.post('/login', authController.login);
module.exports = router;
