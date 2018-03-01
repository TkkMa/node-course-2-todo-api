const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users =[{
    _id: userOneId,
    email: 'andrew@example.com',
    password: 'userOnePass',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
},{
    _id: userTwoId,
    email:'jen@example.com',
    password: 'userTwoPass'
}];
// Seeding data i.e. dummy todos for the purpose of GET /todos testing
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) =>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);  // inserts the seed data above into mongo database
    }).then(() => done());
};

const populateUsers =(done)=>{
    User.remove({}).then(() =>{
        var userOne = new User(users[0]).save(); // by calling save() means running middleware
        var userTwo = new User(users[1]).save();
        // Promise.all waits for both userOne and userTwo to complete
        return Promise.all([userOne, userTwo])
    }).then(() => done());
};
module.exports = {todos, populateTodos, users, populateUsers};