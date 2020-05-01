let socket = io.connect('http://localhost:3000');
console.log(socket);

var x = document.getElementById("submit").onclick = function(e) {
  e.preventDefault();
  let newurl = '/' + document.getElementById('game-name').value
  console.log('redirect');
  console.log(newurl);
  var window = window.open(newurl, windowName, [windowFeatures]);
}

console.log(x)
