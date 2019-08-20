import { ipcRenderer } from "electron";
import {put } from 'redux-saga/effects';
import {REQUEST_READ_DIR, RECEIVED_READ_DIR} from "../constants/ipcMessageName";
console.log("This is worker, give me task")
ipcRenderer.on(REQUEST_READ_DIR, (event,message)=>{
  console.log(`This is worker, Received a task: ${REQUEST_READ_DIR}`);
  console.log(event);
  console.log(message);
  myLoop ();
})
let i =0;
function myLoop () {           //  create a loop function
  setTimeout(function () {    //  call a 3s setTimeout when the loop is called
    ipcRenderer.send(RECEIVED_READ_DIR, i);
     i++;                     //  increment the counter
     if (i < 10) {            //  if the counter < 10, call the loop function
        myLoop();             //  ..  again which will trigger another
     }                        //  ..  setTimeout()
  }, 3000)
}
