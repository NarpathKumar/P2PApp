function Player () {
    this.element = document.createElement('video')
    Object.assign(this.element.style, {
      width: '100%',
      height: '100%',
    })
    // document.body.appendChild(this.element)
    document.getElementById('main-div').appendChild(this.element)
  }
  
  Player.prototype.addStream = function (stream) {
    this.element.srcObject = stream
    this.element.play()
  }


module.exports = Player