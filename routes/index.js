var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

function checkAuth(req, res, next) {
        if (req.session.isLoggedIn) {
            return next();
        } else {
            res.status(401);
            //res.send('Please log in');
            res.redirect(301, '/auth');
        }
    };

/* GET home page. */
router.get('/', checkAuth, function(req, res, next) {
  let maxscore = authController.showMaxScore();
  let login = authController.showLogin();
  res.render('index', { login: login, maxscore: maxscore });
});

module.exports = router;
