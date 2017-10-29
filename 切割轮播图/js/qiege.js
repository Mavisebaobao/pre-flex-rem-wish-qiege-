var aLi=document.querySelectorAll(".view li");
var lastLi=document.querySelector("li:last-child");
var oPrev=document.querySelector(".prev");
var oNext=document.querySelector('.next');

//定义一个初始化的boolean变量
var flag=true;

var num=0;
lastLi.addEventListener("webkitTransitionEnd",function(){
	flag=true;
})
oPrev.onclick=function(){
	if(flag==false)return false;
	flag=false;

	//当点击oPrev的时候让num自增
	num++;
	// 4.点击prev的时候让li的transform旋转 90度
	// 给li添加样式
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.transform="rotateX("+num*90+"deg)";
	}

}
oNext.onclick=function(){
	if(flag==false)return false;
	flag=false;
	num--;
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.transform="rotateX("+num*90+"deg)";
	}

}