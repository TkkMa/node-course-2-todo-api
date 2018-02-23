var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json()); // enables json to be sent to application

app.post('/todos', (req, res) =>{
//    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) =>{
        res.send(doc);
    }, (e) =>{
        res.status(400).send(e);
    });
});

app.listen(3000, ()=>{
    console.log('Started on port 3000');
})

module.exports = {app};
// var newTodo = new Todo({
//     text: "Cook dinner"
// }); // Todo constructor function

// newTodo.save().then((doc)=>{
//     console.log('Saved todo', doc)
// }, (e) =>{
//     console.log('Unable to save todo')
// })

// var otherTodo = new Todo({
//     text: 'Cook lunch',
//     completed: true,
//     completedAt: 123
// });
// var otherTodo = new Todo({
//     text: 'Something to do'  // type casting enabled in Mongoose
// });

// otherTodo.save().then((doc) =>{
//     console.log('Saved todo', doc);
// }, (e) =>{
//     console.log('Unable to save', e);
// })

// var user = new User({
//     email: 'tma@gsma.com    '
// })
// user.save().then((doc) =>{
//     console.log('User saved', doc);
// }, (e) =>{
//     console.log('Unable to save user', e);
// })