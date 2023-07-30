import net from 'net';
import fs from 'fs';
import { pipeline } from 'stream';
import {fromPath, toPath} from "./Path.js";
import {ByteToMB} from "./Utils/utils.js";

const server = net.createServer(function (socket) {
    // const fileStream = fs.createReadStream("Data/From/big0.ts", { highWaterMark: 16384, end: 2 * 1024 * 1024 * 1024 }); // read 2GB of zeros, replace with real file
    const fileStream = fs.createReadStream(fromPath+'big0.ts')
    //size of the file
    const stats = fs.statSync(fromPath+'big0.ts');
    let size= ByteToMB(stats.size);
    console.log(size)
    console.log('New file transfer');

    pipeline(
        fileStream,
        socket,
        (error) => {
            if (error) { console.error(error) }
            console.log('File transfer done');
        }
    );

});

server.listen(6000);