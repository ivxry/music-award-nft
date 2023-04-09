// Use the api keys by providing the strings directly 
const pinataSDK = require('@pinata/sdk');
require('dotenv').config();
const pinata = new pinataSDK(process.env.PINATA_KEY, process.env.PINATA_SECRET);

pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});