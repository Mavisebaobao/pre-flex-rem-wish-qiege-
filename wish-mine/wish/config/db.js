let mysql=require("mysql");
//在上一级的目录中可以加载到
//将连接的暴露出去
 module.exports=mysql.createConnection({
 	host:"localhost",
 	user:"root",
 	password:"root",
 	database:"wish"
 })
 //  exports.db=mysql.createConnection({
 // 	host:"localhost",
 // 	user:"root",
 // 	password:"root",
 // 	database:"wish"
 // })