const { getSecret } = require('../aws/ssm');
const keys = {};
const getKeys = async () => {
    try {
        keys.workerHost = await getSecret('workerHost');
        keys.port = await getSecret('serverPort');
        keys.clientHost = await getSecret('clientHost');
    } catch (err) {
        console.log(err)
    }
};

getKeys();


module.exports = keys;