'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const { userRoute, classRoute, schoolRoute } = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userRoute);
app.use('/schools', schoolRoute);
app.use('/classes', classRoute);

app.use(function (req, res, next)
{
    res.status(404).send("Resource not found: " + req.path);
});

mongoose.connect(
    "mongodb://localhost:27017/educationdb",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    function (err)
    {
        if (err) return console.log(err);

        const server = app.listen(process.env.PORT || 3000, function ()
        {
            console.log('Express server listening on port ' + server.address().port);
        });
    });

process.on("SIGINT", () =>
{
    mongoose.disconnect();
    process.exit();
});
