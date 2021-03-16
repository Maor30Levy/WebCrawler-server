const express = require('express');
const cors = require('cors');
let keys;
const initServer = async () => {
    try {
        if (process.env.PORT) {
            await require('./keys/setKeys').setKeys();
        }
        keys = require('./keys/keys');
        const { connectMongo } = require('./db/mongoose');
        connectMongo(keys.mongoDB);
        const app = express();
        app.use(express.json());
        app.use(cors());
        const port = keys.port;
        const clientRouter = require('./routers/clientRouter');
        app.use(clientRouter);
        app.listen(port, () => {
            console.log(`Server is up on port ${port}!`)
        });
    } catch (err) {
        console.log(err);
    }

};

initServer();
