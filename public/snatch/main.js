
let flippedAPath = '../Tiles/TileA.jpg';
let flippedBPath = '../Tiles/TileB.jpg';
let flippedCPath = '../Tiles/TileC.jpg';
let flippedDPath = '../Tiles/TileD.jpg';
let flippedEPath = '../Tiles/TileE.jpg';
let flippedFPath = '../Tiles/TileF.jpg';
let flippedGPath = '../Tiles/TileG.jpg';
let flippedHPath = '../Tiles/TileH.jpg';
let flippedIPath = '../Tiles/TileI.jpg';
let flippedJPath = '../Tiles/TileJ.jpg';
let flippedKPath = '../Tiles/TileK.jpg';
let flippedLPath = '../Tiles/TileL.jpg';
let flippedMPath = '../Tiles/TileM.jpg';
let flippedNPath = '../Tiles/TileN.jpg';
let flippedOPath = '../Tiles/TileO.jpg';
let flippedPPath = '../Tiles/TileP.jpg';
let flippedQPath = '../Tiles/TileQ.jpg';
let flippedRPath = '../Tiles/TileR.jpg';
let flippedSPath = '../Tiles/TileS.jpg';
let flippedTPath = '../Tiles/TileT.jpg';
let flippedUPath = '../Tiles/TileU.jpg';
let flippedVPath = '../Tiles/TileV.jpg';
let flippedWPath = '../Tiles/TileW.jpg';
let flippedXPath = '../Tiles/TileX.jpg';
let flippedYPath = '../Tiles/TileY.jpg';
let flippedZPath = '../Tiles/TileZ.jpg';

/*let tile1 = document.getElementById('tile1');*/
let lettersA=Array(13).fill(flippedAPath);
let lettersB=Array(3).fill(flippedBPath);
let lettersC=Array(3).fill(flippedCPath);
let lettersD=Array(6).fill(flippedDPath);
let lettersE=Array(18).fill(flippedEPath);
let lettersF=Array(3).fill(flippedFPath);
let lettersG=Array(4).fill(flippedGPath);
let lettersH=Array(3).fill(flippedHPath);
let lettersI=Array(12).fill(flippedIPath);
let lettersJ=Array(2).fill(flippedJPath);
let lettersK=Array(2).fill(flippedKPath);
let lettersL=Array(5).fill(flippedLPath);
let lettersM=Array(3).fill(flippedMPath);
let lettersN=Array(8).fill(flippedNPath);
let lettersO=Array(11).fill(flippedOPath);
let lettersP=Array(3).fill(flippedPPath);
let lettersQ=Array(2).fill(flippedQPath);
let lettersR=Array(9).fill(flippedRPath);
let lettersS=Array(6).fill(flippedSPath);
let lettersT=Array(9).fill(flippedTPath);
let lettersU=Array(6).fill(flippedUPath);
let lettersV=Array(3).fill(flippedVPath);
let lettersW=Array(3).fill(flippedWPath);
let lettersX=Array(2).fill(flippedXPath);
let lettersY=Array(3).fill(flippedYPath);
let lettersZ=Array(2).fill(flippedZPath);


let lettersList = lettersA.concat(lettersB, lettersC, lettersD, lettersE, lettersF, lettersG, lettersH, lettersI, lettersJ, lettersK, lettersL, lettersM, lettersN, lettersO, lettersP, lettersQ, lettersR, lettersS, lettersT, lettersU, lettersV, lettersW, lettersX, lettersY, lettersZ);
/*let playerBoxes = document.querySelectorAll('.abovebelow, .box-left, .box-right');*/
let boxes = document.querySelectorAll('td');
let grids = document.querySelectorAll('.box');
let draggedItem = null;
let totalTiles = 144;
let tiles = [];
let seed = ['hello','goodbye','here','there','where','nothere'];
let n=null;
/*tile1.onclick = () => {
  tile1.src = flippedAPath
}*/


let socket = io.connect('http://localhost:3000');
let gameID = localStorage.getItem('gameID')
console.log(gameID)

//set gameID
let gameid_location = document.getElementById('gameID');
gameid_location.append('GAME ID:  ' + gameID)

let startGame = (list,total) => {
  shuffler(list);
  createDivs(total);
  createTiles(total);
  loadData();
}


