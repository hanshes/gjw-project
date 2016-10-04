
$(function(){
	//购酒网顶端（top+notice）代码
	var indexTop = {
		init:function(){
			//顶端左侧
			this.topBox = $('.topBox');
			this.topFocusUs = this.topBox.find('.topFocusUs');
			this.top2DCode = this.topBox.find('.top2DCode');
			this.erweima02 = this.topFocusUs.find('.icon-erweima');
			this.icon11 = this.topFocusUs.find('.icon-icon09');

			//顶端右侧
			this.userCenter = this.topBox.find(".userCenter");
			this.icon12 = this.topBox.find('.icon-icon12');
			this.userjsBox =  this.topBox.find('.user-jsBox');
			this.userCenterC = this.topBox.find('.userCenterC');

			//顶部大广告
			this.topAdvertBox = $('.topAdvertBox');
			this.topAdvertUp = this.topAdvertBox.find('.topAdvertUp');
			this.topAdvertSmallImg = this.topAdvertBox.find(".topad-small-img");

			//公告
			this.noticeBox = $('.noticeBox');
 			this.noticeClose = this.noticeBox.find('.noticeClose');

 			//搜索框 
 			this.topSearchTxt = $('.logoBox .top-sesarchTxt');
 			this.topSearchData = $('.logoBox .search-data');

 			//顶端购物车
 			this.topCart = $('.topCart');
 			this.topCartCon = this.topCart.find('.topCartCon');
 			this.topCartMenu = this.topCart.find('.topCartMenu');

			//二位码移除的1秒延时器
			this.timer = 0;

			this.topFocusUsHover();
			this.userCenterHover();
			this.topAdvert();
			this.noticeHide();
			this.topSearch();
			this.topCartHover();

		},
		//鼠标滑过滑出  顶部的关注
		topFocusUsHover:function(){
			var that = this;
			this.topFocusUs.hover(function(){		
				that.erweima02.removeClass('top-iconz1').addClass('top-iconz');//旋转
				that.icon11.removeClass('top-iconz1').addClass('top-iconz');
				that.topFocusUs.css({
					color:'#c40000',
					backgroundColor: 'white'
				});
				clearTimeout(that.timer);
				that.top2DCode.stop(true).show();
			},function(){
				that.erweima02.removeClass('top-iconz').addClass('top-iconz1');
				that.icon11.removeClass('top-iconz').addClass('top-iconz1');
				that.topFocusUs.css({
					color:'#656565',
					backgroundColor: ''
				});
				that.timer = setTimeout(function(){//一秒后消失
					that.top2DCode.stop(true).hide();
				}, 1000)		
			})
		},

		//用户中心鼠标滑过
		userCenterHover:function(){
			var that = this;
			this.userCenter.hover(function(){
				that.icon12.removeClass('top-iconz1').addClass('top-iconz');
				that.userjsBox.show();
				that.userCenterC.css({
					backgroundColor:"#fff",
					boxShadow: '0 0 1px rgba(0,0,0,0.3)'
				})
			},function(){
				that.icon12.removeClass('top-iconz').addClass('top-iconz1');
				
			});
			//解决滑出bug
			this.userCenter.on('mouseleave','.user-jsBox',function(){
				that.userjsBox.hide();
				that.userCenterC.css({
					backgroundColor:"",
					boxShadow:''
				})
			});
		},

		//顶部大广告
		topAdvert:function(){
			var that = this;
			this.topAdvertUp.click(function(){
				if( that.topAdvertUp.html() == "收起" ){
					
					that.topAdvertBox.stop(true).animate({//高度变高，小图出现
						height: 70
					},1000,function(){
						that.topAdvertUp.html("展开");
						that.topAdvertSmallImg.stop(true).animate({
							top: 0
						},500);
					});
				}else{//高度变小，小图下降，在变高
					
					that.topAdvertSmallImg.stop(true).animate({
							top: 270
						},500,function(){
							that.topAdvertUp.html("收起");
							that.topAdvertBox.stop(true).animate({
								height: 270
							},1000);
						});			
				}			
			});
		},

		//公告隐藏
		noticeHide:function(){
			var that = this;
			this.noticeClose.click(function(){
				that.noticeBox.slideUp(500);
			})
		},

		//搜索框搜索数据
		topSearch:function(){
			var that = this;
			//即时搜索事件绑定
			this.topSearchTxt.on( "input propertychange", function(){
				that.topSearchData.show();
				that.topSearchMouseEnter();
				var canTxt =  that.topSearchTxt.val() ;
				$.ajax({
					type:"GET",
					url:'http://suggestion.baidu.com/su',
					data: {
						wd:canTxt,
						cb:'searchDataHandle'//回调写在外面
					},
					dataType:'jsonp',
					success:function(){}				
				});
			});
		},
		//滑过变色
		topSearchMouseEnter:function(){
			var that = this;
			this.topSearchData.on("mouseenter","li",function(){
				$(this).addClass('topliactive').siblings().removeClass('topliactive');
			});
			$(document).click(function(e){
				if( !$(e.target).is(".logo-search form,.logo-search form *") ){
					that.topSearchData.hide();
				}
			})
		},

		//购物车的移入移出
		topCartHover:function(){
			var that = this;
			this.topCart.hover(function(){
				//移入
				that.topCart.addClass('topCartMenuactive');
				that.topCartCon.show();
			},function(){
				that.topCart.removeClass('topCartMenuactive');
				that.topCartCon.hide();
			});
		}
		
	}
	indexTop.init();
});


//对搜索的数据进行处理
function searchDataHandle(result){
	var temp = $('.search-data');
	var content = '';
	for(var i=0; i<result.s.length; i++){
		content += "<li><a href='#'>" + result.s[i] + "</a></li>";
	}
	if(result.s.length==0){
		temp.css({
			border: 0
		});
	}else{
		temp.css({
			border: "1px solid #ccc"
		});
	}
	temp.html(content);
}
