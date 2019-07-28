const fs = require('fs');
const path = require('path');

const readFiles = (filePath, callBack, fileExtNames = [".js", ".html",".mp4",".avi"])=> {
  const dirPath = path.resolve(filePath); // path to your directory goes here
  fs.readdir(dirPath, (err, files) => {
    const filesList = files.filter((event) => (
      fileExtNames.includes(path.extname(event).toLowerCase()))).map((file)=>(
      path.join(filePath,file)
    ));
    callBack(filesList);
  });
}

export default readFiles;
