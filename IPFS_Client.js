import * as IPFS from 'ipfs-core';
import fs from 'fs';
import utils from "./Utils/utils.js";
import {CIDToJSON} from "./IPFS_Controller.js";

import {fromPath} from "./Path.js";

const node = await IPFS.create();

// Read maintained CID
const fileList = utils.pathHandler(fromPath)
const results=node.addAll(fileList,{wrapWithDirectory:true})
//wrap not work

let CIDList=[]
for await (const result of results) {
    CIDList.push(result.cid)
    console.log("result",result)
}

console.log(CIDList)

for await (const file of node.ls('QmWXRATXXLzsQYnK8cs9k23YTjzZfyxgaztrS2tuotAw5N')) {
    console.log(file)
}

CIDToJSON(CIDList,utils.getHLSObjectName(fileList))
// await node.stop()





