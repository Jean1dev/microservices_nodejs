const fs = require('fs')

module.exports.createDirTmp = () => { if(!fs.existsSync(`tmp`)) fs.mkdirSync(`tmp`) }