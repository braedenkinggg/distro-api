const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./api/routes');
const errorHandler = require('./api/middleware/errorHandler');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 9000, () => {
            console.log(`Listening at http://localhost:${process.env.PORT}`);
        });
    }).catch(err => {
        console.log(err);
    });