const path = require('path');
const fs = require('fs');
const USERS = './data/users.json';
var usrLog;
var usrMaxScore;

module.exports = {    
  
  index: function (req, res, next) {
    res.render('login');
  },
    
  login: function (req, res, next) {
      fs.readFile(USERS, function(err, data) {
          
          var success = 0;
          let users_data;
          users_data =  JSON.parse(data);
          for (var key in users_data) {
              if (req.body.login == users_data[key].login && 
                  req.body.password == users_data[key].password) {
                  req.session.isLoggedIn = true;
                  //success = 1;
                  console.log('check successed');
                  usrLog = req.body.login;
                  for (var prop in users_data){
                      if (usrLog == users_data[prop].login) {
                          success = 1;
                          usrMaxScore = users_data[prop].maxscore;
                          console.log('true', success);
                          //res.redirect(301, '/');
                      } 
                  }
                  console.log(success);
                  
              }
              
          }
          if (success != 0) {
              res.redirect(301, '/');
          }
          else {
              console.log('your login or password is incorrect');
              res.redirect(301, '/auth');
          }
          
      });
     
  },
  showLogin: function(req, res, next) {
      return usrLog;
  },
  showMaxScore: function(req, res, next) {
      return usrMaxScore;     
  },
  showUserString: function(req, res, next) {
    let usrString = JSON.stringify({login: usrLog, score: usrMaxScore});
      console.log(usrString);
      return usrString;
  }
 
};
