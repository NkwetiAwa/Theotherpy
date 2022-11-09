const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');


require('dotenv').config();

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/profiles', express.static('profiles'));
/* Connect To MongoDB now */
    const uri = process.env.ATLAS_URI;
    mongoose.connect(uri, { useNewUrlParser: true });

    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("MongoDB connection established successfully");
    })


//Middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome To Malah" });
})

// Map files
    const authenticate = require('./routes/api/authentication');
    const profile = require('./routes/api/profile');
    const admin = require('./routes/api/admin');
    const home = require('./routes/api/home');

    app.use('/authenticate', authenticate);
    app.use('/profile', profile);
    app.use('/admin', admin);
    app.use('/home', home);
//

/// app.listen
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
