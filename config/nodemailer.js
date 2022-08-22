// required for mailer
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

// path that sends the Email
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'zubairsyed0301@gmail.com',
        pass: 'yruycxvjihyjfycs'
    }

})



// rendertemplate defines whenever i am going to send an HTML email template
// to views -> mailers folder
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){console.log('error in rendering template', err); return;}

            mailHTML = template;
        }
    )

    return mailHTML;
}

// exporting to other files
module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate

}