import utils from "./Utils/utils.js";
import fs from "fs";

async function addAllFiles(filePath){
    let buffers=[]
    const fileList=utils.pathHandler(filePath)
    for await(let file of fileList){
        const fileData = await fs.readFileSync(filePath + file);
        let result= await node.add(fileData)
        buffers.push(result)
    }
    return buffers
}
async function downloadFiles(CIDList){
    for await (let CID of CIDList){
        const writeable=fs.createWriteStream()
        for await (const chunk of node.cat(CID)) {}
    }
}


export {addAllFiles}