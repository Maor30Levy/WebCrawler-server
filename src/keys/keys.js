const { getSecret } = require('../aws/ssm');
const keys = {};
const getKeys = async () => {
    try {
        keys.port = await getSecret('serverPort');
        keys.clientHost = await getSecret('clientHost');
        keys.mongoDB = await getSecret('mongoDB');
        keys.workerHost = await getSecret('workerHost');
    } catch (err) {
        console.log(err)
    }
};

getKeys();


module.exports = keys;