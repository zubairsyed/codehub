const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

// commentsMailer.newComment(comment); [21 line] from {controllers/api/comments_controller}

// function consists of 2 things the above commentsMailer is added and
// the data
queue.process('emails', function(job, done){
    // comment == data
        // console.log('emails worker is processing the job', job.data);
        commentsMailer.newComment(job.data);
        done();
})