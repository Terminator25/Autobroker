const connectToMongo = require('./db');
const express = require('express');
const path = require('path');

connectToMongo();
const app = express()
const port = 4500

var cors = require('cors')

app.use(cors())

app.use(express.json())

app.use('/paytm',require('./routes/paytm_login'));
app.use('/register', require('./routes/user_creation'));

app.get('/', (req, res) => {
    const options = {
        root: path.join(__dirname)
    };
    res.sendFile('index.html', options);
  })

app.listen(port, ()=>{console.log(`${port}`);})