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
      },
      "nodesInLevel": {
        DataType: "Number",
        StringValue: request.nodesInLevel
      },
      "currentNodeInLevel": {
        DataType: "Number",
        StringValue: request.currentNodeInLevel
      }
    },
    MessageBody: `${request.url}: ${request.id}`,
    MessageDeduplicationId: request.id,
    MessageGroupId: `Group${request.level}`,
    QueueUrl: queueURL
  };
  try {
    const data = await sqs.sendMessage(params).promise();
    console.log(`Message ${request.id} added to queue`);
    return data.MessageId;
  } catch (err) {
    console.log(`Error creating the message: ${err}`);
  }
};


module.exports = {
  AWSCreateQ,
  AWSCreateMessage
};