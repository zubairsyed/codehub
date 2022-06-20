const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 1000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
// using sass middleware
const sassMiddleware = require('node-sass-middleware');
// adding the location of precompiled files
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,                //keeping it false while doin production
    outputStyle: 'extended',
    prefix: '/css'              //inside assets folder there would be css
}))

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);
// extract files and scripts from sub pages for layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




// set up of view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'codehub',
    // todo change the secret before deploy in production
    secret: 'blahsmtng',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codehub_development',
        autoRemove: 'disabled'
    
    },
    function(err){
        console.log(err ||  'connect-mongodb setup ok');
    }
    )
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//  use express router
app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(err);
        console.log(`Error in running server :  ${err}`)
    }
    console.log(`running server on :  ${port}`)
})