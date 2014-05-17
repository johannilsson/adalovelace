

var blocks = {
  0: [0x08, 0x09],
  1: [0x10, 0x11],
  2: [0x12, 0x13],
};

function CV96(buffer) {
  this.buffer = buffer;
}

CV96.prototype.setValue = function(block, value) {
  var b = blocks[block];
  var statusAuto = 0x04;
  this.buffer[b[0]] = value & 0xFF;
  this.buffer[b[1]] = (value >> 8) & 0x3;
  this.buffer[b[1]] = this.buffer[b[1]] + statusAuto;
};

CV96.prototype.getValue = function(block) {
  var b = blocks[block];
  return this.buffer[b[0]] + (this.buffer[b[1]] << 8)
};

// Set id, set with the response from the cv96, rotates internaly for next step.
CV96.prototype.setId = function(id) {
  id = id + 3;
  this.buffer[0x01] = id & 0x3;
};

// get the current id, is ready to be sent to the CV interface.
CV96.prototype.getId = function() {
  return this.buffer[0x01] & 0x3;
};


module.exports = CV96;
