import { createLibp2p } from 'libp2p'
import { webSockets } from '@libp2p/websockets'
import { noise } from '@chainsafe/libp2p-noise'
import { mplex } from '@libp2p/mplex'
import {mdns} from "@libp2p/mdns";
import {tcp} from "@libp2p/tcp";
import { kadDHT } from '@libp2p/kad-dht'
import { yamux } from '@chainsafe/libp2p-yamux'
import {circuitRelayServer, circuitRelayTransport} from "libp2p/circuit-relay";
import {floodsub} from "@libp2p/floodsub";
import {pubsubPeerDiscovery} from "@libp2p/pubsub-peer-discovery";
import {bootstrap} from "@libp2p/bootstrap";
import {identifyService} from "libp2p/identify";
// import PeerId from 'peer-id'

// creat different p2p nodes

//Known bootstrap nodes
const bootstrapMultiaddrs = [
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN'
]

const createMdnsNode = () => {
    return createLibp2p({
        services:{

        },
        connectionGater: {
            denyDialMultiaddr: () => false
        },
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
        ],

    })
}
const createDHTsNode = () => {
    return createLibp2p({
        addresses: {
            listen: ['/ip4/0.0.0.0/tcp/0']
        },
        transports: [
            tcp(),
            webSockets()
        ],
        streamMuxers: [
            mplex(),
            yamux()
        ],
        connectionEncryption: [
            noise()
        ],
        services: {
            dht: kadDHT({
                // this is necessary because this node is not connected to the public network
                // it can be removed if, for example bootstrappers are configured
                allowQueryWithZeroPeers: true
            }),
            identify: identifyService()
        }
    })
}

export {createMdnsNode,createDHTsNode}