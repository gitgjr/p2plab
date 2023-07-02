import * as Node from "./libp2p.js"
import * as handler from "./handler.js"
import utils from "../Utils/utils.js";
import {pipe} from "it-pipe";

const filePath = './Data/To/'
async function start() {
    const node=await Node.createMdnsNode()

    //handler
    await node.handle('/chat/1.0.0', handler.handleTextStream)
    await node.handle('/buffer/1.0.0', handler.handleBufferStream)

    //protocols of the node
    const protocols = ['/chat/1.0.0','/buffer/1.0.0']

    node.addEventListener('peer:discovery', (evt) => {
        console.log('Discovered %s', evt.detail.toString()) // Log discovered peer
    })

    node.addEventListener('peer:connect', (evt) => {
        const peerId= evt.detail

        // console.log('the detail is ', evt.detail) // Log connected peer
        console.log('Connected to %s', peerId) // Log connected peer


        //add peer to the peerStore
        // node.peerStore.protoBook.add(peerId,protocols)// node.peerStore.addressBook.add(peerId, utils.getMultiaddr(evt.detail.remoteAddr))
        // node.peerStore.addressBook.add(peerId, [evt.detail.remoteAddr])
        node.peerStore.patch(peerId,{
            protocols:protocols
        })

        let peers=node.getPeers()

    })

    node.addEventListener('peer:disconnect', (evt) => {
        console.log('Disconnected from %s', evt.detail.toString())
    })

async function pingPeers(peers){
    for(let i in peers){
        console.log("pinging:",peers[i])
        await node.ping(peers[i]).then((time)=>{
            console.log("ping time:",time)
        })
    }
}



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

