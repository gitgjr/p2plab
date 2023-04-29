import * as fs from "fs";
function handleHLSStream(){

}
function clientReceiveChunk(data){
    console.log("received buffer,writing "+data.filename)

    fs.writeFile("data/"+data.filename,data.bufferdata,function (err){
        if(err){
            console.log(err.message)
            Promise.reject(err.message)
        }else{
            console.log("write successfully")
            Promise.resolve()
        }
    })
}

export {clientReceiveChunk}