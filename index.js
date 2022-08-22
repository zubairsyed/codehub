
const env = require('./config/environment');
const logger = require('morgan');

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
require('./config/view_helpers')(app);
const port = 1200;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
// using sass middleware
const sassMiddleware = require('node-sass-middleware');
// import flash package
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');

// adding the location of precompiled files
if(env.name == 'development'){
        app.use(sassMiddleware({
            src: path.join(__dirname, env.asset_path, 'scss'),
            dest: path.join(__dirname, env.asset_path, 'css'),
            // debug: true,                //keeping it false while doin production
            outputStyle: 'extended',
            prefix: '/css'              //inside assets folder there would be css
        }))
}

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(env.asset_path));
// make the uploads pth to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));



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
    secret:  env.session_cookie_key,
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

app.use(flash());
app.use(customMware.setFlash);

//  use express router
app.use('/', require('./routes'));



app.listen(port, function (err) {
    if (err) {
        console.log(err);
        console.log(`Error in running server :  ${err}`)
    }
    console.log(`running server on :  ${port}`)
})