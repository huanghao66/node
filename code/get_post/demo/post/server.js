const logger = require("../../utils/log4js/index");
const querystring = require('querystring');
const http = require("http");
const https = require("https");
const server = http.createServer((request, response) => {
  response
  const postData = querystring.stringify({
    msg: "你好世界",
  });

  const options = {
    hostname: "localhost",
    port: 8081,
    path: "",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  const req = http.request(options, (res) => {
    console.log(`状态码: ${res.statusCode}`);
    console.log(`响应头: ${JSON.stringify(res.headers)}`);
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      console.log(`响应主体: ${chunk}`);
      logger.debug(chunk)
      response.writeHead(200, {
        "content-type": "application/json;charset=utf-8",
      });
      response.write(JSON.stringify(chunk));
      response.end()
    });
    res.on("end", () => {
      console.log("响应中已无数据");

    });
  });

  req.on("error", (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });

  // 将数据写入请求主体。
  req.write(postData);
  req.end();
});
server.listen(8080, () => {
  console.log("localhost:8080");
});
