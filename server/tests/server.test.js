const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb')
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// Seeding data i.e. dummy todos for the purpose of GET /todos testing
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];

// Make sure database is empty for the describe('POST /todos') test to be valid (line 44)
// beforeEach is run before each test.
// beforeEach((done) =>{
//     Todo.remove({}).then(()=>done())
// });
beforeEach((done) =>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);  // inserts the seed data above into mongo database
    }).then(() => done());
});



describe('POST /todos', () =>{
    it('should create a new todo', (done) =>{
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({text})  // send in an object which will get converted to JSON by supertest
            // 1. request test
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            })
            .end((err, res) =>{
                if(err){
                    return done(err);
                }
                // 2. database test
                Todo.find({text}).then((todos) =>{ // todos here is independent of the object in line 7
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            })
    });

    it('should not create todo with invalid body data', (done) =>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) =>{
                if(err){
                    return done(err);
                }
                Todo.find().then((todos) =>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            })
    })
});

describe('GET /todos', () =>{
    it('should get all todos', (done) =>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
})

describe('GET /todos/:id', () =>{
    it('should return todo doc', (done) =>{
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) =>{
        var hexId = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) =>{
        // /todos/123
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done)
    })
})
