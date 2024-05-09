const fs = require('fs');

const uploadFileToLocal = (req, res, next) => {
    if (req.files && req.files.length > 0) {
      const uploadedFiles = req.files; // This is an array of uploaded files
      uploadedFiles.forEach((file) => {
          // Access file information
          const fieldName = file.fieldname; // Fieldname of the input field
          const originalName = file.originalname;
          let remoteFilePath = originalName;
  
            if (req.query[file.fieldname]) {
                remoteFilePath = req.query[file.fieldname];
            }
            
            console.log(remoteFilePath);
            req[file.fieldname] = remoteFilePath;
          const buffer = file.buffer; // Buffer containing the file data
        
          // Save the file to a directory
          // Example using the fs module:
          const fs = require('fs');
          const filePath = 'public/files/' + remoteFilePath;
          fs.writeFileSync(filePath, buffer);
        });
        next();
        
    } else {
      next();
    }
  };

  
  module.exports = uploadFileToLocal;
  