const express = require('express');
const responses = require('./responses.json'); // Load responses from JSON file

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Define endpoints
app.post('/api/verifyUser', (req, res) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.json(responses.verifyUser);
});

app.post('/api/lookupUser', (req, res) => {
    res.json(responses.lookupUser);
});

app.post('/api/authorize', (req, res) => {
    res.json(responses.authorize);
});

app.get('/api/transfer', (req, res) => {
    res.json(responses.transfer);
});

app.get('/api/cancel', (req, res) => {
    res.json(responses.cancel);
});

app.get('/api/signIn', (req, res) => {
    res.json(responses.signIn);
});

// Start the server
const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
