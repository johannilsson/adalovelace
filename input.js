var util = require('util');
var events = require('events');
var Smooth = require('./Smooth').Smooth;
fs = require('fs');


var scale = function(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};

// console.log(Smooth);
//
// var s = Smooth([1, 2, 3, 4]);
// console.log(s(1));          // => 2
// console.log(s(1.5));        // => 2.5

util.inherits(Binary, events.EventEmitter);
function Binary(channel, dataFile) {
  events.EventEmitter.call(this);
  this.channel = channel;

  this.data = fs.readFileSync(dataFile);
  this.counter = 0;
  this.dataLength = this.data.length;

  //this.read.bind(this);
}

Binary.prototype.read = function() {
  this.counter++;
  if (this.counter >= this.dataLength) {
    this.counter = 0;
  }

  var value = parseInt(scale(this.data[this.counter], 0, 255, 0, 1023));
  this.emit('data', this.channel, value);



  var self = this;
  setTimeout(function() {
    self.read();
  }, 20);
};

Binary.prototype.run = function() {

  
}


Binary.prototype.readSmooth = function() {
  this.counter++;
  if (this.counter >= this.dataLength) {
    this.counter = 0;
  }

  var value = scale(this.data[this.counter], 0, 255, 0, 1023);

  this.emit('data', this.channel, value);
  var self = this;
  setTimeout(function() {
    self.read();
  }, 100);
};

Binary.prototype.prepareData = function() {
  return scale();

}

Binary.prototype.getNextSmooth = function () {
  var arr = [];
  arr[0] = this.data[this.getNextIndex(this.counter)]
  arr[1] = this.data[this.getNextIndex(++this.counter)]
  arr[2] = this.data[this.getNextIndex(++this.counter)]
  arr[3] = this.data[this.getNextIndex(++this.counter)]
};

Binary.prototype.getNextIndex = function(index) {
  if (index < this.dataLength) {
    return index + 1;
  }
  if (index == this.dataLength) {
    return 0;
  }
};


module.exports = Binary;


// var ada = new Binary(0, 'ada.jpg');
// ada.on('data', function(channel, cvData) {
//   console.log(channel, cvData);
// })
// ada.read();


// for (var i = 0; i < data.length ; i++) {
//   console.log(data[i]);
// }

//
//     if (i + 4 < data.length) {
//       var s = Smooth([1, 2, 3, 4]);
//     }
//
//
//   console.log(i);
// }


// fs.readFile('ada.jpg', function (err, data) {
// if (err) throw err;
//
// for (var i = 0; i < data.length ; i++) {
//
//
//
//   console.log( smooth(data[i]) );
//   //console.log(data[i]);
// }


// smooth = d3.interpolate('basis');
// smooth = d3.interpolateRound(0, 1023);
//
//
// // console.log(smooth);
//
// fs.readFile('ada.jpg', function (err, data) {
// if (err) throw err;
//
// for (var i = 0; i < data.length ; i++) {
//   console.log( smooth(data[i]) );
//   //console.log(data[i]);
// }

// for (var i = 0; i < data.length ; i++) {
// // console.log( data[i] );
// console.log( smooth().x(i).y(data[i]) );
// }
// });
