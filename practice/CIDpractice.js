import * as IPFS from 'ipfs-core';
import fs from 'fs';
import utils from "../Utils/utils.js";
import {CID} from "multiformats";
import { base64 } from "multiformats/bases/base64"
import {CIDToJSON} from "../IPFS_Controller.js";

const fromPath = '../Data/From/'
const toPath = '../Data/To/'

const node = await IPFS.create();

// Read maintained CID
const fileList = utils.pathHandler(fromPath)
const results=node.addAll(fileList)

let CIDList=[]
for await (const result of results) {
    CIDList.push(result.cid)
}
let str=CIDList[0].toString()
console.log(CIDList[0])
console.log(str)
const cid=CID.parse(str)
console.log(cid)





