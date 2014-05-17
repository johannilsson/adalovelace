
var HID = require('node-hid');
var CV96 = require('./cv96');
var Binary = require('./input');

var PATH = 'USB_04d8_003f_14200000';

var device = new HID.HID(PATH);
var devices = HID.devices()

console.log(devices);


var ada = new Binary(0, 'ada.jpg');
var ada2 = new Binary(1, 'ada2.jpg');

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
ada2.on('data', setValue)

ada.read();
ada2.read();

function setValue(channel, cvData) {
  // console.log(channel, cvData);
  cvTx.setValue(channel, cvData);
}


// ada.on('data', function(data) {
//   cvTx.setValue(ada.channel, data);
// });
