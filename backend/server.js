/* Author: Team */

const express = require('express');
const path = require('path');
const api = require('./api')

const app = express();
const cors = require('cors')
app.use(cors())

//Configurations
const port = process.env.PORT || 8080;
app.use(express.json());

//API Routes
app.use('/api', api);

app.listen(port, () => {
    console.log("App started on port:" + port)
});