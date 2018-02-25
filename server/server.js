var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) =>{
    Todo.find().then((todos) => {
        res.send({todos});  // send back an object rather than an array
    }, (e) =>{
        res.status(400).send(e);
    })
});

// GET /todos/123434
app.get('/todos/:id', (req, res) =>{
    var id = req.params.id;
    const {ObjectID} = require('mongodb');
    // Valid id using isValid
    if(!ObjectID.isValid(id)){
         console.log('ID not valid');
         return res.status(404).send();
    }

    // findById
    Todo.findById(id).then((todo) =>{
        if(!todo){
            console.log('Id not found'); 
            return res.status(404).send();
        }
        res.send({todo}); // equivalent to {todo: todo}
    }, (e) =>{
        console.log(e);
        res.status(400).send();
    })
})

app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
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