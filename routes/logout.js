const express = require('express');
const router = express.Router();

const logoutController = require('../controllers/logoutController');

function checkAuth(req, res, next) {
        if (!req.session.isLoggedIn) {
            return next();
        } else {
            res.status(401);
            res.send('You are already logined, so you cant watch this ');
        }
    };

router.get('/logout', logoutController.logout);

module.exports = router;
