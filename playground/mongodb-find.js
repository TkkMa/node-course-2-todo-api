//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//TodoApp here is a database, no need to create db first.  Db created when data is added to it
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{  
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');  // Mongo v3

//     db.collection('Todos').find({
//         _id: new ObjectID('5a8e88892803d030c090f9ba')
//     }).toArray().then((docs) => {
//         console.log('Todos');
// //        console.log(JSON.stringify(docs, undefined, 2));
//         console.log(docs);
//     }, (err) => {
//         console.log('Unable to fetch todos', err);
//     });
        // db.collection('Todos').find().count().then((count) => {
        //     console.log(`Todos count: ${count}`);
        // }, (err) => {
        //     console.log('Unable to fetch todos', err);
        // });
        db.collection('Users').find({
            name: 'Terence'
        }).toArray().then((docs) =>{  // without toArray() returns the curser.  toArray() is a promise
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) =>{
            console.log('Unable to fetch todos', err);
        });
//    client.close();
});