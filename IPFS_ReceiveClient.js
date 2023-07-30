import * as IPFS from 'ipfs-core';
import fs from 'fs';
import utils from "./Utils/utils.js";
import {CIDToJSON} from "./IPFS_Controller.js";
import {downloadFiles, readJsonFile} from "./IPFS_Handler.js";
import {fromPath} from "./Path.js";

const node = await IPFS.create();


// Read maintained CID
const fileList = utils.pathHandler(fromPath)
const results=node.addAll(fileList)

let CIDList=[]
for await (const result of results) {
    CIDList.push(result.cid)
}
let torrentCIDList=readJsonFile()
console.log('CIDList in torrent',torrentCIDList)
downloadFiles(torrentCIDList)


console.log(CIDList)



