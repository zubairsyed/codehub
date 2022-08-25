const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);


// const accessLogStream = rfs('access.log', {...........}\
// new version 
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codehub_development',  
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'zubairsyed0301@gmail.com',
            pass: 'pzskhmydobzseskz'
        }
    
    },
    google_client_id: "375253120169-rquldtjflb4o5ommbatgb4m80ho5sgil.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:1200/users/auth/google/callback",
    jwt_secret: 'codehub',
    morgan: {
        mode: 'dev',
        options: {
            stream: accessLogStream
        }
    }
}

// changes made while error of node_env is not an internal or external command
// added the names in environment variables  CODEHUB_GOOGLE_CLIENT_ID , CODEHUB_GOOGLE_CLIENT_SECRET ,  CODEHUB_GOOGLE_CALLBACK_URL
// CODEHUB_ASSET_PATH , CODEHUB_SESSION_COOKIE_KEY ,CODEHUB_DB ,CODEHUB_GMAIL_USERNAME, CODEHUB_GMAIL_PASSWORD
// package : npm install cross-env [this makes it works in all platforms]
// added (new) name: process.env.CODEHUB_ENVIRONMENT    -   old(name: 'production')

const production =  {
    name: process.env.CODEHUB_ENVIRONMENT,
    asset_path: process.env.CODEHUB_ASSET_PATH,
    session_cookie_key: process.env.CODEHUB_SESSION_COOKIE_KEY,
    db: process.env.CODEHUB_DB,  
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEHUB_GMAIL_USERNAME,
            pass: process.env.CODEHUB_GMAIL_PASSWORD
        }
    
    },
    
    google_client_id: process.env.CODEHUB_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEHUB_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEHUB_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEHUB_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {
            stream: accessLogStream
        }
    }
}


// new version added === by removing  CODEHUB_ENVIRONMENT from variable name in environment variables
module.exports = eval(process.env.CODEHUB_ENVIRONMENT) === undefined ? development : eval(process.env.CODEHUB_ENVIRONMENT);
// module.exports = development;