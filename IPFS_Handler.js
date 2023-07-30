import utils from "./Utils/utils.js";
import fs from "fs";
import {pipeline} from "stream";
import {CID} from "multiformats";
import {CIDPath} from "./Path.js";

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

function readJsonFile() {
    // Read JSON file
    const CIDJSONFileName = utils.pathHandler(CIDPath)

    let rawdata = fs.readFileSync(CIDPath+CIDJSONFileName[0]);
    // Compare with maintained CID
    let AllCID = JSON.parse(rawdata);
    for (let i in AllCID) {
        AllCID[i]=CID.parse(AllCID[i]['/'])
    }
    // Return needed CID
    return AllCID // CIDList
}

function fromJson(json) {
    CID.parse(json['/'])
}

async function downloadFiles(CIDList){
    for await (let CID of CIDList){

        const writeable=fs.createWriteStream()
        const reader = node.get(CID)
        pipeline(reader,writeable,(err)=>{})
        // for await (const chunk of node.cat(CID)) {}
    }
}


export {readJsonFile,downloadFiles}