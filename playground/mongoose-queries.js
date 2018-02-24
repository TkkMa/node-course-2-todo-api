const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

//var id = "5a8fda9522a4834f709d4670";

// // finds all -- NOTE returns array of documents
// Todo.find({
//     _id: id  // mongoose is going take string and convert to object ID
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// // finds only the first one with id --NOTE returns document 
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     console.log('Todo By Id', todo);
// });

// // What happens when id is not correct?  How to handle?
// var id = "6a8fda9522a4834f709d4670"; //tweaked

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// });

// How to validate object ID
const {ObjectID} = require('mongodb');
// var id = "6a8fda9522a4834f709d467011";

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }
// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

// User.findById
const {User} = require('./../server/models/user');
var id = "5a8fc0c2d9739332f454e030";
User.findById(id).then((user)=>{
    if(!user){
        return console.log('Id not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}, (e) =>{
    console.log(e);
});
