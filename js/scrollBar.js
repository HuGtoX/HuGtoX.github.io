

// function $(s){
// 	return document.querySelectorAll(s);
// }
//滚动条横向移动
function playBarScroll(obj,target,dr,media,type){
			window.m = 1;
			if(dr == 'row'){
				var flag = 1;
				var size = target.offsetParent.offsetWidth;
				var offset = event.clientX - obj.offsetLeft;
			
			}
			else if(dr == 'column'){
				var flag = 0;
				var size = target.offsetParent.offsetHeight;
				var offset = event.clientY + (obj.offsetTop+target.offsetHeight);
			}
			var num = 100/size;
			 //x=(鼠标当前X坐标-滚动按钮到父级盒子的距离)
			var w = obj.offsetWidth/2;
			var that = obj;
			document.onmousemove = function(event){
				
				
				if(flag){
					var scroll = event.clientX - offset; //(鼠标当前X坐标 - x) = 按钮的实际距离  
					var o = 'width';
				}
				else{
					var scroll = -(event.clientY - offset); 
					var o = 'height';
				}

				if(scroll<-w){
					scroll=-w;
				}
				else if(scroll>(size- w)){
					scroll = size - w;
				}

				var progressWidth = scroll + w; //进度条长度
				
				
				target.style[o] = (num*progressWidth) + '%';
				window.getSelection ? window.getSelection().removeAllRanges():document.selection.empty();
				document.onmouseup = function(){
					if(media){
						if(!type)
							media.currentTime = target.offsetWidth/size * media.duration;
						else
							media.volume = (target.offsetHeight/size).toFixed(1);
					}	

					document.onmousemove = null;
					window.m = 0;
					document.onmouseup = null;

				}
			}

			
}


//遍历节点的父子集的offsetLefthdgd
function nodeOffset(node){
	var x=0,y=0;
	while(node = node.offsetParent){
		x+=node.offsetLeft;
	}
	return x;
}

