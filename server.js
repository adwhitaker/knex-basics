const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const books = require('./routes/books');
const customers = require('./routes/customers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/books', books);
app.use('/customers', customers);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Listening on port ', server.address().port);
});
