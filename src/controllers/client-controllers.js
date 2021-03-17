const initiateQuery = require('../services/qeuryInit');

const newQuery = async (req, res) => {
    try {
        const queryDetails = await initiateQuery(req.request);
        return res.send(queryDetails);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
};
const stream = async (req, res) => {
    try {
        return res.status(404).send('Query not found.');
    } catch (err) {
        console.log(err);
        res.status(500);
    }

};

module.exports = { newQuery, stream };