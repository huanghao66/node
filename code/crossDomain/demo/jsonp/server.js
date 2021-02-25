const http = require('http')
const url  = require('url')
const server = http.createServer((req, res) => {
    let urlString = req.url
    let urlObj = url.parse(urlString,true)
    console.log(urlObj)
    switch (urlObj.pathname) {
        case '/api/data':
            res.write(`${urlObj.query.cb}("真不错")`)
            break;

        default:
            res.write('getData("page not found")')
            break;
    }
    res.end()
})

server.listen(8080, () => {
    console.log('localhost:8080')
})