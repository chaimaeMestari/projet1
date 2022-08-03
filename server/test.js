const CryptoJS = require("crypto-js")
require("dotenv").config()

/*const hashedString = CryptoJS.AES.encrypt("Encryption test", process.env.HASH_SECRET_KEY).toString()
console.log("Hashed string:", hashedString)

const dehashedString = CryptoJS.AES.decrypt(hashedString, process.env.HASH_SECRET_KEY).toString(CryptoJS.enc.Utf8)
console.log("Dehashed string:", dehashedString)*/

const hashedString = CryptoJS.DES.encrypt("DES Ecryption test", process.env.HASH_SECRET_KEY).toString()
console.log("Hashed string:", hashedString)

const dehashedString = CryptoJS.DES.decrypt(hashedString, process.env.HASH_SECRET_KEY).toString(CryptoJS.enc.Utf8)
console.log("Dehashed string:", dehashedString)