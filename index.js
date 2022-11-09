const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleWares 
app.use(cors());
app.use(express.json());

//photographer, services

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.le2w9sh.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try {
        const photographerCollection = client.db('photographer').collection('services');

        app.get('/services', async(req, res) => {
            const query  = {};
            const cursor = photographerCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
    }
    finally {

    }
}
run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('Fly-to-grapher-studio server running')
});

app.listen(port, (req, res) => {
    console.log(`fly-to-grapher-server running on port ${port}`);
})