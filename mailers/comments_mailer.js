const nodeMailer = require('../config/nodemailer');

// this is another of exporting a method
exports.newComment = (comment) => {
    // adding up the file name for message template
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');

    nodeMailer.transporter.sendMail({
        from: 'zubairsyed0301@gmail.com',
        to: comment.user.email,
        subject: "New Comment",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return; 
        }
        // console.log('mail Delivered', info);
        return;
    });
}

