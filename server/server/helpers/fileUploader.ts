import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

/**
 * Upload file to AWS s3 bucket
 *
 * @param fileName
 * @param fileContent
 */
const uploadFile = async (fileName, fileContent): Promise<any> => {
  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `assets/${fileName}`, // File name you want to save as in S3
    Body: fileContent
  };

  // Uploading files to the bucket

  return s3.upload(params).promise();
};

export default uploadFile;
