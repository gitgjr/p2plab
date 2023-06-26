/* eslint-disable no-console */

import { createLibp2p } from 'libp2p'
import { identifyService } from 'libp2p/identify'
import { tcp } from '@libp2p/tcp'
import { mplex } from '@libp2p/mplex'
import { yamux } from '@chainsafe/libp2p-yamux'
import { noise } from '@chainsafe/libp2p-noise'
import { kadDHT } from '@libp2p/kad-dht'
import { CID } from 'multiformats/cid'
import all from 'it-all'
import delay from 'delay'

const createNode = async () => {
        const node = await createLibp2p({
            addresses: {
                listen: ['/ip4/0.0.0.0/tcp/0']
            },
            transports: [tcp()],
            streamMuxers: [yamux(), mplex()],
            connectionEncryption: [noise()],
            services: {
                dht: kadDHT({
                    // this is necessary because this node is not connected to the public network
                    // it can be removed if, for example bootstrappers are configured
                    allowQueryWithZeroPeers: true
                }),
                identify: identifyService()
            }
        })

        return node
    }

;(async () => {
    const [node1, node2, node3] = await Promise.all([
        createNode(),
        createNode(),
        createNode()
    ])

    await node1.peerStore.patch(node2.peerId, {
        multiaddrs: node2.getMultiaddrs()
    })
    await node2.peerStore.patch(node3.peerId, {
        multiaddrs: node3.getMultiaddrs()
    })

    await Promise.all([
        node1.dial(node2.peerId),
        node2.dial(node3.peerId)
    ])

    // The DHT routing tables need a moment to populate
    await delay(1000)

    //### content routing
    const cid = CID.parse('QmTp9VkYvnHyrqKQuFPiuZkiX9gPcqj6x5LJ1rmWuSySnL')
    await node1.contentRouting.provide(cid)

    console.log('Node %s is providing %s', node1.peerId.toString(), cid.toString())

    // wait for propagation
    await delay(300)
    const providers = await all(node3.contentRouting.findProviders(cid, { timeout: 3000 }))
    console.log('Found provider:', providers[0].id.toString())
    // ### peer lookup
    // const peer = await node1.peerRouting.findPeer(node3.peerId)
    //
    // console.log('Found it, multiaddrs are:')
    // peer.multiaddrs.forEach((ma) => console.log(ma.toString()))
})()



