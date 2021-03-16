const generateQueueName = require('../../utils/generateQueueName');
const { getTreeFromDB } = require('../../utils/functions');


const checkForExistingTrees = async (req, res, next) => {
    try {
        const request = req.body;
        const queueName = generateQueueName(request.url, request.maxLevel, request.maxPages);
        const treeFromDB = await getTreeFromDB(queueName);
        if (treeFromDB) return res.send(treeFromDB);
        request.qName = queueName;
        req.request = request;
        next();
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "Bad Request."
        });
    }

};


module.exports = checkForExistingTrees;