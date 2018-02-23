//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//TodoApp here is a database, no need to create db first.  Db created when data is added to it
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{  
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');  // Mongo v3

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5a8faf3ace820c59936b08d8")
    // },{
    //     $set:{      // apply update operators
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // })
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5a8f8921e6af833b8422ceb1")
    },{
        $set:{ name: "Terence"},
        $inc:{ age: 1}
    },{
        returnOriginal: false
    }).then((result) =>{
        console.log(result);
    })

//    client.close();
});