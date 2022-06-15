const express = require('express');
const app = express();
const port = 1000;

 


app.listen(port, function (err) {
    if (err) {
        console.log(err);
        console.log(`Error in running server :  ${err}`)
    }
    console.log(`running server on :  ${port}`)
})