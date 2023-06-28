import * as IPFS from 'ipfs-core';
import fs from 'fs';
import utils from "./Utils/utils.js";

const fromPath = './Data/From/'
const toPath = './Data/To/'

const node = await IPFS.create();


const fileList = utils.pathHandler(fromPath)
const results=node.addAll(fileList)

let CIDList=[]
for await (const result of results) {
    CIDList.push(result.cid)
}
console.log(CIDList)
// await node.stop()

// const results = await node.add(fileData)
// const buffers=await addAllFiles(filePath)



