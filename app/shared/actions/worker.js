// @flow

const READ_DIR_REQUEST = 'READ_DIR_REQUEST';
const READ_DIR_SUCCEEDED = 'READ_DIR_SUCCEEDED';
const READ_DIR_FAILED = 'READ_DIR_FAILED';

const readDirectory = (path: string = ".") =>({
  type: READ_DIR_REQUEST,
  payload:path
})


export {READ_DIR_REQUEST, READ_DIR_SUCCEEDED, READ_DIR_FAILED, readDirectory};
