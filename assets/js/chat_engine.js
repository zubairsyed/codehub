//  communicating from client side
// user/subscriber
// send a req for connection
// class for  creating functionality
// initialising this class in home.ejs
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // this is used to run server on port 5k 
        // io is the global vrible which comes when we insert  
        // the url in home.ej file
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectHandler();
        }
    }


    // connection hndler - it has connection btw server and 
    // user
    connectHandler(){
        this.socket.on('connect', function(){
            console.log("connection radadjdgfgfg");
        });
    }
}