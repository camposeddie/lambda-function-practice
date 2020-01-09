//dependencies
const aws = require('aws-sdk');
const s3 = new aws.S3();
const path = require('path');

//define S3 bucket name and file name
//TODO- define filename from url parameter when adapted for API
const  BUCKET = "eddie-tutorial";
const FILENAME = "test.txt";

//NOTE- This method of parsing a file name to seperate will not work for "complex" file extensions such as .tar.gz
let filename = path.parse(FILENAME).name;
let extension = path.parse(FILENAME).ext;
let newName = filename + "_renamed" + extension;

exports.handler = function (event, context, callback) {
    //Copy file
    s3.copyObject({
        CopySource: BUCKET + '/' + FILENAME,
        Bucket: BUCKET,
        Key: newName
    }, function(err, data){
        if (err) {
            console.log("Error: " + err)
        } else {
            console.log("Successful Copy");
        }
    })
        .promise()                  //Avoids deleting file before copy
        .then(() =>
        
        //Delete old file
        s3.deleteObject({
            Bucket: BUCKET,
            Key: FILENAME
        }, function(err, data) {
            if (err) {
                console.log("Error: " + err)
            } else {
                console.log("Successful Deletion");
            }
        }));
        callback(null, "Finished!");
};
