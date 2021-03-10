const Tree = require('../src/models/treeModel');
const getTreeFromDB = async (queueName)=>{
    try{
        const tree = await Tree.findOne({title: queueName});
        return tree;
    }catch(err){
        console.log(err);
    }
};


module.exports = {
    getTreeFromDB
};