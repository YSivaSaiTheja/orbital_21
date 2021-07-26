const express = require('express');
const mongoose = require('mongoose');
const algorithm = require('./algorithm');
const User = require('./models/users');
const Module = require('./models/modules');

// const router = express.Router();
const app = express();
const dB = "mongodb+srv://Jaryl:9NnewJVIA6N7rSPF@cluster0.lsuzd.mongodb.net/Orbital?retryWrites=true&w=majority"
app.listen(5000, () => {
    console.log("System starting at 5000");
});

app.post('/', async (req, res) => {
    try {
        let userModules = req.body;
        let test = await algorithm(userModules);
        res.json({test});
    } catch (err) {
        console.log(err);
    }
})

mongoose.connect(dB,
    // avoid some deprecation warnings
    { useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(console.log("connected to mongo"))
    .catch((err) => {
        console.log(err);
    });




