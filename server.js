const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


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
mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;


app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use('/api/users', require("./routes/api/users"));
app.use('/api/posts', require('./routes/api/posts'));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}
// app.get('/', (req, res) => {
//     res.send("Hello World");
// });

// app.post('/user', (req, res) => {
//     console.log(req.body);
//     res.send(req.body);
// });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});