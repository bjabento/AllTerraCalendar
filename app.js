const express = require('express');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
  });

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening on port 3000!'));

app.use(express.json());

const Sequelize = require('sequelize');
const moment = require('moment');
const db = require('./configs/Database');
/*const User = require('./models/User');
const Report = require('./models/Report');
const Locals = require('./models/Locals')
const Feedback = require('./models/Feedback');
const Admin = require('./models/Admins');*/
const { Session } = require('inspector');

app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    adminType: 2,
    cookie:{
        expires: new Date(Date.now() + 3600000)
    }
}))

const redirectLogin = (req, res, next) => {
    if(req.session.userID == undefined){
        res.redirect('/login')
    }else{
        next()
    }
}

app.post('/loginRequest', (req, res) => {
    var lMail = req.body.email;
    var lPass = req.body.pass;

    Admin.findAll({
        where: {
            email: lMail
        }
    }).then(user => {
        console.log(user);
        console.log(typeof(user[0].dataValues.pass))
        console.log(typeof(lPass))
        if (user.length == 1 && user[0].dataValues.pass.trim() == lPass.trim()){
            if(user[0].dataValues.tipo == 0){
                req.session.adminType = 0
            }else{
                req.session.adminType = 1
            }
            res.redirect('/index');
        }else{
            res.redirect('/');
        }
    }).catch(err => res.redirect('/'))
})

