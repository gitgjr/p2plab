
function getTime(){
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds)
    // prints date in YYYY-MM-DD format
    // console.log(year + "-" + month + "-" + date);
    //
    // // prints date & time in YYYY-MM-DD HH:MM:SS format
    // console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    //
    // // prints time in HH:MM format
    // console.log(hours + ":" + minutes);
}

function typeJudge(type){

}

function stationSearch(){

}

function sleep(delay) {
    let start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

async function pingTest(socket){
    let avePing=0
    for(let i=0;i<10;i++){
        // sleep(1000) //all thread are stoped
        await socket.emit('ping',function (){
            const start=Date.now()
            const duration = Date.now() - start;
            console.log(getTime(),":",duration);
            avePing=duration+avePing
        })
    }
    avePing=avePing/10
    return avePing
}


function printTimeInterval(startTime){
    // console.log(getTime(),"The time interval is",Math.floor((Date.now()-startTime)/1000),"ms")
    console.log(getTime(),"The time interval is",(Date.now()-startTime),"ms")
}

function deleteFileExtension(inputFileName){
    let index=inputFileName.indexOf(".") // find where the "." is
    inputFileName=inputFileName.slice(0,index)
    return inputFileName
}

function getMultiaddr(inputAddr){
    //check the type of inputAddr
    // console.log("inputAddr:",inputAddr.toString(),typeof inputAddr)
    const pureAddr=inputAddr.toString().split("/",4).join("/")
    //check the type of inputAddr
    // console.log("pureAddr:",pureAddr)
    let result=[]
    result.push(pureAddr)
    return result
}// no use

function uint8ArrayToString(fileData){
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }

    return dataString
}


function stringToUint8Array(str){
    var arr = [];
    for (var i = 0, j = str.length; i < j; ++i) {
        arr.push(str.charCodeAt(i));
    }

    var tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array
}


export default {
    getTime,
    sleep,
    pingTest,
    printTimeInterval,
    deleteExtension: deleteFileExtension,
    getMultiaddr,
    uint8ArrayToString,
    stringToUint8Array
}

