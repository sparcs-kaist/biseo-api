const port = require("@portSanitizer")(process.env.PORT)

const variables = {
    log: console,
    port: port,
    mode: process.env.MODE
}

Object.assign(global, variables)
