const express = require('express');
const axios = require('axios');
const router = new express.Router();
const { createQueueAndMessage } = require('../aws/sqs');
const generateQueueName = require('../../utils/generateQueueName');
const { getTreeFromDB } = require('../../utils/functions');
const { getSecret } = require('../aws/ssm');

router.post('/newQuery', async (req, res) => {
    try {
        const request = req.body;
        const queueName = generateQueueName(request.url, request.maxLevel, request.maxPages);

        const treeFromDB = await getTreeFromDB(queueName);
        if (treeFromDB) return res.send(treeFromDB);
        request.qName = queueName;
        request.id = '0';
        request.level = '1';
        const { messageID, queueURL } = await createQueueAndMessage(queueName, request);
        const workerHost = await getSecret('workerHost');
        await axios.post(workerHost, { queueURL });
        return res.send({ messageID, queueURL, queueName });

    } catch (err) {
        console.log(err.message);
        res.status(500);

    }
});

router.post('/stream', async (req, res) => {
    try {
        const request = req.body;
        const queueName = generateQueueName(request.url, request.maxLevel, request.maxPages);
        const tree = await getTreeFromDB(queueName);
        if (tree) return res.send(tree);
        return res.status(404).send('Query not found.');

    } catch (err) {
        console.log(err);
    }

})


module.exports = router;
