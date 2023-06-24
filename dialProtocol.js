import fs from 'fs'
import * as it from "it-pipe";
import utils from "./Utils/utils.js";
import { pipeline } from 'stream'

const fromPath = './Data/From/'
function sendBuffer(node,peers,folderPath){

    const files=utils.pathHandler(folderPath)

    // Create a readable stream from the file
    //TODO which loop should be the outer loop
    //TODO transmit a lot of files
    for (let i in peers){
        for (let file_name of files){
            const read_stream=fs.createReadStream(fromPath+file_name)
            read_stream.on('data',(chunk)=>{
                node.dialProtocol(peers[i],['/buffer/1.0.0']).then((stream)=>{
                    it.pipe(
                        [utils.stringToUint8Array(file_name),chunk],
                        stream
                    )
                })
            })
            read_stream.on('end',()=>{  console.log("read stream end")})
            read_stream.on('error', err => console.error(`Error reading file: ${err}`))
        }
    }
    // ###           well done
    // for (let i in peers){
    //     node.dialProtocol(peers[i],['/buffer/1.0.0']).then((stream)=>{
    //         it.pipe(
    //             source,
    //             stream
    //         )
    //     })
    // }
    // ###

    // for(let i in peers){
    //     node.dialProtocol(peers[i],['/stream/1.0.0']).then(function (stream){
    //
    //         pipe(
    //             [utils.stringToUint8Array('my own protocol2, wow!')],
    //             stream
    //         )
    //         // pipe(
    //         //     fs.createReadStream(file),
    //         //     stream.sink
    //         //     // fs.createWriteStream('./Data/To')
    //         //     // process.stdout("abc")
    //         // )
    //         //
    //         //     // const fileStream = fs.createReadStream(folderPath+file);
    //         //     // fileStream.on('data', (chunk) => {
    //         //     //     stream.sink(chunk)
    //         //     // })
    //     })
        // files.forEach((file)=>{
        //     console.log("name of file is",file)
        //
        //
        //
        //     // Create a buffer to store the file data
        //     // const chunks = [];
        //     // fileStream.on('data', (chunk) => {
        //     //     chunks.push(chunk);
        //     // });
        //     // fileStream.on('end', () => {
        //     //     const data= Buffer.concat(chunks);
        //     // })
        // })
    // }
}

function filesToBuffer(files){
    let bufferArray=[]
    for(let i=0;i<files.length;i++){
        bufferArray.push(fs.readFileSync(files[i]))
    }
    return bufferArray
}
function filesToStream(file,stream){
    pipe(

    )
}

function pingPeers(peers){
    for(let i in peers){
        console.log("pinging:",peers[i])
        node.ping(peers[i]).then((time)=>{
            console.log("ping time:",time)
        })
    }
}

function sayHello(node,peers){

    for (let i in peers){
        node.ping(peers[i]).then((time)=>{
            console.log("ping time:",time)
        })

        node.dialProtocol(peers[i],['/chat/1.0.0']).then((stream)=>{
            it.pipe(
                [utils.stringToUint8Array('my own protocol, wow!'),utils.stringToUint8Array('my own protocol, wow2!')],
                stream
            )

        })
        // node.dialProtocol(peers[i],[''])
    }
}

export {sendBuffer,filesToBuffer,pingPeers,sayHello}