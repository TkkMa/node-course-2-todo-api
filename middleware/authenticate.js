var {User} = require('./../server/models/user');
var authenticate = (req,res,next)=>{
    var token = req.header('x-auth');

    User.findByToken(token).then((user) =>{
         if(!user){
            return Promise.reject();
         }
//        console.log(user);
        req.user = user;
        req.token = token;
    }).catch((e) =>{
       res.status(401).send();
    });
};
module.exports = {authenticate};