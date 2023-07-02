import * as IPFS from 'ipfs-core';
import fs from 'fs';
import utils from "./Utils/utils.js";
import {CIDToJSON,getNeedCID} from "./IPFS_Controller.js";

const node = await IPFS.create();

const fromPath = './Data/From/'
const toPath = './Data/To/'
const CIDPath='./Data/CID/'

// Read maintained CID
const fileList = utils.pathHandler(fromPath)
const results=node.addAll(fileList)

let CIDList=[]
for await (const result of results) {
    CIDList.push(result.cid)
}


console.log(CIDList)
getNeedCID(CIDList)


