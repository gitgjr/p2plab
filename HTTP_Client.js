
import fs from 'fs';
import net from 'net';
import { pipeline } from 'stream';
import {fromPath, toPath} from "./Path.js";

const socket = new net.Socket();
socket.connect(6000, '127.0.0.1');
socket.on('connect', function () {
    const fileStream = fs.createWriteStream(toPath+'big0.ts');
    console.log('New file transfer');

    pipeline(
        socket,
        fileStream,
        (error) => {
            if (error) { console.error(error) }
            console.log('File transfer done');
        }
    )
});