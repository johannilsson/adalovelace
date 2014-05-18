
var HID = require('node-hid');
var CV96 = require('./cv96');
var Binary = require('./input');

var PATH = 'USB_04d8_003f_14200000';

var device = new HID.HID(PATH);
var devices = HID.devices()

console.log(devices);

// 1 Bas, kick Drum
var ada = new Binary(0, 'ada-rgb.raw', 250, 1);
// 2 filter
var ada1 = new Binary(1, 'ada-grey.raw', 250, 16);
// 3 melody, pitch
//var ada2 = new Binary(2, 'ada.raw', (250 / 2) * 3, 40, false);
var ada2 = new Binary(2, 'ada.raw', 100, 40, false);
// 4 Hihat filter
var ada3 = new Binary(3, 'ada2-grey.raw', 250, 1);
// 5 control
var ada4 = new Binary(4, 'ada2-rgb.raw', 100);
// 6
var ada5 = new Binary(5, 'ada.jpg', 100);
// 7
var ada6 = new Binary(6, 'ada.jpg', 100);
// 8 Drum OK
var ada7 = new Binary(7, 'ada.jpg', 100);



var cvTx = new CV96(new Buffer(64));
cvTx.setId(0);
cvTx.setValue(0, 500);
device.write(cvTx.buffer);

device.on('data', function(data) {
  var cvRx = new CV96(data);
  var id = cvRx.getId()

  // console.log(id);

  //cvTx.setData(0, sdjksdjk);
  cvTx.setId(id);
  device.write(cvTx.buffer);
});


//ada.on('data', setValue)
ada1.on('data', setValue)
ada2.on('data', setValue)
ada3.on('data', setValue)
ada4.on('data', setValue)
ada5.on('data', setValue)
ada6.on('data', setValue)
ada7.on('data', setValue)

//ada.read();
ada1.read();
ada2.read();
ada3.read();
ada4.read();
ada5.read();
ada6.read();
//ada7.read();



var counter = 0;
function Drummer()
{
  counter++;
  if (counter == 4) {
    counter = 0;
  }

  if (counter == 0) {
    setValue(0, 1023);
    // setTimeout(function(){
    //   setValue(0, 0);
    // }, 20);
  } else {
    setValue(0, 0);
  }

  if (counter == 0 || counter == 2) {
    setValue(7, 1023);
    // setTimeout(function(){
    //   setValue(7, 0);
    // }, 20);
  } else {
    setValue(7, 0);
  }

  setTimeout(Drummer, 120);

}

setTimeout(Drummer, 120);

//
// var high = true;
// setInterval(function() {
//   if (high) {
//     setValue(0, 1000);
//     // console.log('high');
//     high = false;
//   } else {
//     setValue(0, 10);
//     high = true;
//     // console.log('low');
//   }
// }, 250);
//
//
// var highhat = true;
// setInterval(function() {
//   if (highhat) {
//     setValue(7, 1000);
//     // console.log('high');
//     highhat = false;
//   } else {
//     setValue(7, 10);
//     highhat = true;
//     // console.log('low');
//   }
// }, 250/2);



function setValue(channel, cvData) {
  //console.log(channel, cvData);
  cvTx.setValue(channel, cvData);
  // cvTx.setValue(channel + 8, cvData);
}


// ada.on('data', function(data) {
//   cvTx.setValue(ada.channel, data);
// });
