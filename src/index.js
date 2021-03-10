const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const { getKeys } = require('./keys/keys');
let keys;
const initServer = async () => {
    try {
        if (process.env.PORT) {
            await require('./keys/setKeys').setKeys();
        }
        keys = await getKeys();
        const { connectMongo } = require('./db/mongoose');
        connectMongo(keys.mongoDB);
        const app = express();
        const server = http.createServer(app);
        app.use(express.json());
        app.use(cors());
        const port = keys.port;
        const publicDirectoryPath = path.join(__dirname, '../public');
        const clientRouter = require('./routers/clientRouter');
        app.use(express.static(publicDirectoryPath));
        app.use(clientRouter);
        server.listen(port, () => {
            console.log(`Server is up on port ${port}!`)
        });
    } catch (err) {
        console.log(err);
    }

};

initServer();
