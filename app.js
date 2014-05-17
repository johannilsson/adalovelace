
var HID = require('node-hid');
var CV96 = require('./cv96');
var Binary = require('./input');

var PATH = 'USB_04d8_003f_14200000';

var device = new HID.HID(PATH);
var devices = HID.devices()

console.log(devices);


var ada = new Binary(0, 'ada.jpg', 250, 1);
var ada1 = new Binary(1, 'ada2.jpg', 250, 16);
var ada2 = new Binary(2, 'ada3.jpg', (250 / 2) * 3, 40, true);
var ada3 = new Binary(3, 'ada.jpg', 400);
var ada4 = new Binary(4, 'ada.jpg', 100);
var ada5 = new Binary(5, 'ada.jpg', 100);
var ada6 = new Binary(6, 'ada.jpg', 100);
var ada7 = new Binary(7, 'ada.jpg', 100);



var cvTx = new CV96(new Buffer(64));
cvTx.setId(0);
cvTx.setValue(0, 500);
device.write(cvTx.buffer);

device.on('data', function(data) {
  var cvRx = new CV96(data);
  var id = cvRx.getId()

  //console.log(id);

  //cvTx.setData(0, sdjksdjk);
  cvTx.setId(id);
  device.write(cvTx.buffer);
});


ada.on('data', setValue)
ada1.on('data', setValue)
ada2.on('data', setValue)
ada3.on('data', setValue)
ada4.on('data', setValue)
ada5.on('data', setValue)
ada6.on('data', setValue)
ada7.on('data', setValue)

ada.read();
ada1.read();
ada2.read();
ada3.read();
ada4.read();
ada5.read();
ada6.read();
ada7.read();

function setValue(channel, cvData) {
  //console.log(channel, cvData);
  cvTx.setValue(channel, cvData);
  cvTx.setValue(channel + 8, cvData);
}


// ada.on('data', function(data) {
//   cvTx.setValue(ada.channel, data);
// });
