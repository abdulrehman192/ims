const localFile = require('./file-uploader-local');
const FTPUploader = require('../api/file-uploader-ftp');
const SFTPUploader = require('../api/file-uploader-ssh');

const ftpUploader = new FTPUploader();
const sftpUploader = new SFTPUploader();

class UploadMode {
  static LOCAL = 'local';
  static FTP = 'ftp';
  static SFTP = 'sftp';
}

let mode = UploadMode.LOCAL;

const uploadFile = (req, res, next) => {
  if (mode === UploadMode.LOCAL) {
    localFile.uploadFileToLocal(req, res, next);
  } else if (mode === UploadMode.FTP) {
    ftpUploader.uploadFileOverFTP(req, res, next);
  } else if (mode === UploadMode.SFTP) {
    sftpUploader.uploadFileOverSSH(req, res, next);
  }
};

module.exports = { uploadFile };
