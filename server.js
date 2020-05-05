require('dotenv').config();
<<<<<<< HEAD
const uri = 'mongodb://freddieb1234:QWERTY12@ds149744.mlab.com:49744/heroku_bnwqfrc3';
mongodb.MongoClient.connect(uri)

async function getDataOver() {
  const mongodb = require('mongodb');

  const uri = 'mongodb://freddieb1234:QWERTY12@ds149744.mlab.com:49744/heroku_bnwqfrc3';
  const client = new MongoClient(uri,{ useUnifiedTopology: true });
  try {
    mongodb.MongoClient.connect(uri)
    /*await client.connect();*/
=======
const mongodb = require('mongodb');
const uri = 'mongodb://freddieb1234:QWERTY12@ds149744.mlab.com:49744/heroku_bnwqfrc3';



async function getDataOver() {
  let data,client
  try{
    client = await mongodb.MongoClient.connect(uri);/*, async function(err, client) {*/
>>>>>>> mongodbfull
// async functions go here
    db = client.db('heroku_bnwqfrc3');
    let dbcollection = await db.collection('database')
    let result = await dbcollection.find({});
    return result.toArray();
  }
  catch (err){ console.error(err);}
  finally {client.close();}
};

async function getDataDropOver() {
<<<<<<< HEAD
  const {MongoClient} = require('mongodb');

  const uri = 'mongodb://freddieb1234:QWERTY12@ds149744.mlab.com:49744/heroku_bnwqfrc3';
  const client = new MongoClient(uri,{ useUnifiedTopology: true });
  try {
    await client.connect(process.env.MONGOLAB_URI);
=======
>>>>>>> mongodbfull
// async functions go here
  let dataDrop, client
  try{
  client = await mongodb.MongoClient.connect(uri);
  db = client.db('heroku_bnwqfrc3');
  let dbcollection = await db.collection('databaseDropped');
  let result = dbcollection.find({});
    return result.toArray();
  }
  catch (err) {console.error(err);}
  finally {client.close();}
};

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
<<<<<<< HEAD
  const {MongoClient} = require('mongodb');

  const uri = 'mongodb://freddieb1234:QWERTY12@ds149744.mlab.com:49744/heroku_bnwqfrc3';
  const client = new MongoClient(uri,{ useUnifiedTopology: true });
  try {
    await client.connect(process.env.MONGOLAB_URI);
=======
    mongodb.MongoClient.connect(uri, function(err, client) {
>>>>>>> mongodbfull
// async functions go here
    client.db('heroku_bnwqfrc3').collection("database").insertOne(data);
    client.close(function (err) {
                  if(err) throw err;
    });
  });
}

async function dataDropInsert(dataDrop) {
<<<<<<< HEAD
  const {MongoClient} = require('mongodb');

  const uri = 'mongodb://freddieb1234:QWERTY12@ds149744.mlab.com:49744/heroku_bnwqfrc3';
  const client = new MongoClient(uri,{ useUnifiedTopology: true });
  try {
    await client.connect(process.env.MONGOLAB_URI);
=======
    mongodb.MongoClient.connect(uri, function(err, client) {
>>>>>>> mongodbfull
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

/*
app.get('/api', (request, response) => {
  console.log('getting data')
  let data = getDataOver();
  response.json(data);
});

app.get('/dragged', (request, response) => {
  let dataDrop = getDataDropOver();
  response.json(dataDrop);
});*/

async function newConnection(socket) {

  let getData = async () => {
    let data = await getDataOver();
    console.log(data)
    io.sockets.emit('gotdata',data);
    };


  let getDataDrop = async () => {
     let dataDrop =  await getDataDropOver();
       console.log(dataDrop)
       io.sockets.emit('gotdataDrop',dataDrop);
     };



  console.log('new connection'+ socket.id );
  socket.on('turn', turnTile);
  socket.on('turn', saveData);
  socket.on('drop', saveDataDropped);
  socket.on('drop', dropTile);
<<<<<<< HEAD
=======
  socket.on('getdatamess', getData);
  socket.on('getdataDropmess', getDataDrop);
>>>>>>> mongodbfull

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

};
/*
  function reSet(game_id) {
    console.log(game_id.gameID)
    database.remove({ gameID: game_id.gameID  }, { multi: true }, function (err, numRemoved) {
    });
    databaseDropped.remove({ gameID: game_id.gameID  }, { multi: true }, function (err, numRemoved) {
    });
  };*/
