var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('FORM SERVICE INTEGRSTION');
});
app.listen(3000, function () {
  console.log('form service app listening on port 3000!');
});