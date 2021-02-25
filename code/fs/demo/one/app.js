const fs = require("fs");
// fs.mkdir("newTest1", (error) => {
//   if (error) throw error;
//   console.log("文件创建成功")
// });
fs.rename("../s",'./rename',()=>{
    console.log('修改名字成功')
})