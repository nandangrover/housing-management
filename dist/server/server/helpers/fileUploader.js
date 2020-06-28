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
    // Setting up S3 upload parameters
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `assets/${fileName}`,
        Body: fileContent
    };
    // Uploading files to the bucket
    return s3.upload(params).promise();
});
exports.default = uploadFile;
//# sourceMappingURL=fileUploader.js.map