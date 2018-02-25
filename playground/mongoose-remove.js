const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

//Todo.findOneAndRemove
//Todo.findByIdAndRemove
Todo.findOneAndRemove({_id: '5a92c18a86d6be9ddcbb62a4'}).then((todo) =>{
    console.log(todo);
})
Todo.findByIdAndRemove('5a92c18a86d6be9ddcbb62a4').then((todo) =>{
    console.log(todo);
});