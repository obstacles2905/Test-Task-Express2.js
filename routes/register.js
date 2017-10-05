const express = require('express');
const router = express.Router();

const regController = require('../controllers/regController');

function checkAuth(req, res, next) {
        if (!req.session.isLoggedIn) {
            return next();
        } else {
            res.status(401);
            res.send('You are already logined, so you cant watch this ');
        }
    };

router.get('/', checkAuth, regController.index);
router.post('/register', regController.register);

module.exports = router;
