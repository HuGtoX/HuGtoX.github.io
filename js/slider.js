$(function(){
	var slider_main = document.querySelectorAll(".slider-main")[0]; //滚动图片的父盒子
var banner_slider = document.querySelectorAll(".banner-slider")[0]; //轮播的最大盒子
var slider_img = document.querySelectorAll(".slider-main-img"); //滚动的图片集合
var slider_ctrl = document.querySelectorAll(".slider-ctrl")[0]; //控制滚动的按钮组
var banner = document.querySelectorAll(".banner")[0];
var banner_background = ["#92928A","#E1EAF3","#19120C"];

banner.style.backgroundColor = banner_background[0];
// 生成所有控制图片滚动的小按钮
for(var i = 0; i<slider_img.length;i++){
	var span = document.createElement("span");
	span.className="slider-ctrl-con";
	span.innerHTML = slider_img.length - i;
	slider_ctrl.insertBefore(span,slider_ctrl.children[1]);
}


var spans = slider_ctrl.children; //获取所有按钮
spans[1].classList.add("current"); //为第一个按钮添加current
// spans[0].setAttribute("class","slider-ctrl-con current") 

scrollWidth = banner_slider.scrollWidth; //获取最大盒子的宽度
console.log(scrollWidth);

for(var i=1; i<slider_img.length;i++){
	slider_img[i].style.left = scrollWidth + "px"; //将第一张图片外的所有图片右移
}


var iNow = 0; //用来控制播放张数
for(var k in spans){
	spans[k].onclick = function(){
		if(this.className == "slider-ctrl-prev"){
			animate(slider_img[iNow],{left:scrollWidth});
			--iNow < 0 ? iNow = slider_img.length-1:iNow;
			slider_img[iNow].style.left = -scrollWidth + "px";
			animate(slider_img[iNow],{left:0});
			banner.style.backgroundColor = banner_background[iNow];
			setCurrent();
		}
		else if(this.className == "slider-ctrl-next"){
				autoPlay();
		}
		else{
			// 我们首先要知道我们点击是第几张图片  --- 获得当前的索引号
            // alert(this.innerHTML);
			var that = this.innerHTML - 1;
			if(that > iNow){
				animate(slider_img[iNow],{left:-scrollWidth});
				slider_img[that].style.left = scrollWidth + "px";
			}
			else if(that < iNow){
				animate(slider_img[iNow],{left:scrollWidth});
				slider_img[that].style.left = -scrollWidth + "px";
			}
			iNow = that;
			animate(slider_img[iNow],{left:0});
			setCurrent();
		}
	}
}


function setCurrent(){
	for(var i=1;i<spans.length-1;i++){
		spans[i].classList.remove("current");
	}
	spans[iNow+1].classList.add("current");
	banner.style.backgroundColor = banner_background[iNow];
}

timer = setInterval(autoPlay,4000);

function autoPlay(){
	animate(slider_img[iNow],{left:-scrollWidth});
	++iNow > slider_img.length - 1 ? iNow = 0:iNow;
	slider_img[iNow].style.left = scrollWidth + "px";
	animate(slider_img[iNow],{left:0});
	setCurrent();
}

banner_slider.onmouseover = function(){
	clearInterval(timer);
}
banner_slider.onmouseout = function(){
	clearInterval(timer);
	timer = setInterval(autoPlay,4000);
}
})
