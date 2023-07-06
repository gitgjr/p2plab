import * as IPFS from 'ipfs-core';

import fs from 'fs';
import utils from "./Utils/utils.js";

import {CIDToJSON} from "./IPFS_Controller.js";

const fromPath = './Data/From/'
const toPath = './Data/To/'

const node = await IPFS.create();

// Read maintained CID
const fileList = utils.pathHandler(fromPath)
const results=node.addAll(fileList)

let CIDList=[]
for await (const result of results) {
    CIDList.push(result.cid)
    console.log(result)
}

console.log(CIDList)

for await (const file of node.ls('QmWXRATXXLzsQYnK8cs9k23YTjzZfyxgaztrS2tuotAw5N')) {
    console.log(file)
}
node.cat()
// CIDToJSON(CIDList,utils.getHLSObjectName(fileList))
// await node.stop()





