import { createLibp2p } from 'libp2p'
import { webSockets } from '@libp2p/websockets'
import { noise } from '@chainsafe/libp2p-noise'
import { mplex } from '@libp2p/mplex'

import {mdns} from "@libp2p/mdns";


function createNode(){
    return  createLibp2p({
        transports: [webSockets()],
        connectionEncryption: [noise()],
        streamMuxers: [mplex()],
        peerDiscovery: [
            mdns({
                broadcast:true,
                interval: 20e3
            })
        ]
    })
}

// node.addEventListener('peer:discovery',function (peerId){
//     console.log('found peer:'.peerId.toString())
// })
// await node.start()
// await console.log("node start")


//-----To start-----
const [node1, node2] = await Promise.all([
    createNode(),
    createNode()
])

node1.addEventListener('peer:discovery', (evt) => console.log('Discovered:', evt.detail.id.toString()))
node2.addEventListener('peer:discovery', (evt) => console.log('Discovered:', evt.detail.id.toString()))


