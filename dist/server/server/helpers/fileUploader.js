"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
/**
 * Upload file to AWS s3 bucket
 *
 * @param fileName
 * @param fileContent
 */
const uploadFile = (fileName, fileContent) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const mimetype = fileName.split('.')[1];
    let params = {};
    // Setting up S3 upload parameters
    if (mimetype === 'jpeg' || mimetype === 'png' || mimetype === 'jpg') {
        const buf = Buffer.from(fileContent.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `assets/${fileName}`,
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: `image/${mimetype}`
        };
    }
    else if (mimetype === 'pdf') {
        const buf = Buffer.from(fileContent.replace(/^data:application\/\w+;base64,/, ''), 'base64');
        params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `assets/${fileName}`,
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: 'application/pdf',
            ['Content-Disposition']: 'inline'
        };
    }
    else {
        throw new Error('File type not supported');
    }
    // Uploading files to the bucket
    return s3.upload(params).promise();
});
exports.default = uploadFile;
//# sourceMappingURL=fileUploader.js.map