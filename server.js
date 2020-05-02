let express = require('express');
var Mongodb = require('mongodb');
var url = "mongodb://localhost:27017/";

Mongodb.MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("database");
  var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("database").insertOne(myobj, function(err, res)  {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
  dbo.collection("databaseDropped").insertOne(myobj, function(err, res)  {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});



/*
const database = new MongoClient('database.db');
const databaseDropped = new MongoClient('databaseDropped.db');


database.loadDatabase();
databaseDropped.loadDatabase();*/



//create app with express function
let app = express();

//get app to listen on port 3000
const port = process.env.PORT || 3000;
let server = app.listen(port, () => {
  console.log('Starting server on port: ' + port)
});

//give files to node
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}))
console.log("Socket server is running.")


let socket = require('socket.io')
let io = socket(server);

io.sockets.on('connection', newConnection)

app.get('/api', (request, response) => {
  Mongodb.MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("database");
  dbo.collection("database").find({},(err,data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);

  })
 })
});

app.get('/dragged', (request, response) => {
  Mongodb.MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("database");
  dbo.collection("databaseDropped").find({},(err,dataDrop) => {
    if (err) {
      response.end();
      return;
    }
    response.json(dataDrop);

  })
})
});

function newConnection(socket) {
  console.log('new connection'+ socket.id );
  socket.on('turn', turnTile);
  socket.on('turn', saveData);
  socket.on('drop', saveDataDropped);
  socket.on('reset', reSet);


  function turnTile(data) {
    socket.broadcast.emit('turn',data);
  }

  function saveData(data) {
    Mongodb.MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      let dbo = db.db("database");
    dbo.collection("database").insertOne(data , function(err, res)  {
      if (err) throw err;
      console.log("Row created!");
      db.close();
    });
  });
 };


  function saveDataDropped(dataDrop) {
    Mongodb.MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      let dbo = db.db("database");
    dbo.collection("databaseDropped").insertOne(dataDrop, function(err, res)  {
      if (err) throw err;
      console.log("Row created!");
      db.close();
    });
  });
};

  function reSet(game_id) {
    console.log(game_id.gameID)
    Mongodb.MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      let dbo = db.db("database");
    dbo.collection("database").deleteMany({ gameID: game_id.gameID  }, { multi: true }, function (err, numRemoved) {
    });
    dbo.collection("databaseDropped").deleteManyc({ gameID: game_id.gameID  }, { multi: true }, function (err, numRemoved) {
    });
  });
};
};
