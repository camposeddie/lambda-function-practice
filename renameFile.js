//dependencies
const aws = require('aws-sdk');
const s3 = new aws.S3();
const renameFile = require('./renameFileScript');

//define S3 bucket name and file name
//TODO- define filename from url parameter when adapted for API
const  BUCKET = "eddie-tutorial";
const FILENAME = "test.txt";

exports.handler = async function (event, context, callback) {
    
            //Copy file
    await   s3.copyObject({ 
                CopySource: `${BUCKET}/${FILENAME}`,
                Bucket: BUCKET, 
                Key: renameFile.handler(FILENAME)
                }, function(err, data){
                    if (err) {
                        console.log(`Error: ${err}`);
                    } else {
                        console.log(`Successful Copy`);
                    }
                }
            );

            //Delete old file
            s3.deleteObject({
                Bucket: BUCKET,
                Key: FILENAME
                }, function(err, data) {
                    if (err) {
                        console.log(`Error: ${err}`);
                    } else {
                        console.log(`Successful Deletion`);
                    }
                }
            );
        
    callback(null, `Finished!`);
};