const { sqs } = require('./aws-connect');


const AWSCreateQ = async (queueName) => {
  const createParams = {
    QueueName: `${queueName}.fifo`,
    Attributes: {
      "FifoQueue": "true",
      "ContentBasedDeduplication": "true"
    }
  };
  try {
    const data = await sqs.createQueue(createParams).promise();
    console.log('Queue created successfully.');
    return data.QueueUrl;
  } catch (err) {
    console.log(`Error creating the queue: ${err}`);
  }
};

const AWSCreateMessage = async (request, queueURL) => {
  const params = {
    MessageAttributes: {
      "qName": {
        DataType: "String",
        StringValue: request.qName
      },
      "id": {
        DataType: "String",
        StringValue: request.id
      },
      "url": {
        DataType: "String",
        StringValue: request.url
      },
      "level": {
        DataType: "Number",
        StringValue: request.level
      },
      "maxLevel": {
        DataType: "Number",
        StringValue: request.maxLevel
      },
      "maxPages": {
        DataType: "Number",
        StringValue: request.maxPages
      }
    },
    MessageBody: `${request.url}: ${request.id}`,
    MessageDeduplicationId: request.id,
    MessageGroupId: `Group${request.level}`,
    QueueUrl: queueURL
  };
  try {
    const data = await sqs.sendMessage(params).promise();
    console.log("Message created successfully.", data.MessageId);
    return data.MessageId;
  } catch (err) {
    console.log(`Error creating the message: ${err}`);
  }
};

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