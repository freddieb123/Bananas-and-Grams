require('dotenv').config();

const mongodb = require('mongodb');
const uri = "mongodb+srv://freddieb123:n_bbtf2RFdZB*Dc@cluster0.9nwsy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";;




async function getDataOver() {
  let data,client
  try{
    client = await mongodb.MongoClient.connect(uri);/*, async function(err, client) {*/
// async functions go here
    db = client.db('test');
    let dbcollection = await db.collection('database')
    let result = await dbcollection.find({});
    return result.toArray();
  }
  catch (err){ console.error(err);}
  finally {setTimeout(function() {client.close()},1000);}
};

async function getDataDropOver() {
// async functions go here
  let dataDrop, client
  try{
  client = await mongodb.MongoClient.connect(uri);
  db = client.db('test');
  let dbcollection = await db.collection('databaseDropped');
  let result = dbcollection.find({});
    return result.toArray();
  }
  catch (err) {console.error(err);}
  finally {setTimeout(function(){client.close()},1000);}
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

    const client = mongodb.MongoClient.connect(uri, function(err, client) {
// async functions go here
    client.db('test').collection("database").insertOne(data);
    client.close(function (err) {
                  if(err) throw err;
    });
  });
}

async function dataDropInsert(dataDrop) {
  const client = mongodb.MongoClient.connect(uri, function(err, client) {
// async functions go here
    client.db('test').collection("databaseDropped").insertOne(dataDrop);
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
const port = process.env.PORT || config.httpPort;
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
  socket.on('getdatamess', getData);
  socket.on('getdataDropmess', getDataDrop);
  socket.on('drop_mid',dropMid);
  socket.on('drop_mid', saveDataDropped);


  /*socket.on('reset', reSet);*/


  function turnTile(data) {
    socket.broadcast.emit('turn',data);
  };

  function dropTile(dataDrop) {
    console.log(dataDrop)
    socket.broadcast.emit('drop',dataDrop);
  };

  function dropMid(dataDrop) {
    console.log(dataDrop)
    socket.broadcast.emit('drop_middle',dataDrop)
  }

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
