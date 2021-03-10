const {getSecret} = require('../aws/ssm');

const getKeys = async ()=>{
    try{
        const keys = {
            port: await getSecret('serverPort'),
            clientHost: await getSecret('clientHost'),
            mongoDB: await getSecret('mongoDB'),
            workerHost: await getSecret('workerHost')
        };
        return keys
    }catch(err){
        console.log(err)
    }
};

module.exports = {getKeys};