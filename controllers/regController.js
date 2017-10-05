const path = require('path');
const fs = require('fs');
const USERS = './data/users.json';

module.exports = {

  index: function (req, res, next) {
    res.render('register');
  },
  
  register: function (req, res, next) {
      
          fs.readFile(USERS, function(err, data) {
              let users_data;
              var unique = true;
              users_data = JSON.parse(data);
              for (var key in users_data) {
                  if (req.body.login == users_data[key].login &&
                      req.body.password == req.body.confirm) {
                      unique = false;
                  }
              }
              if (unique) {
                  req.body.maxscore = 0;
                  users_data.push(req.body);
                  fs.writeFile(USERS, JSON.stringify(users_data));
                  console.log(users_data);
                  req.session.isLoggedIn = true;
                  res.redirect(301, '/');
              } else { 
                  res.send('<h5>Either password or login is incorrect</h5>');
              }

          });
          
      }

};
