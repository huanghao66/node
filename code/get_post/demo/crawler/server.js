const logger = require("../../utils/log4js/index");
const url = require("url");
const http = require("http");
const https = require("https");

const server = http.createServer((request, response) => {
  let parms = "";
  request.on("data", (chunk) => {
    logger.debug("chunk", chunk);
    parms += chunk;
  });

  request.on("end", () => {
    console.log("11111");

    let data = "";
    https
      .get("https://www.tupianzj.com/meinv/mm/heisimeinv/", (res) => {
        console.log("222");

        res.on("data", (chunk) => {
          console.log("333");

          data += chunk;
        });
        res.on("end", () => {

          response.writeHead(200, {
            "content-type": "application/json;charset=utf-8",
          });
          response.write(data);
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
