const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleWares 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Fly-to-grapher-studio server running')
});

app.listen(port, (req, res) => {
    console.log(`fly-to-grapher-server running on port ${port}`);
})