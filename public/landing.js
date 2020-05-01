let socket = io.connect('192.168.1.130');
console.log(socket);

var x = document.getElementById("submit").onclick = function(e) {
  e.preventDefault();
  let newurl = '/' + document.getElementById('game-name').value
  console.log('redirect');
  console.log(newurl);
  /*window.location.assign(newurl);*/
  window.location.assign('/snatch/index.html')
}

console.log(x)
