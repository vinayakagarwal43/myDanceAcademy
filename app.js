const express = require("express");
const path = require('path');
//const fs = require('fs');
const app = express();
const port = 80;
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dancedata', { useNewUrlParser: true, useUnifiedTopology: true });

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc : String
});
const Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'));  //for serving static files
app.use(express.urlencoded());

app.set('view engine', 'pug'); //set the template engine as pug
app.set('views', path.join(__dirname, 'views'));  //set the views directory from which we want to read template files

//endpoints
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to the database!");
    }).catch(()=>{
        res.status(400).send("Item was not saved in the database!");
    });
    //res.status(200).render('contact.pug');
})

//start the server
app.listen(port, () => {
    console.log(`This application started successfully at port ${port}.`);
})