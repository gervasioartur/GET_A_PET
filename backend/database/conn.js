const mongoose = require('mongoose')
const uri = "mongodb://127.0.0.1:27017/getpaet"

async function main() {
    await mongoose.connect(uri)
    console.log('Conetou ao mongodb com mongose')
}

main().catch(err => console.log(err))
module.exports = mongoose