
import fs from 'fs'
import utils from "./Utils/utils.js";
import {CID} from "multiformats";
import {CIDPath} from "./Path.js";


async function CIDToJSON(CIDlist,HLSObjectName){
    // Convert list of CID to JSON

    const JSONlist=JSON.stringify(CIDlist);
    const JsonFileName=HLSObjectName+'.json'
    await fs.writeFileSync(CIDPath+JsonFileName, JSONlist)
}



export {CIDToJSON}