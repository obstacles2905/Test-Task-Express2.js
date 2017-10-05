const path = require('path');
const fs = require('fs');
const USERS = './data/users.json';

module.exports = {

  logout: function (req, res, next) {
        req.session.destroy(function (err) {
            console.log('logout controller');
          res.redirect(301, '/auth');
        });
      }
    
};
