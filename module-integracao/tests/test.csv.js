/*
https://www.npmjs.com/package/csvtojson
*/
let csvFilePath = `${__dirname}/../`
const csv = require('csvtojson')
const teste = require(`api-jaguar-commons/lib/fileSystem`)

csv({ delimiter: `;` }).fromFile(csvFilePath).then(json => {
    console.log(json)
})

// Async / await usage
// const jsonArray=await csv().fromFile(csvFilePath);