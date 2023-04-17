import { createLibp2p } from 'libp2p'

import { webSockets } from '@libp2p/websockets'
import { tcp } from '@libp2p/tcp'

import { noise } from '@chainsafe/libp2p-noise'
import { mplex } from '@libp2p/mplex'

import { bootstrap } from '@libp2p/bootstrap' //public method
import {mdns} from "@libp2p/mdns";

// Known peers addresses
const bootstrapMultiaddrs = [
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN'
]

const node = await createLibp2p({
    // addresses: {
    //     listen: ['/ip4/0.0.0.0/tcp/0']
    // },
    transports: [
        // tcp(),  //Done
        webSockets()  //Done
    ],
    connectionEncryption: [noise()],
    streamMuxers: [mplex()],
    peerDiscovery: [
        bootstrap({
            interval: 60e3,
            list: bootstrapMultiaddrs, // provide array of multiaddrs
        })
    ]
})

node.addEventListener('peer:discovery', (evt) => {
    console.log('Discovered %s', evt.detail.id.toString()) // Log discovered peer
})

node.connectionManager.addEventListener('peer:connect', (evt) => {
    console.log('Connected to %s', evt.detail.remotePeer.toString()) // Log connected peer
})

// await node.start()