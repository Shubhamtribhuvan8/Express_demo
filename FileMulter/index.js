const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// app.use(express.static(path.join(__dirname, 'upload')));
app.set('view engine', 'ejs');

app.get('/upload', (req, res) => {
  res.render('upload');
});

app.post('/profile', upload.single('avatar'), (req, res) => {
  res.send('Image uploaded successfully');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
