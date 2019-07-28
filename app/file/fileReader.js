const fs = require('fs');
const path = require('path');

export const readFiles = (filePath, callBack, fileExtNames = [".js", ".html",".mp4",".avi"])=> {
  var dirPath = path.resolve(filePath); // path to your directory goes here
  fs.readdir(dirPath, function(err, files){
    let filesList = files.filter(function(e){
      return fileExtNames.includes(path.extname(e).toLowerCase())
    }).map((file)=>(
      path.join(filePath,file)
    ));
    callBack(filesList);
  });
}
