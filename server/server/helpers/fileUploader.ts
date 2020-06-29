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
  const mimetype = fileName.split('.')[1];
  let params: any = {};

  // Setting up S3 upload parameters
  if (mimetype === 'jpeg' || mimetype === 'png' || mimetype === 'jpg') {
    const buf = Buffer.from(
      fileContent.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );

    params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `assets/${fileName}`, // File name you want to save as in S3
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: `image/${mimetype}`
    };
  } else if (mimetype === 'pdf') {
    const buf = Buffer.from(
      fileContent.replace(/^data:application\/\w+;base64,/, ''),
      'base64'
    );

    params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `assets/${fileName}`, // File name you want to save as in S3
      Body: buf,
      ContentEncoding: 'base64',
      ContentType: 'application/pdf',
      ['Content-Disposition']: 'inline'
    };
  } else {
    throw new Error('File type not supported');
  }

  // Uploading files to the bucket

  return s3.upload(params).promise();
};

export default uploadFile;
