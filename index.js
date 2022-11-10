const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleWares 
app.use(cors());
app.use(express.json());

//photographer, services

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.le2w9sh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try {
        const photographerCollection = client.db('photographer').collection('services');
        const serviceCollection = client.db('photographer').collection('review');

        // get service data with limit
        app.get('/services', async(req, res) => {
            const query  = {};
            const cursor = photographerCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        })

        // get all service data
        app.get('/servicesAll', async(req, res) => {
            const query  = {};
            const cursor = photographerCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

        // insert review servie data on post
        app.post('/servicesAll', async(req, res) => {
            const review = req.body;
            const result = await serviceCollection.insertOne(review);
            res.send(result)
        })

        app.get('/servicesAll/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await photographerCollection.findOne(query);
            res.send(service)
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