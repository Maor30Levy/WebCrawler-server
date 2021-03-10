const {saveSecret} = require('../aws/ssm');
const keys = require('./keys');

const setKeys = async ()=>{
    try{
        const devPort = process.env.PORT;
        const devMongoDB = process.env.MONGODB;
        const client = process.env.CLIENT_HOST;
    
        await saveSecret('serverPort',devPort);
        await saveSecret('mongoDB',devMongoDB);
        await saveSecret('clientHost',client);
    }catch(err){
        console.log(err);
    }
};

module.exports = {setKeys};