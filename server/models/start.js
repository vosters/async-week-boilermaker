const db = require('./db.js'); 
// and our server that we already created and used as the previous entry point is 'server.js'
const app = require('../main');
const port = process.env.PORT || 3000;

db.sync()  // sync our database
  .then(function(){
    app.listen(port) // then start listening with our express server once we have synced
  }) 