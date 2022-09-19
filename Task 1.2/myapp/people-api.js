const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const port = 3000;
require('dotenv').config();

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const routes = require('./routes/routes');
app.use('/api', routes)
    // Where we will store people
let people = [];

app.use(cors());

// Configuring body parser middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/person', (req, res) => {
    const person = req.body;

    // Output the person to the console for debugging
    console.log(person);
    people.push(person);
    // res.end(JSON.stringify(person));
    res.send('Person is added to the database');
});

app.get('/people', (req, res) => {
    res.json(people);
});

app.listen(port, () => console.log(`Server starts on port ${port}!`));