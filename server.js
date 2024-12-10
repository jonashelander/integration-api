const express = require('express');
const responses = require('./responses.json'); // Load responses from JSON file
const cors = require('cors')

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

//Cors Options
const corsOptions = {
    origin: '*',  // This allows requests from any domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true,  // Allow cookies (if required)
};
app.use(cors(corsOptions));


// Define endpoints
app.post('/api/verifyUser', (req, res) => {
    console.log(req);
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

app.get('/api/responses', (req, res) => {
    res.json(responses)
})

// app.get('/api/responses', async (req, res) => {
//     try {
//         // Simulate asynchronous operation (e.g., fetching data)
//         const data = await someAsyncOperation(); // Replace with your async logic
//         res.json(data); // Respond with the data
//     } catch (error) {
//         console.error(error); // Log the error
//         res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
//     }
// });

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
