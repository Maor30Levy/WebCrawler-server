const express = require('express');
const router = new express.Router();
const checkForExistingTrees = require('../middleware/existingTrees');
const initiateQuery = require('../controller/qeuryInit');

router.post('/newQuery', checkForExistingTrees, async (req, res) => {
    try {
        const queryDetails = await initiateQuery(req.request);
        return res.send(queryDetails);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

router.post('/stream', checkForExistingTrees, async (req, res) => {
    try {
        return res.status(404).send('Query not found.');
    } catch (err) {
        console.log(err);
        res.status(500);
    }

})


module.exports = router;