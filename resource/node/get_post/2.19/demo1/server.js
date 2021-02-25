const logger = require('../../utils/log4js/index')
const querystring = require('querystring');
const http = require('http')
const server = http.createServer((request, response) => {
    let data = ""
    request.on('data', (chunk) => {
        logger.debug('chunk', chunk)
        data += chunk
    })
    request.on('end', () => {
        response.writeHead(200, {
            'content-type': 'application/json;charset=utf-8'
        })
        logger.debug(data)
        response.write(JSON.stringify(querystring.parse(data)))
        response.end()
    })

})
server.listen(8080, () => {
    console.log('localhost:8080')
})