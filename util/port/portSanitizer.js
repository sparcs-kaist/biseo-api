function portSanitizer(port){
    const portNumber = parseInt(port, 10)
    if (isNaN(portNumber) == true){
        process.exit(5000)
    }

    if(0 < portNumber) {
        return portNumber
    } else {
        process.exit(5000)
    }
}

module.exports = portSanitizer
