$(function(){
	var dot = $(".dot")[0]; //进度条按钮
	var volume_dot = $(".dot")[1]
	var progress_out = $(".progress-out")[0]; //已播放进度条
	var volume_out = $(".volume-out")[0];
	var control_play = $(".control-play a")[0];
	var video = $(".media")[0];				// 视频对象
	var progress = $(".progress")[0];		// 进度条
	var volume_progress = $(".volume-progress")[0];
	window.m = 0;
	var play_big = $(".play-big")[0];		// 暂停页面
	var play = $(".player")[0];				// 视频页面
	var mv = $(".mv")[0];
	var playNum = 0;						// 播放暂停控制数
	var timer = null;						// interval
	var timer2 = null;
	var current_time = $(".current-time")[0]; //span视频播放时间
	var over_time = $(".over-time")[0];		  //span总时间
	var pNum = 100/progress.offsetWidth; //进度条百分比
	var controls = $(".controls")[0]; //视频控制条


	function j_progress(){
		var out = progress_out.offsetWidth;
		video.currentTime = Math.floor((out/progress.offsetWidth)*video.duration);
	}

	 // 当媒介数据已加载时运行的脚本。
	video.onloadeddata = function(){
			var total_m = Math.floor((video.duration/60)%60);
			var total_s = Math.floor((video.duration%60));
			if(total_m < 10){
				total_m = '0' + total_m;
			}
			if(total_s < 10){
				total_s = '0' + total_s;
			}
			 over_time.innerHTML = total_m + ":" + total_s; //视频总时长
	}

	//当播放位置改变时（比如当用户快进到媒介中一个不同的位置时）运行的脚本。
	video.ontimeupdate = function(){
		 	var minute = Math.floor((video.currentTime/60)%60);
			var second = Math.floor(video.currentTime%60);
			
			if(second < 10){
			 	second = '0' + second;
			}
			if(minute < 10){
			 	minute = '0' + minute;
			}
			current_time.innerHTML = minute + ":" + second;
			var w = progress.offsetWidth;
			if(video.duration){
				var per = (video.currentTime/video.duration).toFixed(3);
				window.per = per;
			}
			else{
				per = 0;
			}

			if(!window.m)
			progress_out.style.width  = (w*per).toFixed(0) + 'px';
	}

	//播放视频
	function vPlay() {

		playNum = !playNum; // 控制视频页面的播放暂停
		if(playNum)
		{
			video.play();
			control_play.setAttribute('class','pause-sm');
			play_big.style.display = "none";
		}
		else{
			video.pause();
			control_play.setAttribute('class','play-sm');
			play_big.style.display = "block";
		}
		
	}


	//当鼠标进入视频界面时显示控制条
	mv.onmouseover = function(){
		clearTimeout(timer2);

		animate(controls,{bottom:0});
	}

	//当鼠标移除视频界面控制条消失
	mv.onmouseout = function(){
		clearTimeout(timer2);
		timer2 = setTimeout(function(){
			animate(controls,{bottom:-37});
		},1000);
			
	}
	
	document.onclick = function(){
		window.onkeydown = null;
	}
	//当文件就绪可以开始播放时运行的脚本（缓冲已足够开始时）。
	video.oncanplay = function(){
		console.log($(".volume-main").height());
		volume_out.style.height = video.volume * $(".volume-main").height() + 'px';
		play.onclick = function(event){
			vPlay();
			window.onkeydown = function(e){
				var keynum;
				var keychar;
				keynum = window.event ? e.keyCode : e.which;
				keychar = String.fromCharCode(keynum);
				if(keychar==" " || keynum==32){
					vPlay();
				}

			}
			//阻止冒泡
			var event = event || window.event;
			if (event && event.stopPropagation)
			 {
			 	event.stopPropagation();
			 }
			 else
			 {
			 	event.cancelBubble = true;
			 }
		}

		control_play.onclick = function(){
			vPlay();
		}

		//拖动视频进度条按钮事件
		dot.onmousedown = function(e){
			playBarScroll(this,progress_out,'row',video);
		
		}
		//拖动视频音量调按钮事件
		volume_dot.onmousedown = function(e){
			playBarScroll(this,volume_out,'column',video,'colume');
				
		}

		// 点击进度条
		progress.onclick = function(){

			var nodeLeft = nodeOffset(this);
			var x = event.clientX - nodeLeft;
			var w = $(this).width();
			window.per = (x/w).toFixed(3);
			var duration = video.duration;
			video.currentTime = (duration*window.per).toFixed(0);

			progress_out.style.width = (x) + "px";

		}
	}
})

