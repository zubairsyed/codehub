module.exports.home = function (req, res) {
    console.log(req.cookies);
    res.cookie('user',890 )
    console.log('billa');
    return res.render('home', {
        title:'Home'
    })
}

// module.exports .actioame = function(req,res)