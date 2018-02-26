var env = process.env.NODE_ENV || 'development';  // only set in Heroku, none on local machine
//console.log('env *****', env);

if(env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI =  'mongodb://localhost:27017/TodoApp';
} else if(env==='test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
