let http =require("http");
let url=require("url");
let mime=require("mime");

let moment=require("moment");

let db=require("./config/db");

let path=require("path");

let fs=require("fs");

let template=require("art-template");

//配置模板目录
template.defaults.root="./views";
template.defaults.extname=".html";
template.defaults.rules[1].test = /##([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*##/;


let app=http.createServer();

app.listen(3000,(err)=>{
	if(!err){
		console.log("服务器启动成功！");
	}
})
app.on("request",(req,res)=>{
	let {pathname,query}=url.parse(req.url,true);

	// 封装模板引擎
	res.render=function(fql,data){

		let html=template(fql,data);
		res.writeHeader(200,{
			"Content-type":"text/html;charset=UTF-8"
		});
		//响应主体
		res.end(html);
	}
	res.random=function(min,max){
		let n=Math.ceil(Math.random()*(max-min+1)+min-1);
		return n;
	}	
	switch(pathname){
		case "/":
		case "/index":
			db.query("select * from list",(err,row)=>{
				if(!err){
					console.log(row);
					
					res.render("index",{lists:row});
				}
			})
			break;
		case "/create":
			// 在query中添加属性，，愿望的编号 和日期

				query.num=Math.ceil(Math.random()*100000);
				query.datetime= new Date();
				query.color=res.random(1,5);
				
				db.query('insert into list set ?',query,(err,rows)=>{
					if(!err){
						//设置请求头 为json
						res.writeHeader(200,{
							"Content-Type":"application/json"
						})
						
						query.datetime=moment(query.datetime).fromNow();
						res.end(JSON.stringify({
							code:100,
							msg:"添加成功！",
							result:query
						}));
					}
				});
				
				
				

			break;	
		default:
			let realpath=path.join("./",pathname);
			
			fs.readFile(realpath,(err,data)=>{
				if(!err){
					res.writeHeader(200,{
						"Content-type":mime.getType(realpath)
					})
					res.end(data);
				}
			})	
	}
})