let shuffler = (list, seed=gameID) => {
    /*for (let i=0;i<seed.length;i++){*/
    var myrng = new Math.seedrandom(seed);
    /*}*/
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(myrng() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
    }

let createDivs = (totalTiles) => {
  for (let i = 0; i< totalTiles; i++) {

    //create the divs for Grid
    let div = document.createElement('div');
    div.id = 'div'+(i+1);
    div.class = 'box';
    currentDiv = document.getElementById('tile-space')
    currentDiv.appendChild(div)
}
}

let createTiles = (totalTiles) => {
  for (let i = 0; i< totalTiles; i++) {
    let div = document.getElementById('div'+(i+1))
    let img = document.createElement('img');
    img.id = 'tile'+ (i+1);
    img.className = 'tile';
    img.src = 'Tile.jpg';
    img.draggable = true;
    /*img.ondragstart = dragstart_handler(event);*/
    /*let currentDiv = document.getElementById(div.id);*/
    div.appendChild(img)

    tiles[i] = img

    tiles[i].addEventListener('click', clickable);
    tiles[i].addEventListener("touchend", dragender, false);
    tiles[i].addEventListener("touchstart", dragstarter, false);

    function clickable() {
      tiles[i].src = lettersList[i]
      data = {
        i: i,
        id: tiles[i].id,
        gameID: gameID
      }
      socket.emit('turn',data)
    };

    tiles[i].addEventListener('dragstart', dragstarter);

    function dragstarter () {
      draggedItem = tiles[i];
      console.log(draggedItem);
      setTimeout(function() {
        tiles[i].style.display='none';
      },0);
    };

    tiles[i].addEventListener('dragend', dragender);

    function dragender () {
      draggedItem = tiles[i];
      console.log('dragend');
      setTimeout(function(){
        draggedItem.style.display='block';
        draggedItem = null;
      },0);
    };

  }
  return tiles
}

async function loadData(){
  const response = await fetch('/api');
  const data = await response.json();
  const response2 = await fetch('/dragged');
  const dataDrop = await response2.json();
  //load the tiles that have been turned over
  for (i=0;i<data.length;i++){
    if (data[i].gameID === gameID) {
      let id = data[i].id
      target_tile = document.getElementById(id);
      console.log(target_tile);
      console.log(typeof list);
      target_tile.src = lettersList[data[i].i]
      }
    }
  //load the tiles that have been dragged to a player's boxes
  for (k=0;k<dataDrop.length;k++) {
    console.log(dataDrop)
    if (data[k].gameID === gameID) {
      let box = boxes[dataDrop[k].location];
      let draggedtile = document.getElementById(dataDrop[k].id)
      box.append(draggedtile);
  }
}
}


// add listeners for dragging the tiles and dropping them
for (let j =0; j<boxes.length;j++) {
  const box = boxes[j];
  box.addEventListener('dragover', function(e) {
    e.preventDefault();
  })
  box.addEventListener('dragenter', function(e) {
    e.preventDefault();
  })
  box.addEventListener('drop', dropper);
  box.addEventListener('touchend', dropper);


  function dropper() {
    if (box.innerHTML == ' ' && draggedItem.src.includes('Tile.jpg') === false) {
      console.log(draggedItem.src)
      box.append(draggedItem);
      let dataDrop = {
        id: draggedItem.id,
        location: j,
        gameID: gameID
      }
      socket.emit('drop', dataDrop)
    }
  }
}


socket.on('turn', newDrawing);

/*function setup() {
            socket = io.connect('http://localhost:3000');
            console.log(socket);
  socket.on('turn', newDrawing);
}*/
function newDrawing(data) {
  console.log(data);
  let target_tile = document.getElementById(data.id);
  console.log(target_tile);
  target_tile.src = lettersList[data.i]
}
/*
let resetGame = (lettersList,totalTiles) => {
  for (let p = 0; p< totalTiles; p++) {
    let id = 'tile'+(p+1);
    image = document.getElementById(id);
    image.parentNode.removeChild(image)
  }
  game_id = {
    gameID: gameID
  }
  socket.emit('reset', game_id)
  shuffler(lettersList,gameID);
  createTiles(totalTiles);
  console.log('reset')
  n = null;
}*/

//count session number
window.onload = function(event) {
    shuffler(lettersList, gameID);
    createDivs(totalTiles);
    createTiles(totalTiles);
    loadData();

};
