import fs from 'fs'
import {pipe} from "it-pipe";
import utils from "./Utils/utils.js";
import pipeline from "stream"

function sendBuffer(node,peers,folderPath){

    let files=utils.pathHandler(folderPath)

    // Create a readable stream from the file
    //TODO which loop should be the outter loop
    for(let i in peers){
        files.forEach((file)=>{
            console.log("name of file is",file)
            node.dialProtocol(peers[i],['/stream/1.0.0']).then(function (stream){
                pipe(
                    fs.createReadStream(file),
                    // stream,
                    // fs.createWriteStream('./Data/To')
                    process.stdout()
                )
            })
            // const fileStream = fs.createReadStream(file);
    
            // Create a buffer to store the file data
            // const chunks = [];
            // fileStream.on('data', (chunk) => {
            //     chunks.push(chunk);
            // });
            // fileStream.on('end', () => {
            //     const data= Buffer.concat(chunks);
            // })
        })
    }

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
            // console.log("stream:",stream)
            // pipeline()
            // let msg="wow! I'm "+node.peerId.toString()
            // msg=utils.stringToUint8Array(msg)
            // msg.pipeline(stream)
            pipe(
                [utils.stringToUint8Array('my own protocol, wow!')],
                stream
            )
        })
        // node.dialProtocol(peers[i],[''])
    }
}

export {sendBuffer,filesToBuffer,pingPeers,sayHello}