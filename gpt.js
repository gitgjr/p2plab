import { createLibp2p } from 'libp2p'
import {tcp} from "@libp2p/tcp";
import { noise } from '@chainsafe/libp2p-noise'
import { mplex } from '@libp2p/mplex'
import PeerId from 'peer-id';
import PeerInfo from 'peer-info';
import multiaddr from 'multiaddr';
import * as libp2p from "./libp2p.js"
import fs from 'fs';

async function start() {
    // Generate peer ID
    const id1 = await PeerId.create({ bits: 2048 });

    // Create peer info
    const listenAddress = '/ip4/0.0.0.0/tcp/0';
    const peerInfo = new PeerInfo(id1);
    // peerInfo.multiaddrs.add(multiaddr(listenAddress));

    // Create node
    const node= await libp2p.createNode()

    // Start node
    await node.start();

    // Get list of connected peers
    let peers = [];
    if (node.peerStore.peers) {
        peers = Array.from(node.peerStore.peers.values());
    }

    // Connect to each peer and send file
    for (const peer of peers) {
        if (peer.id.toB58String() === id1.toB58String()) {
            continue; // Skip self
        }

        await node.dial(peer);

        // Send file to peer
        const filePath = 'file.txt';
        const fileData = fs.readFileSync(filePath);
        const fileStream = node.connectionManager.get(peer.id).newStream();
        fileStream.write(fileData);
        fileStream.end();

        // Receive file from peer
        node.handle('/file', ({ stream }) => {
            const receivedData = [];
            stream.on('data', chunk => receivedData.push(chunk));
            stream.on('end', () => {
                const receivedBuffer = Buffer.concat(receivedData);
                console.log(`Received file: ${receivedBuffer.toString()}`);
            });
        });

        const fileRequestStream = node.dialProtocol(peer, '/file');
        fileRequestStream.write('Send me file!');
        fileRequestStream.end();
    }
}

start();
