import { REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY, DDB_MAX_RETRY } from "./config";

const AWS= require('aws-sdk');

AWS.config.update({
    region:REGION,
    credentials:new AWS.Credentials(ACCESS_KEY_ID, SECRET_ACCESS_KEY)
    
});
export const dynamodb=new AWS.DynamoDB({maxRetries:DDB_MAX_RETRY});