import { createLibp2p } from 'libp2p'
import { webSockets } from '@libp2p/websockets'
import { noise } from '@chainsafe/libp2p-noise'
import { mplex } from '@libp2p/mplex'
import {mdns} from "@libp2p/mdns";
import {tcp} from "@libp2p/tcp";
import {circuitRelayServer, circuitRelayTransport} from "libp2p/circuit-relay";
import {floodsub} from "@libp2p/floodsub";
import {pubsubPeerDiscovery} from "@libp2p/pubsub-peer-discovery";
import {bootstrap} from "@libp2p/bootstrap";
import PeerId from 'peer-id'

// creat different p2p nodes

//Known bootstrap nodes
const bootstrapMultiaddrs = [
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN'
]

const createNode = () => {
    return createLibp2p({
        addresses: {
            listen: ['/ip4/0.0.0.0/tcp/0']
        },
        transports: [
            tcp(),
            webSockets()
        ],
        streamMuxers: [
            mplex()
        ],
        connectionEncryption: [
            noise()
        ],
        peerDiscovery: [
            mdns({
                interval: 20e3
            }),
            // bootstrap({
            //     interval: 60e3,
            //     list: bootstrapMultiaddrs, // provide array of multiaddrs
            // })
        ]
    })
}

export {createNode}