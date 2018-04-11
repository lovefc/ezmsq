/**
 * 简单示例
 * auto：lovefc
 */
 
var ezmsq = require('ezmsq');

var squel = require("squel");

ezmsq.config('db.json');//打开配置文件

var  con = ezmsq.init();//可以指定在db.json里面的配置 示例：ezmsq.getConfig('default2').init();


//生成sql语句
var sql = squel.select()
    .from("table","t1")
    .field("t1.title")
    //.left_join("table2", "t2", "t1.id = t2.id")
    //.group("t1.id")
    .where("id > ?",2)
    //.where("t2.name <> 'John'")
    .toString();

console.log(sql);

//回调函数
var callback = function(err,res){
	var arr='';
	for(var i in res){
        arr += res[i]['title']+',';
    }
	console.log('1:'+arr);
};


var sql2 = squel.select()
    .from("table","t1")
    .field("t1.name")
    .where("id > ?",2)
    .toString();
	
console.log(sql2);
	
var callback2 = function(err,res){
	var arr='';
	for(var i in res){
        arr += res[i]['name']+',';
    }
	console.log('2:'+arr);
};


con.add('demo',sql,null,callback);//添加一个sql操作

con.add('demo2',sql2,null,callback2);//添加一个sql操作

con.run('');//执行同步操作，参数指定一个任务名或者多个任务名(数组),为空依次执行所有添加的sql

//例如：con.run('demo'),只会执行名为demo的sql操作



