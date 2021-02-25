const logger = require("../../utils/log4js/index");
const url = require("url");
const http = require("http");
const https = require("https");
const cheerio = require("cheerio");
const querystring = require("querystring");
const server = http.createServer((request, response) => {
  let parms = "";
  request.on("data", (chunk) => {
    parms += chunk;
  });
  request.on("end", () => {
    console.log("11111");

    logger.debug(querystring.parse(parms).path);
    https
      .get(querystring.parse(parms).path, (res) => {
        console.log("222");
        let data = "";
        let arr = [];
        res.on("data", (chunk) => {
          console.log("333");
          data += chunk;
        });
        res.on("end", () => {
          console.log(4444);
          response.writeHead(200, {
            "content-type": "application/json;charset=utf-8",
          });
          $ = cheerio.load(data);
          //  console.log( $('img'))
          Object.keys($("img")).forEach((e) => {
            if ($("img")[e].attribs && $("img")[e].attribs.src) {
              logger.info($("img")[e].attribs.src);
              arr.push($("img")[e].attribs.src.toString());
            }
          });
          response.write(arr.toString());
          response.end();
        });
      })
      .on("error", (e) => {
        console.log("error");
        logger.error(e.message);
        response.writeHead(500, {
          "content-type": "application/json;charset=utf-8",
        });
        response.write(e.message);
        response.end();
      });
  });
});
server.listen(8080, () => {
  console.log("localhost:8080");
});
