import fs  from "fs";
import M3U8FileParser from 'm3u8-file-parser';
import {fromPath} from "../Path.js";
function readM3U8(m3u8Path) {
    let tsFileList = []

    const content = fs.readFileSync(m3u8Path, 'utf8');
    const reader = new M3U8FileParser();
    reader.read(content);
    let result=reader.getResult()
    console.log(result)
    for (let i in result['segments']) {
        tsFileList.push(result['segments'][i]['url'])
    }

    return tsFileList //tsFileNameList
}
const filePath = fromPath
const result = readM3U8(filePath + 'big.m3u8');



export{readM3U8}