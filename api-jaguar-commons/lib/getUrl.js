module.exports.getUrls = tipoAmbiente => {
    if (!tipoAmbiente) {
        return undefined
    }

    let urls = require('../config/routes.json')
    return urls[eval(`tipoAmbiente`)]
}

this.getUrls('localhost')