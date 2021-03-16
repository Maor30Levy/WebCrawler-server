const { AWSCreateQ, AWSCreateMessage } = require('../aws/sqs');

const createQueueAndMessage = async (queueName, request) => {
    try {
        const queueURL = await AWSCreateQ(queueName);
        if (queueURL) {
            const messageID = await AWSCreateMessage(request, queueURL);
            return { messageID, queueURL };
        }

    } catch (err) {
        console.log(err);
    }
};


module.exports = {
    createQueueAndMessage
};