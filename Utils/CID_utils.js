import {CID} from "multiformats";

function CIDListToString(CIDList) {
    let CIDArray=[]
    for (let i in CIDList) {
        CIDArray.push(CIDList[i].toString())
    }
    return CIDArray
}

function StringToCIDList(CIDArray) {
    let CIDList=[]
    for (let i in CIDArray) {
        CIDList.push(CID.parse(CIDArray[i]))
    }
    return CIDList
}