const { redisGetTree } = require('../redis/tree-functions');

const getTreeFromDB = async (queueName) => {
    try {
        const tree = redisGetTree(queueName);
        return tree;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getTreeFromDB
};