window.onload = function(){
	//检查Id是否有重复
	function reset(){
		var all = document.getElementsByTagName('*');
		var arr = [];
		var arr2 = [];
		for(var i=0;i<all.length;i++){
			if(all[i].id){
				arr.push(all[i].id)
			}	
		}
		for(var i=0;i<arr.length;i++){
			for(var j=i+1;j<arr.length;j++){
				if(arr[i] == arr[j]){
					arr2.push(arr[j])
				}
			}
		}
		//空数组是true
		//return arr2;
		return arr2.length?true:false;
	}
	//console.log(reset())
	
	//检测滚动距离
	window.onscroll = function(){
		fileLoad.scrollY = window.pageYOffset;
	}
	function getPos(obj){
		var left = 0;
		var top1 = 0;
		var bL = 0,bT = 0;
		while(obj){
			bL = isNaN(bL)?0:bL;
			bT = isNaN(bT)?0:bT;
			left+=obj.offsetLeft+bL;
			top1+=obj.offsetTop+bT;
			obj = obj.offsetParent;
			if(obj){
				bL = parseInt(getStyle(obj,'borderLeftWidth'));
				bT = parseInt(getStyle(obj,'borderTopWidth'));
			}
		}
		return {
			l:left,
			t:top1
		};
	}
	function getStyle(obj,attr){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
	}

	//重置location
	history.replaceState(null,'',location.pathname+location.search);
	
	//头部
	function TopBox(){
		this.navBox = document.getElementById('navs_box');
		this.navList = document.getElementById('navs_list');
		this.navItem = this.navBox.getElementsByClassName('navs_item')[0];
		this.arrIcon = this.navBox.getElementsByClassName('arr_icon')[0];
		this.headUser = document.getElementById('head_user');
		this.userList = document.getElementById('user_list');
		this.more = document.getElementById('more');
		this.moreList = document.getElementById('more_list');
		this.navsDisk = document.getElementById('navs_disk');
		this.asideDisk = document.getElementById('aside_disk');
		this.register = document.getElementById('register');
		this.main = document.getElementById('main');
		this.mainDisk = document.getElementById('main_disk');
		this.homePage = document.getElementById('homepage');
		this.logo = document.getElementById('logo');
	}
	TopBox.prototype.init = function(){
		topBox.diskHover();
		topBox.userHover();
		topBox.moreHover();
		topBox.deskIn();
	}
	//	网盘入口
	TopBox.prototype.deskIn = function(){
		var _this = this;
		this.str = localStorage.getItem('user');
		this.navsDisk.onclick = this.asideDisk.onclick = function(){
			if(_this.str){
				_this.register.className = 'hide';
				_this.mainDisk.className = 'show';
				_this.main.className = 'hide';
					window.location.hash = 'view=grid&path=';
					fileLoad.init();	
			}else{
				alert('请先登录')
			}
		}
		//主页
		this.logo.onclick = this.homePage.onclick = function(){
			if(_this.str){
				_this.register.className = 'hide';
				_this.mainDisk.className = 'hide';
				_this.main.className = 'show';
			}else{
				_this.register.className = 'show';
				_this.mainDisk.className = 'hide';
				_this.main.className = 'hide';
			}
		}
	}
	//	头部导航网盘hover
	TopBox.prototype.diskHover = function(){
		var _this = this;
		this.navBox.onmouseover = function(){
			_this.navList.className = 'show';
			_this.navItem.className = 'navs_item hover';
			_this.arrIcon.className = 'sprite arr_icon up';
		}
		this.navBox.onmouseout = function(){
			_this.navList.className = 'hide';
			_this.navItem.className = 'navs_item';
			_this.arrIcon.className = 'sprite arr_icon';
		}	
	}
	//	头部用户名hover
	TopBox.prototype.userHover = function(){
		var _this = this;
		this.headUser.onmouseover = function(){
			_this.userList.className = 'show';
		}
		this.headUser.onmouseout = function(){
			_this.userList.className = 'hide';
		}
	}
	//	头部更多hover
	TopBox.prototype.moreHover = function(){
		var _this = this;
		this.more.onmouseover = function(){
			_this.moreList.className = 'show';
		}
		this.more.onmouseout = function(){
			_this.moreList.className = 'hide';
		}
	}
	var topBox = new TopBox();
	topBox.init();
	
//	登陆，退出按钮
	function LoginBtn(){
		this.loginBtn = document.getElementById('login_btn');
		this.userId = document.getElementById('user_id');
		this.passWord = document.getElementById('password_name');
		this.register = document.getElementById('register');
		this.main = document.getElementById('main');
		this.errorText = document.getElementById('errortext');
		this.headPro = document.getElementById('head_pro');
		this.headUser = document.getElementById('head_user');
		this.mainDisk = document.getElementById('main_disk');
		this.userName = document.getElementById('user_name');
		this.esc = document.getElementById('esc');
		this.loginWrap = document.getElementById('login_wrap');
		this.hint = this.loginWrap.getElementsByClassName('hint')[0];
		this.str = '';
	}
	LoginBtn.prototype.init = function(){
		loginBtn.click();
		loginBtn.login();
		loginBtn.exit();
		loginBtn.message();
	}
	LoginBtn.prototype.click = function(){
		var _this = this;
		this.loginBtn.onclick = function(){
			_this.errorText.innerHTML = '';
			_this.test();
		}
	}
	//账户密码提示信息
	LoginBtn.prototype.message = function(){
		var _this = this;
		this.loginWrap.onmouseover = function(){
			_this.hint.style.display = 'block';
		}
	}
	//验证
	LoginBtn.prototype.test = function(){
		var id = this.userId.value.trim();
		var pass = this.passWord.value.trim();
		var arr = user;
		var y = false;
		if(!id){
			this.errorText.innerHTML = '请您填写手机/邮箱/用户名';
			return;
		}else if(!pass){
			this.errorText.innerHTML = '请您填写密码';
			return;
		}
		if(!y){
			this.errorText.innerHTML = '您输入的帐号不存在';
		}
		for(var i=0;i<arr.length;i++){
			var json = arr[i];
			if(json){
				for(var key in json){
					if(key == 'account'){
						if(id == json[key]){
							y = true;
							for(var attr in json){
								if(attr == 'key'){
									if(pass == json[attr]){
										this.errorText.innerHTML = '';
										for(var tar in json){
											if(tar == 'id' ){
												document.cookie = 'user = '+json[tar];
											}else if(tar == 'name'){
												this.str = json[tar];
												localStorage.setItem('user',this.str);
											}
										}
										window.location.reload();
									}else{
										y = false;
										this.errorText.innerHTML = '密码错误';
									}
								}
							}		
						}		
					}
				}
			}
		}
	}
	//登录
	LoginBtn.prototype.login = function(){
		this.str = localStorage.getItem('user');
		if(this.str){
			this.userName.innerHTML = this.str;
			this.register.className = 'hide';
			this.mainDisk.className = 'hide';
			this.main.className = 'show';
			this.headPro.className = 'info_item show';
			this.headUser.className = 'info_item show';
			this.hint.style.display = 'none';
		}	
	}
	//退出
	LoginBtn.prototype.exit = function(){
		var _this = this;
		this.esc.onclick = function(){
			_this.register.className = 'show';
			_this.mainDisk.className = 'hide';
			_this.main.className = 'hide';
			_this.headPro.className = 'info_item hide';
			_this.headUser.className = 'info_item hide';
			localStorage.clear();
			window.location.reload();
		}
	}
	var loginBtn = new LoginBtn();
	loginBtn.init();
	
//	主页边栏hover
	function AsidePage(){
		 this.asidePage = document.getElementById('aside_page');
		 this.aLi = this.asidePage.getElementsByClassName('page_item');
	}
	AsidePage.prototype.init = function(){
		asidePage.hover();
	}
	AsidePage.prototype.hover = function(){
		var _this = this;
		for(var i=0;i<this.aLi.length;i++){
			this.aLi[i].onmouseover = function(){
				this.style.background = '#303030';
				var oEm = this.getElementsByClassName('icon')[0];
				oEm.className = 'sprite icon hover';
			}
			this.aLi[i].onmouseout = function(){
				this.style.background = '';
				var oEm = this.getElementsByClassName('icon')[0];
				oEm.className = 'sprite icon';
			}
		}
	}
	var asidePage = new AsidePage();
	asidePage.init();
	
//	分享栏hover
	function ShareBox(){
		this.shareBox = document.getElementById('share_box');
		this.aLi = this.shareBox.getElementsByTagName('li'); 
	}
	ShareBox.prototype.init = function(){
		shareBox.hover();
	}	
	ShareBox.prototype.hover = function(){
		var _this = this;
		for(var i=0;i<this.aLi.length;i++){
			this.aLi[i].onmouseover = function(){
				var oIcon = this.getElementsByClassName('icon')[0];
				var oText = this.getElementsByClassName('text')[0];
				oIcon.style.top = '-3px';
				oText.style.color = '#06c';
				
			}
			this.aLi[i].onmouseout = function(){
				var oIcon = this.getElementsByClassName('icon')[0];
				var oText = this.getElementsByClassName('text')[0];
				oIcon.style.top = '';
				oText.style.color = '';
			}
		}
	}
	var shareBox = new ShareBox();
	shareBox.init();
	
//	主页内中间导航hover
	function MainNav(){
		this.mainNav = document.getElementById('main_nav');
		this.item = this.mainNav.getElementsByClassName('item');
		this.line = this.mainNav.getElementsByClassName('line')[0];
	}
	MainNav.prototype.init = function(){
		mainNav.hover();
	}
	MainNav.prototype.hover = function(){
		var _this =this;
		for(var i=0;i<this.item.length;i++){
			this.item[i].onmouseover = function(){
				var oA = this.getElementsByTagName('a')[0];
				_this.line.style.left = this.offsetLeft +'px';
				oA.style.color = '#db5555';
			}
			this.item[i].onmouseout = function(){
				var oA = this.getElementsByTagName('a')[0];
				oA.style.color = '';
			}
		}
	}
	var mainNav = new MainNav();
	mainNav.init();

//	热门资源
	function Hot(){
		this.hotPages = document.getElementById('hot_pages');
		this.hotBox = document.getElementById('hot_box');
		this.timer = null;
		this.index = 0;
		this.data = hot_data;
	}
	Hot.prototype.init = function(){
		hot.load();
	}
	Hot.prototype.load = function(){
		this.hotPages.innerHTML = '';
		this.hotBox.innerHTML = '';
		for(var i=0;i<this.data.length;i++){
			var json = this.data[i];
			var oDiv = document.createElement('div');
			var oA1 = document.createElement('a');
			var oA2 = document.createElement('a');
			var oImg = document.createElement('img');
			var oLi = document.createElement('li');
			oDiv.className = 'hot_item';
			oA1.className = 'title';
			oA2.className = 'pic';
			oLi.className = 'item';
			if(i==0){
				oLi.className = 'item active';
			}
			for(var key in json){
				if(key == 'num'){
					oLi.innerHTML = json[key];
					this.hotPages.appendChild(oLi);
				}else if(key == 'title'){
					oA1.innerHTML = json[key];
					oDiv.appendChild(oA1);
				}else if(key == 'src'){
					oImg.src = json[key];
					oA2.appendChild(oImg);
					oDiv.appendChild(oA2);
				}
			}
			this.hotBox.appendChild(oDiv);
		}
		hot.play();
	}
	//热门资源点击切换
	Hot.prototype.play = function(){
		this.aLi = this.hotPages.getElementsByClassName('item');
		this.aDiv = this.hotBox.getElementsByClassName('hot_item');
		this.hotContent = document.getElementById('hot_content'); 
		this.oW = this.aDiv[0].offsetWidth;
		var _this = this;
		for(var i=0;i<this.aLi.length;i++){
			this.aLi[i].index = i;
			this.aLi[i].onclick = function(){
				_this.index = this.index;
				hot.autoPlay()
			}
		}
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			_this.index++;
			hot.autoPlay()	
		},3000);
		this.hotContent.onmouseover = function(){
			clearInterval(_this.timer);
		}
		this.hotContent.onmouseout = function(){
			_this.timer = setInterval(function(){
				_this.index++;
				hot.autoPlay()	
			},3000);
		}
	}
	//热门资源自动轮播
	Hot.prototype.autoPlay = function(){
		if(this.index == 0){
			this.aDiv[0].style.position = 'static';
		}
		if(this.index == this.aDiv.length-1){
			this.aDiv[this.aDiv.length-1].style.position = 'static';
		}
		
		if(this.index == this.aDiv.length){
			this.aDiv[0].style.position = 'relative';
			this.aDiv[0].style.left = this.oW * this.aDiv.length + 'px';
		}
		if(this.index > this.aDiv.length){
			this.aDiv[0].style.position = 'static';
			this.hotBox.style.left = 0;
			this.index = 1;
		}
		if(this.index == -1){
			this.aDiv[this.aDiv.length-1].style.position = 'relative';
			this.aDiv[aDiv.length-1].style.left = -this.oW * this.aDiv.length-1+'px';
		}
		if(this.index < -1){
			this.aDiv[this.aDiv.length-1].style.position = 'static';
			this.hotBox.style.left = -this.oW * (this.aDiv.length-1)+'px';
			this.index = this.aDiv.length-2;
		}
		for(var i=0;i<this.aLi.length;i++){
			this.aLi[i].className = 'item';
		}
		this.aLi[(this.aLi.length + this.index) % this.aDiv.length].className = 'item active';
		move(this.hotBox,500,{
			left : -this.index * this.oW
		});
	}
	var hot = new Hot();
	hot.init();
	
