const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyparser.json());

mongoose.connect('mongodb://localhost:27017/courses',{ useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('connected to MongoDB');
});

app.use('/', router);
app.listen(4000, () => console.log('Server running on port 4000'));
