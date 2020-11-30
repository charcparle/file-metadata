const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

require('dotenv').config()

app.use(cors());

// Mount the body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Serve static files
app.use('/public', express.static(process.cwd() + '/public'));
//app.use('/public/uploads', express.static(process.cwd() + '/public/uploads'));
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Request Logger
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})

// Basic Configuration
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

// Read file metadata
app.post("/api/fileanalyse", upload.single("upfile"), (req,res)=>{
  console.log(req.file);
  let logJson = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };
  res.json(logJson);
})
