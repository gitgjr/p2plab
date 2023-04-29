
import * as libp2p from "./libp2p.js"

// Known peers addresses
const bootstrapMultiaddrs = [
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN'
]
async function start() {
    const node=await libp2p.createNode()
    let peers = []

    node.addEventListener('peer:discovery', (evt) => {
        console.log('Discovered %s', evt.detail.id.toString()) // Log discovered peer
    })

    node.connectionManager.addEventListener('peer:connect', (evt) => {
        const peerId= evt.detail.remotePeer
        console.log('Connected to %s', peerId.toString()) // Log connected peer
        //TODO add peer
        libp2p.peerStore.protoBook.add(peerId, protocols)
        libp2p.peerStore.addressBook.add(peerId, multiaddrs)
        if (node.peerStore.peers) {
            peers = Array.from(node.peerStore.peers.values());
        }
        console.log("peers:",node.peerStore.peers)
    })
}
start()