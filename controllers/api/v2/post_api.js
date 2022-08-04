module.exports.index = function(req,res){
    return res.json(200, {
        message: "hello this is v2",
        posts: [],
    })
}