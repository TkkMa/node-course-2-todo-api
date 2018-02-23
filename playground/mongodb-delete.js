//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//TodoApp here is a database, no need to create db first.  Db created when data is added to it
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{  
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');  // Mongo v3

    //-- deleteMany // check result {n:3 Ok, 1}
    // db.collection('Todos').deleteMany({text: "Eat lunch"}).then((result) =>{
    //     console.log(result);
    // });
    // db.collection('Users').deleteMany({name: "Terence"}).then((result) => {
    //     console.log(result);
    // })

    //-- deleteOne
    // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((result) => {
    //     console.log(result);
    // });
 
    // findOneAndDelete -- deletes an object and return object back
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });
    db.collection('Users').findOneAndDelete({_id:123}).then((result) =>{
        console.log(JSON.stringify(result, undefined, 2));
    });

//    client.close();
});