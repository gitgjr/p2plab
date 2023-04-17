/* eslint-disable no-console */

import { createLibp2p } from 'libp2p'
import { tcp } from '@libp2p/tcp'
import { mplex } from '@libp2p/mplex'
import { noise } from '@chainsafe/libp2p-noise'
import { floodsub } from '@libp2p/floodsub'
import { bootstrap } from '@libp2p/bootstrap'
import { pubsubPeerDiscovery } from '@libp2p/pubsub-peer-discovery'
import { circuitRelayTransport, circuitRelayServer } from 'libp2p/circuit-relay'

const createNode = async (bootstrappers) => {
        const node = await createLibp2p({
            addresses: {
                listen: ['/ip4/0.0.0.0/tcp/0']
            },
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

;(async () => {
    const relay = await createLibp2p({
        addresses: {
            listen: [
                '/ip4/0.0.0.0/tcp/0'
            ]
        },
        transports: [tcp(), circuitRelayTransport()],
        streamMuxers: [mplex()],
        connectionEncryption: [noise()],
        pubsub: floodsub(),
        peerDiscovery: [
            pubsubPeerDiscovery({
                interval: 1000
            })
        ],
        relay: circuitRelayServer()
    })
    console.log(`libp2p relay started with id: ${relay.peerId.toString()}`)

    const relayMultiaddrs = relay.getMultiaddrs().map((m) => m.toString())

    const [node1, node2] = await Promise.all([
        createNode(relayMultiaddrs),
        createNode(relayMultiaddrs)
    ])

    node1.addEventListener('peer:discovery', (evt) => {
        const peer = evt.detail
        console.log(`Peer ${node1.peerId.toString()} discovered: ${peer.id.toString()}`)
    })
    node2.addEventListener('peer:discovery', (evt) => {
        const peer = evt.detail
        console.log(`Peer ${node2.peerId.toString()} discovered: ${peer.id.toString()}`)
    })
})()