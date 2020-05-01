let express = require('express');
const Datastore = require('nedb');

const database = new Datastore('database.db');
const databaseDropped = new Datastore('databaseDropped.db');


database.loadDatabase();
databaseDropped.loadDatabase();



//create app with express function
let app = express();

//get app to listen on port 3000
let server = app.listen(3000)

//give files to node
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}))
console.log("Socket server is running.")


let socket = require('socket.io')
let io = socket(server);

io.sockets.on('connection', newConnection)

app.get('/api', (request, response) => {
  database.find({},(err,data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);

  })
})

app.get('/dragged', (request, response) => {
  databaseDropped.find({},(err,dataDrop) => {
    if (err) {
      response.end();
      return;
    }
    response.json(dataDrop);

  })
})

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
    database.insert(data);
  }

  function saveDataDropped(dataDrop) {
    databaseDropped.insert(dataDrop);
  }

  function reSet(game_id) {
    console.log('function')
    database.remove({ url: game_id.url  }, { multi: true }, function (err, numRemoved) {
    });
    databaseDropped.remove({ url: game_id.url  }, { multi: true }, function (err, numRemoved) {
    });
  };
}
