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

const createNode = async (bootstrappers) => {
    const node = await createLibp2p({
        // addresses: {
        //     listen: ['/ip4/0.0.0.0/tcp/0']
        // },
        transports: [tcp()],
        streamMuxers: [mplex()],
        connectionEncryption: [noise()],
        pubsub: floodsub(),
        peerDiscovery: [
            bootstrap({
                list: bootstrappers
            }),
            pubsubPeerDiscovery({
                interval: 1000
            })
        ]
    })

    return node
}

const client= await createNode()

client.addEventListener('peer:discovery', (evt) => {
    console.log('Discovered %s', evt.detail.id.toString()) // Log discovered peer
})

client.connectionManager.addEventListener('peer:connect', (evt) => {
    console.log('Connected to %s', evt.detail.remotePeer.toString()) // Log connected peer
})

client.addEventListener('stream',function (evt){

})
