const express = require('express');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('login');
});


const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening on port 3000!'));

app.use(express.json());
app.use(express.static(__dirname + '/css'));

const Sequelize = require('sequelize');
const moment = require('moment');
const db = require('./configs/Database');
const User = require('./models/Users');
const Holiday = require('./models/Holidays');
/*const Locals = require('./models/Locals')
const Feedback = require('./models/Feedback');
const Admin = require('./models/Admins');*/
const { Session } = require('inspector');

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    userID: 0,
    cookie: {
        expires: new Date(Date.now() + 3600000)
    }
}));

const redirectLogin = (req, res, next) => {
    if(req.session.userID == 0){
        console.log('Cheguei');
        res.redirect('/')
    }else{
        next()
    }
}

app.get('/holidayhistory', redirectLogin, function(req, res) {
    console.log('Cheguei render');
    res.render('holidayhistory');
});

app.post('/loginRequest', (req, res) => {
    var lMail = req.body.email;
    var lPass = req.body.password;

    User.findAll({
        where: {
            email: lMail
        }
    }).then(user => {
        console.log(user);
        console.log(typeof (user[0].dataValues.password))
        console.log(typeof (lPass))
        if (user.length == 1 && user[0].dataValues.password.trim() == lPass.trim()) {

            req.session.userID = user[0].dataValues.id;
            console.log(req.session.userID);
            /*if(user[0].dataValues.tipo == 0){
                req.session.adminType = 0
            }else{
                req.session.adminType = 1
            }*/
            res.redirect('/userHolidays');
            //res.redirect('/holidayhistory');
        } else {
            res.redirect('/');
        }
    }).catch(err => res.redirect('/'))
});

app.get('/userHolidays', redirectLogin, (req, res) => {
    Holiday.findAll({
        where:{
            id_user: req.session.userID
        }
    }).then(holidays => {
        res.render('holidayhistory', {moment, holidays:holidays})
    }).catch(err => console.log(err));
});
