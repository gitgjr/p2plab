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
}

CIDToJSON(CIDList,utils.getHLSObjectName(fileList))
// await node.stop()

// const results = await node.add(fileData)
// const buffers=await addAllFiles(filePath)



