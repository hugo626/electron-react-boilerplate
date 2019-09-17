import * as fs from 'fs'
import * as path from 'path'
import dbApi from "../db/api";
import {CODE_FILTER_EXTENSION_NAME, VIDEO_EXTENSION_NAME, COVER_EXTENSION_NAME} from "./constants"

/**
 * List all files in a directory recursively in a synchronous fashion.
 *
 * @param {String} dir
 * @returns {IterableIterator<String>}
 */
export const readDirecotrySync = (dir) => {
  const files = fs.readdirSync(dir);
  const directoryArray = [];
  const mediaObjectsMap = new Map();
  files.forEach(
    file => {
      const pathToFile = path.join(dir, file);
      const fsState = fs.statSync(pathToFile);
      const isDirectory = fsState.isDirectory();
      if (isDirectory) {
        directoryArray.push(pathToFile);
      } else {
        const extName = path.extname(pathToFile);
        const baseName = path.basename(pathToFile, extName);
        // check if the file type is in our list
        if (isEntryExtName(extName)) {
          const codeName = baseName.replace("-", "");
          let media
          // have the media object
          if (mediaObjectsMap.has(codeName)) {
            media = mediaObjectsMap.get(codeName);
          } else {
            media = makeMediaObject(dir, codeName);
            mediaObjectsMap.set(codeName, media);
          }

          // update the object content.
          if (isCoverExtName(extName)) {
            media.cover = `${baseName}${extName}`
          }
          if (isVideoExtName(extName)) {
            media.entry = `${baseName}${extName}`
            media.watchDateTime = fsState.atime
            media.createDateTime = fsState.birthtime
          }
        }
      }
    }
  )

  const movies = Array.from(mediaObjectsMap.values());
  const result = dbApi.addMovies(movies);
  directoryArray.forEach(directory => {
    readDirecotrySync(directory);
  })
}


export const isCoverExtName = (extName) => (COVER_EXTENSION_NAME.findIndex(codeExtName => extName.indexOf(codeExtName) >= 0) >= 0)


export const isEntryExtName = (extName) => (CODE_FILTER_EXTENSION_NAME.findIndex(codeExtName => extName.indexOf(codeExtName) >= 0) >= 0)


export const isVideoExtName = (extName) => (VIDEO_EXTENSION_NAME.findIndex(codeExtName => extName.indexOf(codeExtName) >= 0) >= 0)


export const makeMediaObject = (dir, code, entry = null, cover = null, createDateTime = null, watchDateTime = null) => ({
  path: dir,
  code,
  entry,
  cover,
  createDateTime,
  watchDateTime
})
