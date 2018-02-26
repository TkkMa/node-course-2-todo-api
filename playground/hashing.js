const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};
//'123abc' is the secret
var token = jwt.sign(data, '123abc'); // this is value sent to user when they sign up or login
console.log(token);

var decoded=jwt.verify(token, '123abc');
console.log('decoded', decoded);
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// -- Create token
// var data = {
//     id: 4
// };  // this is the data we want to send back to the client
// // Make sure client does not set id 4 to 5 and delete all the todos for id 5
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()  // hash value of the data
// };
// // if user changes data property to id= 5.  They would rehash data and add it on to the data
// // property and send the token back -- AVOID this by salting the hash

// //-- Hacker would want to access id = 5 and remove all the data
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString()
// //------------------------
// -- Verify token
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash){
//     console.log('Data was not changed');
// } else{
//     console.log('Data was changed.  Do not trust!!');
// }
