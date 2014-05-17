var util = require('util');
var events = require('events');
var Smooth = require('./Smooth').Smooth;
fs = require('fs');



var runEase = function(from, to, millisec, each, callback, ease, startTime){
  if (!startTime) startTime = new Date().getTime();
  if (!ease) ease = 'lin';

  var cTime = new Date().getTime();

  var part = (cTime - startTime) / millisec;

  if (part > 1) {
    part = 1;
  }

  // console.log(from, to);

  var newPos = from - ((from - to) *  part);

  each(newPos, part);

  if (part < 1) {
    setTimeout(function(){runEase(from, to, millisec, each, callback, ease, startTime);}, 10);
  } else {
    if (callback) callback();
  }
};

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
}

Binary.prototype.read = function() {
  this.counter++;
  if (this.counter >= this.dataLength) {
    this.counter = 0;
  }

  var nextCounter = this.counter+1;
  if (nextCounter >= this.dataLength) {
    nextCounter = 0;
  }

  var channel = this.channel;
  var self = this;

  runEase(this.data[this.counter], this.data[nextCounter], 200, function(newPos){
    var value = parseInt(scale(newPos, 0, 255, 0, 1023));
    self.emit('data', self.channel, value);
  }, function(){
    self.read();
  });
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
