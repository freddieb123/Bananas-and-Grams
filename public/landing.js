let socket = io.connect('http://localhost:3000');
console.log(socket);

var x = document.getElementById("submit").onclick = function(e) {
  e.preventDefault();
  let gameID = document.getElementById('game-name').value
  localStorage.setItem('gameID',gameID);
  console.log('redirect');
  /*window.location.assign(newurl);*/
  window.location.assign('/snatch/index.html')
}

console.log(x)
