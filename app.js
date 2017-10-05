var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var results = require('./public/json/results.json');
var index = require('./routes/index');
var users = require('./routes/users');
var authRouter = require('./routes/auth');
var register = require('./routes/register');
var logout = require('./routes/logout');
var authController = require('./controllers/authController');
var nocache = require('nocache');
const minute = 60000;
const fs = require('fs');
const _ = require('underscore');
const USERS_DATA = require('./data/users.json');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(nocache());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: '123'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/logout', logout);
//app.use('/', index);
app.use('/', index);
app.use('/users', users);
app.use('/auth', authRouter);
app.use('/register', register);
app.post('/', function(req, res) {
    let maxscore = authController.showMaxScore();
    let login = authController.showLogin();
    let gotscore;
    let data = {};
    data = req.body;
    for (var key in data) {
        gotscore = data[key];
    }
    if (gotscore > maxscore) {
        fs.readFile('./data/users.json', function(err, data) {
           let users_data;
            users_data = JSON.parse(data);
            for (var key in users_data) {
                if (login == users_data[key].login) {
                    users_data[key].maxscore = gotscore;
                    fs.writeFile('./data/users.json', JSON.stringify(users_data));
                }
            }

        });
    }
    try {
        let total = addData(results, data);
        let sorted_arr = arrSort(total);
        fs.writeFile('./public/json/results.json', JSON.stringify(sorted_arr));
        res.statusCode = 201;
    } catch (e) {
        res.statusCode = 400;
    }

});

function addData(results, postData) {
    let total = results; //добавление нового результата в массив
    for (var key in postData) {
        total[key] = postData[key];
    }
    return total;
} //функция добавления нового результата в таблицу

function arrSort(total) {
    let paired = _.pairs(total); //трансформирую json в массив для дальнейшей сортировки
    let sorted = paired.sort(function(a, b){return b[1] - a[1]}); //сортирую массив
    let objected = _.object(sorted); //преобразовываю отсортированный массив обратно в объект
    if (sorted.length > 10) { //удаление элементов в случае если их больше десяти
        do {
            sorted.pop();
            console.log("sorted length in do while: ", sorted.length);
        }
        while(sorted.length > 10);
    }
    return sorted;

} //функция сортировки таблицы рекордов

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
