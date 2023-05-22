import fs from 'fs'
import {pipe} from "it-pipe";
import utils from "./Utils/utils.js";
function sendBuffer(node,folderPath){
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.log(`Error reading folder: ${folderPath}`);
            console.log(err);
            return;
        }
    })
    // Create a readable stream from the file
    files.forEach((file)=>{
        const fileStream = fs.createReadStream(file);

        // Create a buffer to store the file data
        const chunks = [];
        fileStream.on('data', (chunk) => {
            chunks.push(chunk);
        });
        fileStream.on('end', () => {
            const data= Buffer.concat(chunks);
        })
    })
}

function filesToBuffer(files){
    let bufferArray=[]
    for(let i=0;i<files.length;i++){
        bufferArray.push(fs.readFileSync(files[i]))
    }
    return bufferArray
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
            console.log("stream:",typeof stream)
            // let msg="wow! I'm "+node.peerId.toB58String()
            // msg.pipe(stream)
            // pipe(
            //     [utils.stringToUint8Array('my own protocol, wow!')],
            //     stream
            // )
        })
        // node.dialProtocol(peers[i],[''])
    }
}

export {sendBuffer,filesToBuffer,pingPeers,sayHello}