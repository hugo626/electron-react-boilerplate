const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const fileExtNames = require('./fileConstants');

// promise化异步读取方法
const readdir_promise  = promisify(fs.readdir);
const fsstat_promise  = promisify(fs.stat);

const readFilesAsync = (dir) => {
  return readdir_promise(dir, { encoding: 'utf8' })
    .then(filenames => {
      const files = getFiles(dir, filenames);
      return Promise.all(files);
    })
    .catch(err => console.error(err));
}

const getFiles = (dir, filenames)=>{
  return filenames.map(filename => {
    const { name, ext }= path.parse(filename);
    const filePath = path.resolve(dir, filename);

    return stat({ name, ext, filePath });
  });
}

const stat = ({ name, ext, filePath }) => {
  return fsstat_promise(filePath)
    .then(stat => {
      if (stat.isDirectory()) {
        return readFilesAsync(filePath);
      }
      const {atime, mtime, birthtime, size} = stat;
      return { name, ext, filePath,atime, mtime, birthtime, size};
    })
    .catch(err => console.error(err));
}

export { readFilesAsync };
