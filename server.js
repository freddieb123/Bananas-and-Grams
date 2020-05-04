require('dotenv').config();
const mongodb = require('mongodb');
const uri = 'mongodb://freddieb1234:QWERTY12@ds149744.mlab.com:49744/heroku_bnwqfrc3';
mongodb.MongoClient.connect(uri, function(err, client) {
  if(err) throw err;


async function getDataOver() {
  try {
    await client.connect();
// async functions go here
    let data = await getData(client);
    return data;
    console.log('success');
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  };
};

async function getDataDropOver() {
  try {
    await client.connect();
// async functions go here
    let dataDrop = await getDataDrop(client).catch(console.log);
    return dataDrop;
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

async function getData(client) {
  try {
  const result = await client.db('database').collection("database").find({}).toArray();
  return result
} catch(e) {
  console.log(e);
} finally {
}
};

async function getDataDrop(client) {
  try {
  const result = await client.db('database').collection("databaseDropped").find({}).toArray();;
  return result
} catch(e) {
  console.log(e);
} finally {
}
};

async function dataInsert(data) {
  try {
    await client.connect();
// async functions go here
    await client.db('database').collection("database").insertOne(data);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

async function dataDropInsert(dataDrop) {
  try {
    await client.connect();
// async functions go here
    await client.db('database').collection("databaseDropped").insertOne(dataDrop);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}
client.close(function (err) {
              if(err) throw err;
});



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

app.get('/api', async (request, response) => {
  console.log('getting data')
  let data = await getDataOver();
  console.log(data)
  response.json(data);
});

app.get('/dragged', async (request, response) => {
  let dataDrop = await getDataDropOver();
  response.json(dataDrop);
});

function newConnection(socket) {
  console.log('new connection'+ socket.id );
  socket.on('turn', turnTile);
  socket.on('turn', saveData);
  socket.on('drop', saveDataDropped);
  socket.on('drop', dropTile);

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
/*
  function reSet(game_id) {
    console.log(game_id.gameID)
    database.remove({ gameID: game_id.gameID  }, { multi: true }, function (err, numRemoved) {
    });
    databaseDropped.remove({ gameID: game_id.gameID  }, { multi: true }, function (err, numRemoved) {
    });
  };*/
