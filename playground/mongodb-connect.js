//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
// var user = {name: 'andrew', age: 25};
// var {name} = user;
// console.log(name);
// var obj = new ObjectID();
// console.log(obj);


//TodoApp here is a database, no need to create db first.  Db created when data is added to it
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{  
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');  // Mongo v3

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2)) // ops shows all documents
    // })

    // Insert new doc into Users collection (name, age, location)
    // db.collection('Users').insertOne({
    //     name: 'Terence',
    //     age: 34,
    //     location: 'Hong Kong'
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert user', err);
    //     }
    //     //console.log(JSON.stringify(result.ops, undefined,2));
    //     console.log(result.ops[0]._id.getTimestamp());
    // })
    client.close();
});