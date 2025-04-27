const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({ message: "Hello CI/CD!" });
});

module.exports = app;
