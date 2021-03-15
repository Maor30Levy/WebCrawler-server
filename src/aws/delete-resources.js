const { sqs } = require('./aws-connect');
const { connectMongo } = require('../db/mongoose');
const Tree = require('../models/treeModel');

//AWS Resources
const deleteQ = async (queueURL) => {
  const deleteParams = {
    QueueUrl: queueURL
  };
  try {
    await sqs.deleteQueue(deleteParams).promise();
    console.log("Queue deleted");
  } catch (err) {
    console.log("Error deleting the queue", err);
  }
};
const listAllQueues = async () => {
  const listParams = {};
  try {
    const data = await sqs.listQueues({}).promise();
    if (data.QueueUrls) {
      console.log('Successful fetching')
      const arr = [].concat(data.QueueUrls);
      return arr;
    }
    else {
      console.log('No more queues');
      return;
    }
  } catch (err) {
    console.log("Error", err);
  }
};
const cleanAWSResources = async () => {
  try {
    const queuesArray = await listAllQueues();
    if (queuesArray) {
      for (let q of queuesArray) await deleteQ(q);
    }
  } catch (err) {
    console.log(err);
  }
};

// DB Resources

const deleteTree = async () => {
  try {
    await connectMongo(process.env.MONGODB);
    const trees = await Tree.find({});
    if (trees.length > 0) {
      for (let tree of trees) {
        if (!tree.completed) await tree.remove();
      }
      console.log('Trees deleted successfully.');
    } else console.log('No trees left');
  } catch (err) {
    console.log(err);
  }
};

cleanAWSResources();
deleteTree();




