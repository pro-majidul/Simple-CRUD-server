const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`local server is open on port ${port}`)
});





// user : mdmajiduli026 pass :61D2twSUyiVTOS2h;  xAxChS5LSB5Cc1EE


const uri = "mongodb+srv://xAxChS5LSB5Cc1EE:xAxChS5LSB5Cc1EE@cluster0.xihi8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const database = client.db("usersDB");
        const userCollection = database.collection("user");

        // all data get korar jonne ba read korar jonne
        app.get('/user', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        // single data get korar jonne 
        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const users =await userCollection.findOne(query);
            res.send(users)
        })

        // data database e pathanor jonne ba data post kora ba data Create kora 
        app.post('/user', async (req, res) => {
            const newUsers = req.body;
            console.log(newUsers);
            const result = await userCollection.insertOne(newUsers);
            res.send(result)

        })
        // data delete from database 
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result =await userCollection.deleteOne(query);
            res.send(result)
        })

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`local server in running on port ${port}`)
})