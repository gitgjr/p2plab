import {pipeline} from 'stream'

const uint8 = new Uint8Array([10, 20, 30, 40, 50])
console.log(uint8)
console.log(uint8.subarray())

// process.stdin.pipe(process.stdout)