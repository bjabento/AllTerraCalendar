const express = require('express');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('homepage');
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening on port 3000!'));

app.use(express.json());
app.use(express.static(__dirname + '/res'));
/*app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));*/

const Sequelize = require('sequelize');
const moment = require('moment');
const db = require('./configs/Database');
const User = require('./models/Users');
const Holiday = require('./models/Holidays');
const Ticket = require('./models/Tickets');
/*const Locals = require('./models/Locals')
const Feedback = require('./models/Feedback');
const Admin = require('./models/Admins');*/
const { Session } = require('inspector');

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    userID: 0,
    cookie: {
        expires: new Date(Date.now() + 3600000)
    }
}));

const redirectLogin = (req, res, next) => {
    console.log('Cheguei');
    console.log(req.session.userID);
    if (req.session.userID == undefined || req.session.userID == 0) {
        //console.log('Cheguei');
        res.redirect('/homepage')
    } else {
        next()
    }
}

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

app.get('/holidayhistory', redirectLogin, nocache, function (req, res) {
    //console.log('Cheguei render');
    res.render('holidayhistory');
});
app.get('/markholiday', redirectLogin, nocache, function (req, res) {
    //onsole.log('Cheguei render');
    res.render('markholiday');
});
app.get('/index', redirectLogin, function (req, res) {
    //console.log('Cheguei render');
    res.render('index', {session: req.session});
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
            req.session.userName = user[0].dataValues.nome;
            req.session.userType = user[0].dataValues.tipo;
            console.log(req.session.userID);
            console.log(req.session.userName);
            console.log(req.session.userType);
            //console.log(req.session.userID);
            /*if(user[0].dataValues.tipo == 0){
                req.session.adminType = 0
            }else{
                req.session.adminType = 1
            }*/
            res.redirect('/index');
            //res.redirect('/holidayhistory');
        } else {
            res.redirect('/login');
        }
    }).catch(err => res.redirect('/login'))
});

app.get('/userHolidays', redirectLogin, (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;

    Holiday.findAll({
        where: {
            id_user: req.session.userID
        },
        order: [
            ['id', 'DESC']
        ],
    }).then(holidays => {
        res.render('holidayhistory', { moment, holidays: holidays, currentPage: currentPage });
    }).catch(err => console.log(err));
});

app.get('/userHolidays?:page', redirectLogin, (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;

    Holiday.findAll({
        where: {
            id_user: req.session.userID
        },
        order: [
            ['id', 'DESC']
        ],
    }).then(holidays => {
        res.render('holidayhistory', { moment, holidays: holidays, currentPage: currentPage });
    }).catch(err => console.log(err));
});

app.post('/holidayRequest', (req, res) => {
    const regHday = {
        notas: req.body.notes,
        start_date: req.body.startDate,
        end_date: req.body.endDate,
        status: "Pendente",
        id_user: req.session.userID
    };

    const registHday = new Holiday(regHday);
    registHday.save().then(result => console.log("Success")).catch(err => console.log("Luis Couto"))
});

// Handle logout
app.get('/logout', (req, res) => {
    // Clear session data
    req.session.destroy((error) => {
      if (error) {
        console.error('Error destroying session:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Cheguei');
        //res.sendStatus(200);
        res.redirect('/');
      }
    });
  });
