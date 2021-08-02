const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const User = require('./models/users');
const Module = require('./models/modules');
const users_routes = require("./routes/user_routes.js");
const cors = require('cors');

const app = express();


app.use(cors());
// app.use(cors(), function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });


app.use(express.json())
app.use(bodyParser.json());
// app.use('/', require('./routes/moduleRoute.cjs'))
app.use('/', users_routes);


app.listen(3001, function() {
    console.log('express is running on port 3001')
})

// app.use("/register", function(req, res) {users_routes});
// app.use("/test", users_routes);






// Connecting to database
const uri = "mongodb+srv://Jaryl:qwerty12345@cluster0.lsuzd.mongodb.net/Orbital?retryWrites=true&w=majority"
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
const connection = mongoose.connection
connection.once('open', () => {
    console.log("Mongoose connection established successfully")
})



