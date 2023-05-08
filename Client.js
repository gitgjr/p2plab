
import * as Node from "./libp2p.js"
import * as handler from "./handler.js"
import utils from "./Utils/utils.js";
import {pipe} from "it-pipe";

const filePath = './data'
async function start() {
    const node=await Node.createNode()

    //handler
    await node.handle('/chat/1.0.0', handler.handleTextStream)

    //protocols of the node
    const protocols = ['/chat/1.0.0']

    node.addEventListener('peer:discovery', (evt) => {
        console.log('Discovered %s', evt.detail.id.toString()) // Log discovered peer
    })

    node.connectionManager.addEventListener('peer:connect', (evt) => {
        const peer= evt.detail
        const peerId=peer.remotePeer
        // console.log('the detail is ', evt.detail) // Log connected peer
        console.log('Connected to %s', peer.remotePeer.toString()) // Log connected peer


        //add peer to the peerStore
        node.peerStore.protoBook.add(peerId,protocols)
        // node.peerStore.addressBook.add(peerId, utils.getMultiaddr(evt.detail.remoteAddr))
        node.peerStore.addressBook.add(peerId, [evt.detail.remoteAddr])

        //check if peer is in the peerStore
        // node.peerStore.get(peerId).then((peer)=>{console.log("peer:",peer)})
        // node.peerStore.all().then((peers)=>{console.log("peers:",peers)})
        //TODO send a message to each peers
        let peers=node.getPeers()
        for (let i in peers){
            node.ping(peers[i]).then((time)=>{
                console.log("ping time:",time)
            })
            node.dialProtocol(peers[i],['/chat/1.0.0']).then((stream)=>{
                pipe(
                    [utils.stringToUint8Array('my own protocol, wow!')],
                    stream
                )
            })
        }
    })

    node.connectionManager.addEventListener('peer:disconnect', (evt) => {
        console.log('Disconnected from %s', evt.detail.id.toString())
    })


    // console.log(node.getProtocols())


    // const stream=node.dial(peers[0],['chat/1.0.0'])
    // console.log("stream:",stream)
    // await pipe(
    //     [utils.stringToUint8Array('my own protocol, wow!')],
    //     stream
    // )
    // let connections=[]
    // for (let peerId in peers){
    //     await node.dial(peerId, (err, conn) => {
    //         if (err) {
    //             throw err
    //         }else{
    //             connections.push(conn)
    //         }
    //     })
    // }

    //send a message to each peers
    // for (let conn in connections){
    //
    // }


}
start()

