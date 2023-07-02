
import fs from 'fs'
import utils from "./Utils/utils.js";
import {CID} from "multiformats";

const CIDPath='./Data/CID/'
async function CIDToJSON(CIDlist,HLSObjectName){
    // Convert list of CID to JSON

    const JSONlist=JSON.stringify(CIDlist);
    const JsonFileName=HLSObjectName+'.json'
    await fs.writeFileSync(CIDPath+JsonFileName,JSONlist);
}

function getNeedCID(CIDList) {
    // Read JSON file
    const CIDJSONFileName = utils.pathHandler(CIDPath)
    let rawdata = fs.readFileSync(CIDPath+CIDJSONFileName[0]);
    // Compare with maintained CID
    let AllCID = JSON.parse(rawdata);
    for (let i in AllCID) {
        AllCID[i]=CID.parse(AllCID[i]['/'])
    }
    // Return needed CID
    console.log(AllCID);
}

function fromJson(json) {
    CID.parse(json['/'])
}

export {CIDToJSON,getNeedCID}