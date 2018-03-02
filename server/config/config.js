var env = process.env.NODE_ENV || 'development';  // only set in Heroku, none on local machine
//console.log('env *****', env);
if (env === 'development' || env === 'test'){
    //development and test variables are stored in config.json but won't be uploaded stored in gitignore
    var config = require('./config.json');
    var envConfig = config[env];
    Object.keys(envConfig).forEach((key) =>{
        process.env[key] = envConfig[key]
    })
}

// if(env === 'development'){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI =  'mongodb://localhost:27017/TodoApp';
// } else if(env==='test'){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }

