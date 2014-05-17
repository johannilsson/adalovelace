

var blocks = {
  0: [8, 9],
  1: [10, 11],
  2: [12, 13],
  3: [14, 15],
  4: [16, 17],
  5: [18, 19],
  6: [20, 21],
  7: [21, 22],
  8: [23, 24],
  9: [25, 26],
  10: [27, 28],
  11: [29, 30],
  12: [31, 32],
  13: [33, 34],
  14: [35, 36],
  15: [37, 38],
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
