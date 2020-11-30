const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Request Logger
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
