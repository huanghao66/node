const logger = require("../../utils/log4js/index");
// const querystring = require('querystring');
const http = require("http");
const https = require("https");
const server = http.createServer((request, response) => {
  let data = "";
  https.get(
    "https://time.hd.mi.com/gettimestamp",
    (res) => {
      
      res.on("data", (chunk) => {
        data += chunk;
      });
      logger.debug(data)
      res.on("end", () => {
        response.writeHead(200, {
          "content-type": "application/json;charset=utf-8",
        });
        response.write(JSON.stringify(data));
        response.end()
      });
    }
  );
});
server.listen(8080, () => {
  console.log("localhost:8080");
});
