class node{
    constructor(type,updateBandwidth,downloadBandwidth,latency){
        this.type=type
        this.latency=latency
        if(this.type=="fixed"){
            this.updateBandwidth=updateBandwidth*0.8
            this.downloadBandwidth=downloadBandwidth
        }else if(this.type=="unfixed"){
            this.updateBandwidth=updateBandwidth*0.5
            this.downloadBandwidth=downloadBandwidth
        }
    }
}

function calWeight(node){
    //update 5to10, latency 10 to 200
    let weight=0
    weight=Math.sqrt(node.updateBandwidth)*BandwidthWeight+node.latency**-1*20*0.5*LatencyWeight
    return weight
}