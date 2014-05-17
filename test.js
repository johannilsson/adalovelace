


var CV96 = require('./cv96');

var Binary = require('./input');

var cv96 = new CV96(new Buffer(64));
var value = 100;
cv96.setValue(0, value);
cv96.setId(3);

var id = cv96.getId();


var ada = new Binary(0, 'ada.jpg');
var ada2 = new Binary(1, 'ada2.jpg');

ada.on('data', setValue)
ada2.on('data', setValue)

ada.read();
ada2.read();

function setValue(channel, cvData) {
  console.log(channel, cvData);
  cv96.setValue(channel, cvData);
  console.log(cv96.getValue(0));
}

console.log(id);
