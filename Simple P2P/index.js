navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {

    const signalhub = require('signalhub')
    const createSwarm = require('webrtc-swarm')
    const hub = signalhub('my-game', [
      'http://localhost:8080'
    ])
    const swarm = createSwarm(hub, {
      stream: stream
    })
  
    const Player = require('./player.js')
    const you = new Player()
    you.addStream(stream)
  
    const players = {}
    swarm.on('connect', function (peer, id) {
      if (!players[id]) {
        players[id] = new Player()
        players[id].addStream(peer.stream)
      }
    })
  
    swarm.on('disconnect', function (peer, id) {
      if (players[id]) {
        players[id].element.parentNode.removeChild(players[id].element)
        delete players[id]
      }
    })
  

    setInterval(function () {
    const youString = JSON.stringify(you)
    swarm.peers.forEach(function (peer) {
        peer.send(youString)
    })
    }, 100)
    
  })