//	猜你喜欢
    function GuessLike(){
    	this.guessContent = document.getElementById('guess_content');
    	this.guessHead = document.getElementById('guess_head');
    	this.change = this.guessHead.getElementsByClassName('change')[0];
    	this.num = 0;
    	this.like = like_data;
    }
    GuessLike.prototype.init = function(){
    	guessLike.load();
    	guessLike.tab();
    }
    GuessLike.prototype.tab = function(){
    	var _this = this;
    	this.change.onclick = function(){
    		_this.num += 4;
    		guessLike.load();
    		if(_this.num == _this.like.length-4){
	    		_this.num = -4;
	    	}
    	}
    }
    GuessLike.prototype.load = function(){
    	this.guessContent.innerHTML = '';
    	for(var i=this.num ;i<this.num+4;i++){
    		var json = this.like[i];
    		var oLi = document.createElement('li');
    		var oDiv = document.createElement('div');
    		var oA1 = document.createElement('a');
    		var oA2 = document.createElement('a');
    		var oA3 = document.createElement('a');
    		var oEm = document.createElement('em');
    		var oSpan1 = document.createElement('span');
    		var oSpan2 = document.createElement('span');
    		var oP = document.createElement('p');
    		var oImg = document.createElement('img');
    		oLi.className = 'item f_lt';
    		oA1.className = 'pic f_lt';
    		oDiv.className = 'title f_lt';
    		oA2.className = 'name';
    		oA3.className = 'unfollow';
    		oSpan1.className = 'follow';
    		oSpan1.innerHTML = '订阅';
    		oSpan2.className = 'defollow';
    		oSpan2.innerHTML = '取消';
    		oP.className = 'info';
    		for(var key in json){
    			if(key == 'title'){
    				oA2.innerHTML = json[key];
    			}else if(key == 'src'){
    				oImg.src = json[key];
    			}else if(key == 'info'){
    				oP.innerHTML = json[key];
    			}
    		}
    		this.guessContent.appendChild(oLi);
    		oLi.appendChild(oA1);
    		oLi.appendChild(oDiv);
    		oLi.appendChild(oP);
    		oA1.appendChild(oImg);
    		oDiv.appendChild(oA2);
    		oDiv.appendChild(oA3);
    		oA3.appendChild(oEm);
    		oA3.appendChild(oSpan1);
    		oA3.appendChild(oSpan1);
    	}
    }
	var guessLike = new GuessLike();
	guessLike.init();
	
	//文件夹
	function FileLoad(){
		this.diskList = document.getElementById('disk_list');
		this.diskHead = document.getElementById('disk_head');
		this.listView = this.diskHead.getElementsByClassName('list_switch')[0];
		this.gridView = this.diskHead.getElementsByClassName('grid_switch')[0];
		this.total = this.diskList.getElementsByClassName('total')[0];
		this.listArea = document.getElementById('list_area');
		this.listViewBox = this.listArea.getElementsByClassName('list_view_box')[0];
		this.gridViewBox = this.listArea.getElementsByClassName('grid_view_box')[0];
		this.gridViewItem = this.gridViewBox.getElementsByClassName('grid_view_item');
		this.gridIcon= this.gridViewBox.getElementsByClassName('file_icon');
		this.listViewItem = this.listViewBox.getElementsByClassName('list_view_item');
		this.listHead = document.getElementsByClassName('list_head')[0];
		this.allChecked = this.listHead.getElementsByClassName('checked_icon')[0];
		this.fileRtBtn = document.getElementById('file_rtBtn');
		this.fileLook = this.fileRtBtn.getElementsByTagName('li')[0];
		this.fileLookList = this.fileLook.getElementsByTagName('ul')[0];
		this.listBtn = this.fileLookList.getElementsByTagName('li')[0];
		this.gridBtn = this.fileLookList.getElementsByTagName('li')[1];
		this.creat = this.diskHead.getElementsByClassName('creat')[0].getElementsByTagName('a')[0];
		this.rtCreat = this.fileRtBtn.getElementsByClassName('item')[6];
		this.fixText = document.getElementById('fix_text');
		this.fixInput= this.fixText.getElementsByTagName('input')[0];
		this.sure = this.fixText.getElementsByClassName('sure')[0];
		this.cancel = this.fixText.getElementsByClassName('cancel')[0];
		this.fileOption = document.getElementById('file_option');
		this.optionItem = this.fileOption.getElementsByTagName('li');
		this.historyBox = this.diskList.getElementsByClassName('history_box')[0];
		this.lastBtn = this.historyBox.getElementsByTagName('a')[0];
		this.topBtn = this.historyBox.getElementsByTagName('a')[1];
		this.historyList = this.historyBox.getElementsByClassName('history_list')[0];
		this.checkShadow = document.getElementById('check_shadow');
		this.gridCheckBox = this.gridViewBox.getElementsByClassName('checkbox');
		this.listCheckBox = this.listViewBox.getElementsByClassName('checkbox');
		this.moveShadow = document.getElementById('move_shadow');
		this.hash = window.location.hash;
		this.hashView = '';
		this.fileData = file_data;
		this.scrollY = 0;
		this.historyArray = [];
	}
	FileLoad.prototype.init = function(){
		fileLoad.btns();
		fileLoad.rightMenu();
		fileLoad.listLoad(-1);
		fileLoad.gridLoad(-1);
		fileLoad.shadow();
	}
	//阴影框
	FileLoad.prototype.shadow = function(){
		var _this = this;
		this.scrollY = 0;
		this.listArea.onmousedown = function(ev){
			if(ev.button == 0){
				_this.x = ev.clientX - getPos(_this.listArea).l;
				_this.y = ev.clientY - getPos(_this.listArea).t;
				_this.checkShadow.style.display = 'block';
				ev.preventDefault();
				document.onmousemove = function(ev){
					_this.disX = ev.clientX - getPos(_this.listArea).l;
					_this.disY = ev.clientY - getPos(_this.listArea).t;
					if(_this.x > _this.disX && _this.y > _this.disY){//左上
						_this.checkShadow.style.top = _this.disY + _this.scrollY+ 'px';
						_this.checkShadow.style.left = _this.disX + 'px';
					}else if(_this.x < _this.disX && _this.y > _this.disY){//右上
						_this.checkShadow.style.top = _this.disY + _this.scrollY+ 'px';
						_this.checkShadow.style.left = _this.x + 'px';
					}else if(_this.x > _this.disX && _this.y < _this.disY){//左下
						_this.checkShadow.style.top = _this.y + _this.scrollY+ 'px';
						_this.checkShadow.style.left = _this.disX + 'px';
					}else if(_this.x < _this.disX && _this.y < _this.disY){//右下
						_this.checkShadow.style.top = _this.y + _this.scrollY+ 'px';
						_this.checkShadow.style.left = _this.x + 'px';
					}
					_this.checkShadow.style.width = Math.abs(_this.x - _this.disX) + 'px';
					_this.checkShadow.style.height = Math.abs(_this.y - _this.disY) + 'px';
					//console.log(_this.checkShadow.style.left,_this.checkShadow.style.top)
					if(_this.hashView == 'grid'){
						for(var i=0;i<_this.gridViewItem.length;i++){
							if(fileLoad.CheckDrag(_this.checkShadow,_this.gridViewItem[i])){
								_this.gridViewItem[i].className = 'grid_view_item follow';
							}
						}
					}
					if(_this.hashView == 'list'){
						for(var i=0;i<_this.listViewItem.length;i++){
							if(fileLoad.CheckDrag(_this.checkShadow,_this.listViewItem[i])){
								_this.listViewItem[i].className = 'list_view_item follow';
							}
						}
					}
					fileLoad.AllCheck();
				}
				document.onmouseup = function(){
					document.onmousemove = null;
					document.onmouseup = null;
					_this.x = null;
					_this.y = null;
					_this.disX = null;
					_this.disY = null;
					_this.checkShadow.style.width = '';
					_this.checkShadow.style.height = '';
					_this.checkShadow.style.top = '';
					_this.checkShadow.style.left = '';
					_this.checkShadow.style.display = 'none';
				}
			}
			return false;
		}
	}
	//检测全选
	FileLoad.prototype.AllCheck = function(){
		if(this.hashView == 'grid'){
			for(this.k=0;this.k<this.gridViewItem.length;this.k++){
				if(this.gridViewItem[this.k].className !='grid_view_item follow'){
					break;
				}
			}
			if(this.k == this.gridViewItem.length){
				this.allChecked.className = 'checked_icon all_follow';
			}else{
				this.allChecked.className = 'checked_icon';
			}
		}
		if(this.hashView == 'list'){
			for(this.j=0;this.j<this.listViewItem.length;this.j++){
				if(this.listViewItem[this.j].className !='list_view_item follow'){
					break;
				}
			}
			if(this.j == this.listViewItem.length){
				this.allChecked.className = 'checked_icon all_follow';
			}else{
				this.allChecked.className = 'checked_icon';
			}
		}
	}
	//文件夹框选阴影碰撞检测
	FileLoad.prototype.CheckDrag = function(obj,obj2){
		//阴影的上下左右的边。
		this.l1 = obj.offsetLeft;
		this.r1 = this.l1 + obj.offsetWidth;
		this.t1 = obj.offsetTop;
		this.b1 = this.t1 + obj.offsetHeight;
		//要被碰撞的上下左右边。
		this.l2 = obj2.offsetLeft;
		this.r2 = this.l2 + obj2.offsetWidth;
		this.t2 = obj2.offsetTop;
		this.b2 = this.t2 + obj2.offsetHeight;
		//没碰到
		if(this.r1 < this.l2 || this.b1 < this.t2 || this.r2 < this.l1 || this.t1 > this.b2){ 
			return false;
		}else{
			return true;
		}
	}
	//list渲染
	FileLoad.prototype.listLoad = function(index){
		this.hash = window.location.hash;
		this.hashView = this.hash.substring(this.hash.indexOf('&')-4,this.hash.indexOf('&'));
		this.listViewBox.innerHTML = '';
		this.fixText.className = 'listview';
		var str = this.hash.substring(this.hash.indexOf('path=')+5);
		if(str){
			var str2 = str.substring(str.lastIndexOf('/')+1);
			if(index != -1){
				this.fileData = this.fileData[index].data;
			}
		}
		for(var i=0;i<this.fileData.length;i++){
			var json = this.fileData[i];
			var oDiv = document.createElement('div');
			var oDiv2 = document.createElement('div');
			var oDiv3 = document.createElement('div');
			var oDiv4 = document.createElement('div');
			var oDiv5 = document.createElement('div');
			var oA = document.createElement('a');
			var oSpan = document.createElement('span');
			var oSpan2 = document.createElement('span');
			oDiv.className = 'list_view_item';
			oDiv2.className = 'file_name';
			oDiv3.className = 'file_size';
			oDiv4.className = 'time';
			oDiv5.className = 'text';
			oSpan.className = 'checkbox';
			oSpan2.className = 'file_icon';
			for(var key in json){
				if(key == 'name'){
					oA.innerHTML = json[key];
				}
			}
			this.listViewBox.appendChild(oDiv);
			oDiv.appendChild(oSpan);
			oDiv.appendChild(oSpan2);
			oDiv.appendChild(oDiv2);
			oDiv.appendChild(oDiv3);
			oDiv.appendChild(oDiv4);
			oDiv2.appendChild(oDiv5);
			oDiv5.appendChild(oA);
		}
		this.total.innerHTML = '已全部加载，共'+this.listViewItem.length+'个';
		this.allChecked.className = 'checked_icon';
		for(var i=0;i<this.listViewItem.length;i++){
			this.listViewItem[i].index = i;
		}
		fileLoad.click();
		if(this.historyArray.length !=0){
			this.historyBox.style.display = 'block';
		}else{
			this.historyBox.style.display = 'none';
		}
	}
	//grid渲染
	FileLoad.prototype.gridLoad = function(index){
		this.hash = window.location.hash;
		this.hashView = this.hash.substring(this.hash.indexOf('&')-4,this.hash.indexOf('&'));
		this.gridViewBox.innerHTML = '';
		this.fixText.className = 'gridview';
		var str = this.hash.substring(this.hash.indexOf('path=')+5);
		if(str){
			var str2 = str.substring(str.lastIndexOf('/')+1);
			if(index != -1){
				this.fileData = this.fileData[index].data;
			}
		}
		for(var i=0;i<this.fileData.length;i++){
			var json = this.fileData[i];
			var oDiv = document.createElement('div');
			var oDiv2 = document.createElement('div');
			var oDiv3 = document.createElement('div');
			var oSpan = document.createElement('span');
			oDiv.className = 'grid_view_item';
			oDiv2.className = 'file_icon';
			oDiv3.className = 'file_name';
			oSpan.className = 'checkbox';
			for(var key in json){
				if(key == 'name'){
					oDiv3.innerHTML = json[key];
				}
			}
			this.gridViewBox.appendChild(oDiv);
			oDiv.appendChild(oDiv2);
			oDiv.appendChild(oDiv3);
			oDiv2.appendChild(oSpan);
		}
		this.total.innerHTML = '已全部加载，共'+this.gridViewItem.length+'个';
		this.allChecked.className = 'checked_icon';
		for(var i=0;i<this.gridViewItem.length;i++){
			this.gridViewItem[i].index = i;
		}
		fileLoad.click();
		if(this.historyArray.length !=0){
			this.historyBox.style.display = 'block';
		}else{
			this.historyBox.style.display = 'none';
		}
	}
	//按钮点击
	FileLoad.prototype.btns = function(){
		var _this = this;
		//list按钮
		this.listView.onclick = function(){	
			fileLoad.listTab();
		}
		//grid按钮
		this.gridView.onclick = function(){
			fileLoad.gridTab();
		}
		//新建
		this.creat.onclick = function(){
			fileLoad.fileCreat();
		}
		//全选按钮
		this.allChecked.onclick = function(){
			if(this.className == 'checked_icon'){
				this.className = 'checked_icon all_follow';
				for(var i=0;i<_this.gridViewItem.length;i++){
					_this.gridViewItem[i].className = 'grid_view_item follow';
					_this.listViewItem[i].className = 'list_view_item follow';
					_this.gridViewItem[i].getElementsByClassName('checkbox')[0].style.display = 'block';
					_this.listViewItem[i].getElementsByClassName('checkbox')[0].style.display = 'block';
					
				}
			}else{
				this.className = 'checked_icon';
				for(var i=0;i<_this.gridViewItem.length;i++){
					_this.gridViewItem[i].className = 'grid_view_item';
					_this.listViewItem[i].className = 'list_view_item';
					_this.gridViewItem[i].getElementsByClassName('checkbox')[0].style.display = 'none';
					_this.gridViewItem[i].getElementsByClassName('file_icon')[0].style.border = '';
				}
			}
		}
		//返回上一级
		this.lastBtn.onclick = function(){
			_this.fileData = _this.historyArray[_this.historyArray.length-1];
			_this.historyArray.pop();
			var str = _this.hash.substring(0,_this.hash.lastIndexOf('/'));
			console.log(str)
			window.location.hash = str;
//			console.log(window.location.hash);
			fileLoad.listLoad(-1);
			fileLoad.gridLoad(-1);
		}
		//全部文件
		this.topBtn.onclick = function(){
			_this.fileData = _this.historyArray[0];
			_this.historyArray = [];
			window.location.hash = '#view=grid&path=';
			fileLoad.listLoad(-1);
			fileLoad.gridLoad(-1);	
		}
	}
	//list切换
	FileLoad.prototype.listTab = function(){
		window.location.hash = window.location.hash.split('grid').join('list');
		this.fileRtBtn.style.display = 'none';
		this.listViewBox.innerHTML = '';
		fileLoad.listLoad(-1);
		this.listViewBox.style.display = 'block';
		this.gridViewBox.style.display = 'none';
		this.listView.style.backgroundPosition = '0px 0px';
		this.gridView.style.backgroundPosition = 'right 0';
	}
	//grid切换
	FileLoad.prototype.gridTab = function(){
		window.location.hash = window.location.hash.split('list').join('grid');
		this.fileRtBtn.style.display = 'none';
		this.gridViewBox.innerHTML = '';
		fileLoad.gridLoad(-1);
		this.listViewBox.style.display = 'none';
		this.gridViewBox.style.display = 'block';
		this.listView.style.backgroundPosition = '0 -35px';
		this.gridView.style.backgroundPosition = '-32px -35px';
	}
	//文件夹操作
	FileLoad.prototype.click = function(){
		var _this = this;
		//grid单文件点击
		for(var i=0;i<this.gridViewItem.length;i++){
			//grid文件夹hover
			this.gridViewItem[i].onmouseenter = function(){
				var icon = this.getElementsByClassName('file_icon')[0];
				var chebox = this.getElementsByClassName('checkbox')[0];
				if(this.className == 'grid_view_item'){
					icon.style.border = '2px solid rgb(46, 128, 220)';
					chebox.style.display = 'block';
				}
			}
			this.gridViewItem[i].onmouseleave = function(){
				var icon = this.getElementsByClassName('file_icon')[0];
				var chebox = this.getElementsByClassName('checkbox')[0];
				if(this.className == 'grid_view_item'){
					chebox.style.display = 'none';
					icon.style.border = '';
				}
			}
			//grid文件夹点击
			this.gridViewItem[i].onmousedown = function(ev){
				var chebox = this.getElementsByClassName('checkbox')[0];
				var icon = this.getElementsByClassName('file_icon')[0];
				var This = this;
				var Tindex = this.index;
				_this.fileRtBtn.style.display = 'none';
				_this.fixText.style.display = 'none';
				if(ev.button == 0){
					if(ev.target.className == 'checkbox'){
						if(this.className == 'grid_view_item'){
							this.className = 'grid_view_item follow';
							chebox.style.display = 'block';
						}else{
							this.className = 'grid_view_item';
						}
					}else{
						if(this.className == 'grid_view_item follow'){
							ev.cancelBubble = true;
							ev.preventDefault();
							_this.Min2 = null;
							document.onmousemove = function(ev){
								_this.Mx = ev.clientX - getPos(_this.listArea).l;
								_this.My = ev.clientY - getPos(_this.listArea).t;
								_this.moveShadow.style.top = _this.My + _this.scrollY + 'px';
								_this.moveShadow.style.left = _this.Mx + 'px';
								_this.moveShadow.style.display = 'block';
								_this.Min = null;
								_this.MaxNumber = 999999;
								_this.DragArr = [];
								for(var i=0;i<_this.gridViewItem.length;i++){
									if(_this.gridViewItem[i] == This)continue;
									if(fileLoad.CheckDrag(_this.moveShadow,_this.gridViewItem[i])){
										_this.DragArr.push(_this.gridViewItem[i])
									}
								}
								for(var j=0;j<_this.DragArr.length;j++){
									var L = Math.abs(_this.moveShadow.offsetLeft - _this.DragArr[j].offsetLeft);
									var T = Math.abs(_this.moveShadow.offsetTop - _this.DragArr[j].offsetTop);
									var sqrt = Math.sqrt(L*L+T*T);
									if(_this.MaxNumber > sqrt){
										_this.MaxNumber = sqrt;
										_this.Min = _this.DragArr[j];
										//console.log(_this.MaxNumber,_this.DragArr);
									}
								}
								_this.Min2 = _this.Min;
							}
							document.onmouseup = function(){
								document.onmousemove = null;
								document.onmouseup = null;
								_this.Mx = null;
								_this.My = null;
								_this.moveShadow.style.top = '';
								_this.moveShadow.style.left = '';
								_this.moveShadow.style.display = 'none';
								//console.log(_this.Min2);
								if(_this.Min2){
									_this.fileData[_this.Min2.index].data.push(_this.fileData[This.index]);
									_this.fileData.splice(This.index,1);
									fileLoad.gridLoad(-1);
									fileLoad.listLoad(-1);
								}
							}
						}
					}
					
					_this.fileOption.style.display = 'none';	
				}
				if(ev.button == 2){
					ev.cancelBubble = true;
					for(var i=0;i<_this.gridViewItem.length;i++){
						var chebox = _this.gridViewItem[i].getElementsByClassName('checkbox')[0];
						var icon = _this.gridViewItem[i].getElementsByClassName('file_icon')[0];
						_this.gridViewItem[i].className = 'grid_view_item';
						chebox.style.display = 'none';
						icon.style.border = '';	
					}
					this.className = 'grid_view_item follow';
				}
				fileLoad.AllCheck();
				return false;
			}
			this.gridViewItem[i].onmouseup = function(ev){
				if(ev.button == 2){
					ev.cancelBubble = true;
					var x = ev.clientX - getPos(_this.listArea).l;
					var y = ev.clientY - getPos(_this.listArea).t;
					_this.fileOption.style.display = 'block';
					_this.fileOption.style.top = y + _this.scrollY + 'px';
					_this.fileOption.style.left = x + 'px';
					fileLoad.optionMenu(this);
				}
			}
			this.gridViewItem[i].ondblclick = function(ev){
				_this.historyArray.push(_this.fileData);
				console.log(_this.historyArray);
				var gridName = this.getElementsByClassName('file_name')[0].innerHTML;
				window.location.hash += '/'+gridName;
				fileLoad.gridLoad(this.index);
			}
		}
		
		//list单文件点击
		for(var i=0;i<this.listViewItem.length;i++){
			this.listViewItem[i].onmousedown = function(ev){
				//ev.cancelBubble = true;
				_this.fileRtBtn.style.display = 'none';
				_this.fixText.style.display = 'none';
				var This = this;
				var Tindex = this.index;
				_this.fileRtBtn.style.display = 'none';
				if(ev.button == 0){
					if(ev.target.className == 'checkbox'){
						if(this.className == 'list_view_item'){
							this.className = 'list_view_item follow';
						}else{
							this.className = 'list_view_item';
						}	
					}else{
						if(this.className == 'list_view_item follow'){
							ev.cancelBubble = true;
							ev.preventDefault();
							_this.Min2 = null;
							document.onmousemove = function(ev){
								_this.Mx = ev.clientX - getPos(_this.listArea).l;
								_this.My = ev.clientY - getPos(_this.listArea).t;
								_this.moveShadow.style.top = _this.My + _this.scrollY + 'px';
								_this.moveShadow.style.left = _this.Mx + 'px';
								_this.moveShadow.style.display = 'block';
								_this.Min = null;
								_this.MaxNumber = 999999;
								_this.DragArr = [];
								for(var i=0;i<_this.listViewItem.length;i++){
									if(_this.listViewItem[i] == This)continue;
									if(fileLoad.CheckDrag(_this.moveShadow,_this.listViewItem[i])){
										_this.DragArr.push(_this.listViewItem[i])
									}
								}
								for(var j=0;j<_this.DragArr.length;j++){
									var L = Math.abs(_this.moveShadow.offsetLeft - _this.DragArr[j].offsetLeft);
									var T = Math.abs(_this.moveShadow.offsetTop - _this.DragArr[j].offsetTop);
									var sqrt = Math.sqrt(L*L+T*T);
									if(_this.MaxNumber > sqrt){
										_this.MaxNumber = sqrt;
										_this.Min = _this.DragArr[j];
										//console.log(_this.MaxNumber,_this.DragArr);
									}
								}
								_this.Min2 = _this.Min;
							}
							document.onmouseup = function(){
								document.onmousemove = null;
								document.onmouseup = null;
								_this.Mx = null;
								_this.My = null;
								_this.moveShadow.style.top = '';
								_this.moveShadow.style.left = '';
								_this.moveShadow.style.display = 'none';
								if(_this.Min2){
									_this.fileData[_this.Min2.index].data.push(_this.fileData[This.index]);
									_this.fileData.splice(This.index,1);
									fileLoad.gridLoad(-1);
									fileLoad.listLoad(-1);
								}
							}
						}else{
							for(var i=0;i<_this.listViewItem.length;i++){
								_this.listViewItem[i].className = 'list_view_item';
							}
							this.className = 'list_view_item follow';
						}
					}
					_this.fileOption.style.display = 'none';
				}
				if(ev.button == 2){
					for(var i=0;i<_this.listViewItem.length;i++){
						_this.listViewItem[i].className = 'list_view_item';
					}
					this.className = 'list_view_item follow';
				}
				fileLoad.AllCheck();
				return false;
			}
			this.listViewItem[i].onmouseup = function(ev){
				if(ev.button == 2){
					ev.cancelBubble = true;
					var x = ev.clientX - getPos(_this.listArea).l;
					var y = ev.clientY - getPos(_this.listArea).t;
					_this.fileOption.style.display = 'block';
					_this.fileOption.style.top = y + 'px';
					_this.fileOption.style.left = x + 'px';
					fileLoad.optionMenu(this);
				}
			}
			this.listViewItem[i].ondblclick = function(ev){
				_this.historyArray.push(_this.fileData);
				var listName = this.getElementsByClassName('file_name')[0].getElementsByTagName('a')[0].innerHTML;
				window.location.hash += '/'+listName;
				fileLoad.listLoad(this.index);
			}
		}
	}
	//文件夹区域右键
	FileLoad.prototype.rightMenu = function(){
		var _this = this;
		//阻止系统右键菜单
		this.diskList.oncontextmenu = function(ev){
            ev.preventDefault();
         }
         //列表区域右键菜单
		this.diskList.onmouseup = function(ev){
			if(ev.button == 2){
				_this.fileRtBtn.style.display = 'block';
				var x = ev.clientX - _this.diskList.offsetLeft;
				var y = ev.clientY - _this.diskList.offsetTop + _this.scrollY;
				var disX = _this.diskList.offsetWidth/2;
				var disY = _this.diskList.offsetHeight/2;
				if(y < disY){
					_this.fileRtBtn.style.top = y + 'px';
				}else{
					_this.fileRtBtn.style.top = y - _this.fileRtBtn.offsetHeight + 'px';
				}
				if(x > _this.diskList.offsetWidth - _this.fileRtBtn.offsetWidth){
					_this.fileRtBtn.style.left = _this.diskList.offsetWidth - _this.fileRtBtn.offsetWidth+'px';
				}else{
					_this.fileRtBtn.style.left = x + 'px';
				}	
			}
			return false;
		}
		//右键查看
		this.fileLook.onmouseover = function(){
			_this.fileLookList.style.display = 'block';
		}
		this.fileLook.onmouseout = function(){
			_this.fileLookList.style.display = 'none';
		}
		//右键list切换
		this.listBtn.onclick = function(ev){
			ev.cancelBubble = true;
			fileLoad.listTab(ev);
		}
		//右键grid切换
		this.gridBtn.onclick = function(ev){
			ev.cancelBubble = true;
			fileLoad.gridTab(ev);
		}
		//右键新建
		this.rtCreat.onclick = function(){
			_this.fileRtBtn.style.display = 'none';
			fileLoad.fileCreat();	
		}
		//点击修改名字阻止冒泡
		this.fixText.onmousedown = function(ev){
			ev.cancelBubble = true;
		}
		//右键菜单关闭
		document.onmousedown = function(ev){
			if(ev.button == 2){
				_this.fixText.style.display = 'none';
				_this.fixInput.value = '';
				var g0text = _this.gridViewItem[0].getElementsByClassName('file_name')[0];
				var l0text = _this.listViewItem[0].getElementsByClassName('file_name')[0].getElementsByTagName('a')[0];
				if(!g0text.innerHTML || !l0text.innerHTML){
					_this.fileData.splice(0,1);
					fileLoad.gridLoad(-1);
					fileLoad.listLoad(-1);
				}
			}
			if(ev.target.parentNode.parentNode.id == 'file_rtBtn'){
				ev.cancelBubble = true;
			}else if(ev.target.className == 'item'){
				ev.cancelBubble = true;
			}else{
				_this.fileRtBtn.style.display = 'none';
			}
			if(ev.target.parentNode.parentNode.id == 'file_option'){
				ev.cancelBubble = true;
			}else{
				_this.fileOption.style.display = 'none';
			}
			return false;
		}
	}	
	//文件夹新建
	FileLoad.prototype.fileCreat = function( ){
		var jsonNull={
			"name":"",
			"data":[]
		};
		this.fileData.unshift(jsonNull);
		this.fileOption.style.display = 'block';
		if(this.hashView == 'grid'){
			var oDiv = document.createElement('div');
			var oDiv2 = document.createElement('div');
			var oDiv3 = document.createElement('div');
			var oSpan = document.createElement('span');
			oDiv.className = 'grid_view_item';
			oDiv2.className = 'file_icon';
			oDiv3.className = 'file_name';
			oSpan.className = 'checkbox';
			this.gridViewBox.insertBefore(oDiv,this.gridViewBox.children[0]);
			oDiv.appendChild(oDiv2);
			oDiv.appendChild(oDiv3);
			oDiv2.appendChild(oSpan);
			fileLoad.gridLoad(-1);
			fileLoad.fixName(this.gridViewItem[0]);
		}
		if(this.hashView == 'list'){
			var oDiv = document.createElement('div');
			var oDiv2 = document.createElement('div');
			var oDiv3 = document.createElement('div');
			var oDiv4 = document.createElement('div');
			var oDiv5 = document.createElement('div');
			var oA = document.createElement('a');
			var oSpan = document.createElement('span');
			var oSpan2 = document.createElement('span');
			oDiv.className = 'list_view_item';
			oDiv2.className = 'file_name';
			oDiv3.className = 'file_size';
			oDiv4.className = 'time';
			oDiv5.className = 'text';
			oSpan.className = 'checkbox';
			oSpan2.className = 'file_icon';
			this.listViewBox.insertBefore(oDiv,this.listViewBox.children[0]);
			oDiv.appendChild(oSpan);
			oDiv.appendChild(oSpan2);
			oDiv.appendChild(oDiv2);
			oDiv.appendChild(oDiv3);
			oDiv.appendChild(oDiv4);
			oDiv2.appendChild(oDiv5);
			oDiv5.appendChild(oA);
			fileLoad.listLoad(-1);
			fileLoad.fixName(this.listViewItem[0]);
		}
	}
	//文件右键选项菜单
	FileLoad.prototype.optionMenu = function(obj){
		var _this = this;
		//打开
		this.optionItem[0].onclick = function(){
			_this.historyArray.push(_this.fileData);
			if(_this.hashView == 'grid'){
				var gridName = obj.getElementsByClassName('file_name')[0].innerHTML;
				window.location.hash += '/'+gridName;
				fileLoad.gridLoad(obj.index);
			}
			if(_this.hashView == 'list'){
				var listName = obj.getElementsByClassName('file_name')[0].getElementsByTagName('a')[0].innerHTML;
				window.location.hash += '/'+listName;
				fileLoad.listLoad(obj.index);
			}
			_this.fileOption.style.display = 'none';	
		}
		//重命名
		this.optionItem[1].onclick = function(){
			fileLoad.fixName(obj);
		}
		//删除
		this.optionItem[2].onclick = function(){
			_this.fileData.splice(obj.index,1);
			fileLoad.gridLoad(-1);
			fileLoad.listLoad(-1);
			_this.fileOption.style.display = 'none';
		}
	}
	//修改名字
	FileLoad.prototype.fixName = function(obj){
		var _this = this;
		var gridName = obj.getElementsByClassName('file_name')[0];
		var listName = obj.getElementsByClassName('file_name')[0].getElementsByTagName('a')[0];
		obj.style.position = 'relative';
		if(this.hashView == 'grid'){
			this.fixInput.value = gridName.innerHTML;
		}
		if(this.hashView == 'list'){
			this.fixInput.value = listName.innerHTML;
		}
		this.fixText.style.display = 'block';
		this.fixText.style.left = obj.offsetLeft + 'px';
		this.fixText.style.top = obj.offsetTop + 'px';
		this.fixText.className = obj.className.substring(0,4)+'view';
		this.fileOption.style.display = 'none';
		//确定按钮
		this.sure.onclick = function(){
			if(_this.fixInput.value.trim()){
				for(var i=0;i<_this.fileData.length;i++){
					var chName = _this.fileData[i].name;
					if(_this.fixInput.value.trim() == chName){
						alert('名字重复');
						return;
					}
				}
				if(_this.hashView == 'list'){
					listName.innerHTML = _this.fixInput.value;
				}
				if(_this.hashView == 'grid'){
					gridName.innerHTML = _this.fixInput.value;
				}
				_this.fileData[obj.index].name = _this.fixInput.value.trim();
				_this.fixText.style.display = 'none';
				_this.fixInput.value = '';
			}else{
				alert('文件名不能为空');
			}	
		}
		//取消按钮
		this.cancel.onclick = function(){
			if(_this.hashView == 'grid'){
	            if(!gridName.innerHTML){
					_this.fileData.splice(obj.index,1);
					fileLoad.gridLoad(-1);	
				}
				_this.fixText.style.display = 'none';
				_this.fixInput.value = '';
			}
			if(_this.hashView == 'list'){
	            if(!listName.innerHTML){
					_this.fileData.splice(obj.index,1);
					fileLoad.listLoad(-1);
				}
				_this.fixText.style.display = 'none';
				_this.fixInput.value = '';
			}	
		}
	}
	var fileLoad = new FileLoad();	
}
