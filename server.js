require('dotenv').config();
const mongodb = require('mongodb');
const uri = 'mongodb://freddieb1234:QWERTY12@ds149744.mlab.com:49744/heroku_bnwqfrc3';
let data=[];
let dataDrop=[];


async function getDataOver() {
    mongodb.MongoClient.connect(uri, async function(err, client) {
// async functions go here
    let data = await client.db('heroku_bnwqfrc3').collection("database").find({}).toArray();
    console.log(data)
    return data;
    client.close(function (err) {
                  if(err) throw err;
    });
  });
};

async function getDataDropOver() {
// async functions go here
  mongodb.MongoClient.connect(uri, async function(err, client) {
    let dataDrop =  await client.db('heroku_bnwqfrc3').collection("databaseDropped").find({}).toArray();
    return dataDrop;
    client.close(function (err) {
                  if(err) throw err;
    });
  });
}

/*
async function getData(client) {
  const data_returned = await client.db('heroku_bnwqfrc3').collection("database").find({}).toArray();
  return data_returned
  };

async function getDataDrop(client) {
  const dataDropped_returned = await client.db('heroku_bnwqfrc3').collection("databaseDropped").find({}).toArray();;
  return dataDropped_returned
 };
 */

async function dataInsert(data) {
    mongodb.MongoClient.connect(uri, function(err, client) {
// async functions go here
    client.db('heroku_bnwqfrc3').collection("database").insertOne(data);
    client.close(function (err) {
                  if(err) throw err;
    });
  });
}

async function dataDropInsert(dataDrop) {
    mongodb.MongoClient.connect(uri, function(err, client) {
// async functions go here
    client.db('heroku_bnwqfrc3').collection("databaseDropped").insertOne(dataDrop);
    client.close(function (err) {
                  if(err) throw err;
    });
  });

}





let express = require('express');
/*const Datastore = require('nedb');

const database = new Datastore('database.db');
const databaseDropped = new Datastore('databaseDropped.db');


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
  console.log('getting data')
  let data = getDataOver();
  response.json(data);
});

app.get('/dragged', (request, response) => {
  let dataDrop = getDataDropOver();
  response.json(dataDrop);
});

function newConnection(socket) {
  console.log('new connection'+ socket.id );
  socket.on('turn', turnTile);
  socket.on('turn', saveData);
  socket.on('drop', saveDataDropped);
  socket.on('drop', dropTile);
  socket.on('getdatamess', getData);
  socket.on('getdataDropmess', getDataDrop);

  /*socket.on('reset', reSet);*/


  function turnTile(data) {
    socket.broadcast.emit('turn',data);
  };

  function dropTile(dataDrop) {
    console.log(dataDrop)
    socket.broadcast.emit('drop',dataDrop);
  };

  function saveData(data) {
    dataInsert(data);
  };

  function saveDataDropped(dataDrop) {
    dataDropInsert(dataDrop);
  };

  async function getData() {
    let data = await getDataOver();
    console.log(data)

    socket.broadcast.emit('gotdata',data);

  };

  async function getDataDrop() {
    let dataDrop = await getDataDropOver();
    socket.broadcast.emit('gotdataDrop',dataDrop);
};
};
/*
  function reSet(game_id) {
    console.log(game_id.gameID)
    database.remove({ gameID: game_id.gameID  }, { multi: true }, function (err, numRemoved) {
    });
    databaseDropped.remove({ gameID: game_id.gameID  }, { multi: true }, function (err, numRemoved) {
    });
  };*/
