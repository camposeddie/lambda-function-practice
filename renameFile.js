//TODO- Implement function to accept a path within an S3 bucket and rename the file 
    //TODO- Copy file within S3 bucket with new name
    //TODO- Remove old file from S3 bucket

//dependencies
const aws = require('aws-sdk');
const s3 = new aws.S3();

//define S3 bucket name and file name
//TODO- define filename from url parameter when adapted for API
const  BUCKET = "eddie-tutorial";
const FILENAME = "test.txt";

exports.handler = (event, context, callback) => {
    //Copy file
    s3.copyObject({
        CopySource: BUCKET + '/' + FILENAME,
        Bucket: BUCKET,
        Key: FILENAME + "_renamed"
    }, function(err, data){
        if (err) {
            console.log("Error: " + err)
        } else {
            console.log("Successful Copy");
        }
    });
    callback(null, "Finished!");


    //Delete old file
    
};
