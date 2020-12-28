const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use('/api/users', require("./routes/api/users"));
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then(() => {
        console.log("Mongo Connection Successful");
    })
    .catch(err => {
        console.log(err);
    });

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.post('/user', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});