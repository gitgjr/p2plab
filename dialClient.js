
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
        console.log('Connected to %s', evt.detail.remotePeer.toString()) // Log connected peer
        if (node.peerStore.peers) {
            peers = Array.from(node.peerStore.peers.values());
        }
        console.log("peers:",node.peerStore.peers)
    })
}
start()