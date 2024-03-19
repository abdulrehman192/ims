const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: 'play.min.io',
  port: 9000,
  useSSL: true,
  accessKey: 'JcLZJG2MxY4R7qflu54r',
  secretKey: 'DpjAbKdWpZHRsXsn63NqKJAJ34oVUKDFs1ZqNx4j',
});

const bucket = 'public-files';

async function ensureBucketExists(bucketName) {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
      console.log(`Bucket '${bucketName}' created in "us-east-1".`);
    }
  } catch (error) {
    console.error('Error occurred while ensuring bucket exists:', error);
  }
}

async function uploadFileStream(destinationObject, fileStream, metaData) {
  try {
    const buffer = await streamToBuffer(fileStream);
    const length = buffer.length;
    // Upload file using putObject method
    await minioClient.putObject(bucket, destinationObject, buffer, length, metaData);
    console.log(`File uploaded successfully to '${destinationObject}'`);
  } catch (error) {
    console.error('Error occurred while uploading file:', error);
  }
}

// Helper function to convert stream to buffer
function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', (error) => reject(error));
  });
}

module.exports = {
  ensureBucketExists,
  uploadFileStream,
};