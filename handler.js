import fs from 'fs'
import {pipe} from "it-pipe";
import utils from "./Utils/utils.js";
import { Transform,Readable,Writable } from 'stream'

const toPath = './Data/To/'
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
    console.log("start handle stream:",stream)
    pipe(
        stream,
        async function (source) {
            for await (const msg of source) {
                // console.log("msg:",msg)
                // console.log("msg.subarray():",msg.subarray())
                console.log(utils.uint8ArrayToString(msg.subarray()))
            }
        }
    )
}

function handleBufferStream({stream},filePath){
    // Create a readable stream from the file
    console.log("start handle stream:",stream)
    const extractChunk=new ExtractChunk()

    pipe(
        stream,
        async function (source){
            let file_name= await source.next()
            file_name=utils.uint8ArrayToString(file_name.value.subarray())
            console.log("file_name:",file_name)
            let chunk=await source.next()
            chunk=chunk.value.subarray()
            console.log("file_chunk:",chunk)
            const writeStream=fs.createWriteStream(toPath+file_name)
            const canContinue = writeStream.write(chunk)
            if (!canContinue) {
                stream.closeRead()
            }
            // console.log(utils.uint8ArrayToString(source[0].subarray()))
            // const write_stream=fs.createWriteStream()
        }
    )

    // ###well done
    // pipe(
    //     stream,
    //     async function (source) {
    //         for await (const msg of source) {
    //             console.log(utils.uint8ArrayToString(msg.subarray()))
    //         }
    //     }
    // )
    //###
}
class ExtractChunk extends Transform {
    constructor(operation) {
        super(operation)
    }
    _transform(chunk, encoding, callback) {
        this.result= handleStreamExtractChunk(chunk)
        this.push(this.result)
        callback()
    }
}
async function handleStreamExtractChunk(source){
    let file_name= await source.next()
    file_name=utils.uint8ArrayToString(file_name.value.subarray())

    let chunk=await source.next()
    chunk=chunk.value.subarray()
    console.log("file_chunk:",chunk)
    return [file_name,chunk]
    // console.log(utils.uint8ArrayToString(source[0].subarray()))
    // const write_stream=fs.createWriteStream()
}

export {clientReceiveChunk,handleTextStream,handleBufferStream}