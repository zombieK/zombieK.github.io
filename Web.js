
window.onload=function(){
	function findInArr(n,arr){
		for(var i = 0; i < arr.length; i++){
			if(arr[i] == n) return true;
		}
		return false;
	}
	function getByClass(oParent,sClass){
		if(oParent.getElementsByClassName){
			return oParent.getElementsByClassName(sClass);
		}else{
			var aEle = oParent.getElementsByTagName('*');
			var arr2 = [];
			for(var i = 0; i < aEle.length; i++){
				var tmp = aEle[i].className.split(' ');
				if(findInArr(sClass,tmp)){
					arr2.push(aEle[i]);
				}
			}
			return arr2;
		}
	}
	
	// 整体选项卡滑动效果
	(function(){
		var oBox=document.getElementById('box');
		var aLi=getByClass(document,'page');
		var aBtn=getByClass(document,'tab');
		var bFlag=false;
		var iNow=0;
		var width=1366;
		function next(){
		    if(bFlag)return;
		    bFlag=true;
		    move(aLi[iNow], {left: -width});
		    iNow++;
		    if(iNow>aLi.length-1){
		        iNow=0;
		    }
		    aLi[iNow].style.left=width+'px';
		    move(aLi[iNow], {left: 0},{
		        complete:function(){
		            bFlag=false;
		        }
		    });
		    tab();
		}
		function prev(){
		    if(bFlag)return;
		    bFlag=true;
		    move(aLi[iNow], {left: width});
		    iNow--;
		    if(iNow<0){
		        iNow=aLi.length-1;
		    }
		    aLi[iNow].style.left=-width+'px';
		    move(aLi[iNow], {left: 0},{
		        complete:function(){
		            bFlag=false;
		        }
		    });
		    tab();
		}
		function tab(){
		    for(var i=0; i<aBtn.length; i++){
		        aBtn[i].className='tab';
		    }
		    aBtn[iNow].className='tab tabActive';
		}
		// 点击按钮翻页效果
		for(var i=0; i<aBtn.length; i++){
		    aBtn[i].index=i;
		    aBtn[i].onclick=function(){
		        // 左边
		        if(this.index<iNow){
		            move(aLi[iNow], {left: width});
		            aLi[this.index].style.left=-width+'px';
		            move(aLi[this.index], {left: 0});
		        // 右边
		        }else if(this.index>iNow){
		            move(aLi[iNow], {left: -width});
		            aLi[this.index].style.left=width+'px';
		            move(aLi[this.index], {left: 0});
		        }
		        iNow=this.index;
		        tab();
		    };
		}
		// 滚轮翻页效果
		function addWheel(obj, fn){
		    function wheel(ev){
		        var oEvent=ev || event;
		        var bDown=true;
		        if(oEvent.wheelDelta){
		            if(oEvent.wheelDelta>0){
		                bDown=false;
		            }else{
		                bDown=true;
		            }
		        }else{
		            if(oEvent.detail<0){
		                bDown=false;
		            }else{
		                bDown=true;
		            }
		        }
		        fn && fn(bDown);    
		        oEvent.preventDefault && oEvent.preventDefault();
		        return false;
		    }

		    if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		        obj.addEventListener('DOMMouseScroll', wheel, false);
		    }else {
		        obj.onmousewheel = wheel;
		    }
		}
		addWheel(document, function(bDown){
		    if(bDown){
		        next()
		    }else{
		        prev();
		    }
		});
		// 导航翻页效果
		var aNav=document.getElementById('nav');
		var aNavUl=aNav.getElementsByTagName('ul')[0];
		var aNavLi=aNavUl.children;
		for(var i=0;i<aNavLi.length;i++){
		    aNavLi[i].index=i+1;
		    aNavLi[i].onclick=function(){
		        // 左边
		        if(this.index<iNow){
		            move(aLi[iNow], {left: width});
		            aLi[this.index].style.left=-width+'px';
		            move(aLi[this.index], {left: 0});
		        // 右边
		        }else if(this.index>iNow){
		            move(aLi[iNow], {left: -width});
		            aLi[this.index].style.left=width+'px';
		            move(aLi[this.index], {left: 0});
		        }
		        iNow=this.index;
		        tab();
		    };
		}
		// 键盘翻页效果
		document.onkeydown=function(ev){
			var oEvent=ev||event;
			if(oEvent.keyCode==37){
				prev();
				return false;
			}
			// 向右
			if(oEvent.keyCode==39){
				next();
				return false;
			}
		}
	})();
	 // nav导航栏效果
	(function(){
		var oNav_div=document.getElementById('nav_div');
		var oNav_t=oNav_div.children[0];
		var oNav_r=oNav_div.children[1];
		var oNav_b=oNav_div.children[2];
		var oNav_l=oNav_div.children[3];
		var oNav=document.getElementById('nav');
		var aNavA=oNav.getElementsByTagName('a');
		var aNavLi=oNav.getElementsByTagName('li');
		for(var i=0;i<aNavA.length;i++){
			;(function(index){
				aNavA[i].onmouseenter=function(){
					oNav_t.style.left=-100+'px';
					oNav_r.style.top=-40+'px';
					oNav_b.style.left=100+'px';
					oNav_l.style.top=40+'px';
					oNav_div.style.left=15+130*(index)+'px';
					oNav_div.style.display='block';
					move(oNav_t,{left:0},{duration:800})
					move(oNav_r,{top:0},{duration:800})
					move(oNav_b,{left:0},{duration:800})
					move(oNav_l,{top:0},{duration:800})
				}
			})(i);
		}
		for(var i=0;i<aNavA.length;i++){
			aNavA[i].onmouseleave=function(){
				oNav_t.style.left=-100+'px';
				oNav_r.style.top=-40+'px';
				oNav_b.style.left=100+'px';
				oNav_l.style.top=40+'px';
				oNav_div.style.display='none';
			}
		}

	})();
	// person效果
	(function(){
		var oBanner=document.getElementById('banner');
		var oP=document.getElementById('person');
		var oI=oBanner.getElementsByTagName('i')[0];
		move(oI,{opacity:0.9},{duration:600,complete:function(){
			doMove(oI,{top:240},{duration:1500,easing:Tween.Elastic.easeOut,complete:function(){
				move(oP,{opacity:0.9},{duration:2000})
			}})
		}})
	})();
	// resume效果
	// works跟随鼠标滑动效果
	(function(){
			var oWorks=document.getElementById('works');
			var aWLi=oWorks.getElementsByTagName('li');
			function getDis(obj){
				var l=0;
				var t=0;
				while(obj){
					l+=obj.offsetLeft;
					t+=obj.offsetTop;
					obj=obj.offsetParent;
				}
				return {left:l,top:t}
			}
			function hoverDir(obj,ev){
		        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		        var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
				var x=getDis(obj).left-scrollLeft+obj.offsetWidth/2-ev.clientX;
				var y=getDis(obj).top-scrollTop+obj.offsetHeight/2-ev.clientY;
				return Math.round((Math.atan2(y, x)*180/Math.PI+180)/90)%4;
			}
			for(var i=0; i<aWLi.length; i++){
			    aWLi[i].onmouseenter=function(ev){
			        var oEvent=ev || event;
			        var n=hoverDir(this, oEvent);
			        var oA=this.children[0];
			        switch(n){
			            case 0:
			                oA.style.left='180px';
			                oA.style.top=0;
			                break;
			            case 1:
			                oA.style.left=0;
			                oA.style.top='180px';
			                break;
			            case 2:
			                oA.style.left='-180px';
			                oA.style.top=0;
			                break;
			            case 3:
			                oA.style.left=0;
			                oA.style.top='-180px';
			                break;
			        }
			        move(oA, {left: 0, top: 0},{duration:600});
			    };
			    aWLi[i].onmouseleave=function(ev){
			        var oEvent=ev || event;
			        var n=hoverDir(this, oEvent);

			        var oA=this.children[0];
			        switch(n){
			            case 0:
			                move(oA, {left: 180, top: 0},{duration:600});
			                break;
			            case 1:
			                move(oA, {left: 0, top: 180},{duration:600});
			                break;
			            case 2:
			                move(oA, {left: -180, top: 0},{duration:600});
			                break;
			            case 3:
			                move(oA, {left: 0, top: -180},{duration:600});
			                break;
			        }
			    };
			}
	})();
	
	
}
