import * as fs from "fs";
import {pipe} from "it-pipe";
import utils from "./Utils/utils.js";

// import {stream} from "stream";
function handleHLSStream(){

}
function clientReceiveChunk(data){
    console.log("received buffer,writing "+data.filename)

    fs.writeFile("data/"+data.filename,data.bufferdata,function (err){
        if(err){
            console.log(err.message)
            Promise.reject(err.message)
        }else{
            console.log("write successfully")
            Promise.resolve()
        }
    })
}

function handleTextStream({stream}){
    // stream.pipe(console.log("stream:",stream))

    pipe(
        stream,
        async function (source) {
            for await (const msg of source) {
                console.log(utils.uint8ArrayToString(msg.subarray()))
            }
        }
    )
}

function handleBufferStream({stream},filePath){
    // Create a readable stream from the file
    pipe(
        stream,
        fs.createWriteStream(filePath)
    )
    const fileStream = fs.createReadStream(filePath);

// Create a buffer to store the file data
    const chunks = []

}

export {clientReceiveChunk,handleTextStream,handleBufferStream}