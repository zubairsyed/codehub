const express = require('express');
const app = express();
const port = 1000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
const cookieParser = require('cookie-parser');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
// extract files and scripts from sub pages for layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//  use express router
app.use('/', require('./routes'));

// set up of view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function (err) {
    if (err) {
        console.log(err);
        console.log(`Error in running server :  ${err}`)
    }
    console.log(`running server on :  ${port}`)
})