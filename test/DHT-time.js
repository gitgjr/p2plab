import * as IPFS from 'ipfs-core';
import {CID} from "multiformats";
import utils from "../Utils/utils.js";

const node = await IPFS.create();

// let ipfsPath="QmNRCQWfgze6AbBCaT1rkrkV5tJ2aP4oTNPb5JZcXYywve"
//
// for await (const chunk of node.cat(ipfsPath)) {
//     console.info(chunk)
// }
let startTime=Date.now()
const providers = node.dht.findProvs(CID.parse('QmNRCQWfgze6AbBCaT1rkrkV5tJ2aP4oTNPb5JZcXYywve'))

for await (const provider of providers) {
    utils.printTimeInterval(startTime)
    console.log(provider)
}