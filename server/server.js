const config = require('./config/config');

const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
const {ObjectID} = require('mongodb');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json()); // enables json to be sent to application

app.post('/todos', authenticate, (req, res) =>{
//    console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then((doc) =>{
        res.send(doc);
    }, (e) =>{
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate, (req, res) =>{
    Todo.find({
        _creator: req.user._id   // only view todos for the user logged in
    }).then((todos) => {
        res.send({todos});  // send back an object rather than an array
    }, (e) =>{
        res.status(400).send(e);
    })
});

// GET /todos/123434
app.get('/todos/:id', authenticate, (req, res) =>{
    var id = req.params.id;
    // Valid id using isValid
    if(!ObjectID.isValid(id)){
         console.log('ID not valid');
         return res.status(404).send();
    }

    // findById
    Todo.findOne({
        _id:id,
        _creator: req.user._id
        }).then((todo) =>{
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

app.delete('/todos/:id', authenticate, (req,res) =>{
    // get the id
    var id = req.params.id;

    if (!ObjectID.isValid(id)){
        console.log("Id not valid");
        return res.status(404).send()
    }

    Todo.findOneAndRemove({
        _id : id,
        _creator: req.user._id}).then((todo) =>{
        if(!todo){
            console.log('Id not found');
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }, (e) =>{
        console.log(e);
        res.status(400).send();
    });
})

app.patch('/todos/:id', authenticate, (req,res) =>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);  // subset of the variables that user passed to us
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({_id : id, _creator : req.user._id},
        {$set: body}, 
        {new: true}).then((todo) =>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })
});

// POST/ users
app.post('/users', (req, res) =>{
    var body = _.pick(req.body, ['email', 'password']); // pick property from lodash, first arg object, second arg
    var user = new User(body);

    //model methods and instance methods
    user.save().then(() =>{
        return user.generateAuthToken();
//  res.send(userdoc);
    }).then((token)=>{
        res.header('x-auth', token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
});

// this route would require an x-auth -- private route
app.get('/users/me', authenticate, (req,res) =>{
    res.send(req.user);
});

// POST /users/login {email, password} Find a mongodb password
app.post('/users/login', (req,res) =>{
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) =>{
        user.generateAuthToken().then((token) =>{
            res.header('x-auth', token).send(user);
        });
    }).catch((e) =>{
        res.status(400).send();
    });
})

app.delete('/users/me/token', authenticate, (req,res) =>{
    req.user.removeToken(req.token).then(() =>{
        res.status(200).send();
    }, () =>{
        res.status(400).send();
    })
});
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