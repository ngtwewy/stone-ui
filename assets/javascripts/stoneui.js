

this.stoneUI = {};

/** 表单自动提交
* @author   ngtwewy <https://www.restfulapi.cn>
* @license  Apache 2
* @time     2018-09-21
*/


/* ============================================================================
 * 表单按钮操作
 */
(function(){
  //所有Ajax操作都依赖Axios, 对Axios初始化
  axios.defaults.headers['X-Requested-With'] = "XMLHttpRequest";
  axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  //获取所有表单
  var forms    = document.querySelectorAll(".ajax-form");
  if(!forms){
    return false;
  }
	//获取表单中的所有按钮，绑定事件
  forms.forEach(function(form){
    var buttons = form.querySelectorAll(".ajax-submit");
    buttons.forEach(function(button){
      button.onclick = function(){
				//按钮事件处理函数
				var formData  		= new FormData(form);
				var formAction		= form.getAttribute("action");
				var buttonAction  = button.getAttribute("data-action");
				var url = null;
				if(formAction){
					url = formAction;
				}else if(buttonAction){
					url = buttonAction;
				}else{
					myAlert.show("没有找到表单地址", 'danger');
					return false;
				}
				//有没有弹出信息
				if(this.getAttribute("data-msg")){
					console.log("data-msg: ", this.getAttribute("data-msg"));
					var options = {
						title:'提示',
						message: this.getAttribute("data-action"),
						button: [
							{
								value:'取消'
							},
							{
								value: '确定',
								callback: function () {
									myDialog.closeModal();
									ajaxAction(formData, url);
								},
								type:'primary'
							}
						]};
					myDialog.config(options).show( this.getAttribute("data-msg") );
				}else{
					ajaxAction(formData, url);
				}
				return false;
			}
    });
  });
  //ajax提交函数
	function ajaxAction(formData, url){
		axios({
			method: 'post',
			url: url,
			responseType: 'json',
			data: formData
		})
		.then(function (response) {
			console.log(response.data);
			if(response.data.code==1){
				myAlert.show(response.data.msg, 'success', response.data.url, response.data.seconds);
			}else{
				// myAlert.show(response.data.msg, 'danger', response.data.url, response.data.seconds);
				myAlert.show(response.data.msg, 'danger');
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}
})();




/*!
* Alert.js
*
* @author   ngtwewy <https://www.restfulapi.cn>
* @license  Apache 2
* @time     2018-09-21
*/

/* 生成如下Html，然后自动删除
<div class="alert alert-danger my-alert" role="alert">
  <a href="#" class="alert-link">
    依赖警告框 JavaScript 插件
  </a>
</div>
*/

(function () {
  var options = {
    message:'默认 message',
    type: 'alert-success',
    seconds: 3,
    url: null
	}
  
  //helper
	var getType = function(arg){
    var type;
	  switch(arg){
      case "success": type = "alert-success"; 
        break;
      case "info":    type = "alert-info"; 
        break;
      case "warning": type = "alert-warning"; 
        break;
      case "danger":  type = "alert-danger"; 
        break;
      default:        type = "alert-success"; 
    }
    return type;
  }
  
  var alertShow = function (msg, type, url, seconds) {
    //创建警告框
    var fragment = document.createDocumentFragment();
    var div = document.createElement("div");
    div.classList.add("alert");
    div.classList.add(getType(type));
    div.classList.add("my-alert");

    var text = document.createTextNode(msg);
    div.appendChild(text);
    fragment.appendChild(div);
    document.querySelector("body").appendChild(fragment);

    seconds = seconds ? seconds * 1000 : 2 * 1000;
    //隐藏警告框
    setTimeout(function () {
      div.classList.add("my-alert");
      div.classList.add("my-alert-hide");
    }, seconds);

    //删除警告框
    setTimeout(function () {
      document.querySelector("body").removeChild(div);
      // document.querySelectorAll(".my-alert").forEach(function (item) {
      //   document.querySelector("body").removeChild(item);
      // });
    }, seconds + 300);

    //跳转
    setTimeout(function () {
      if (url) {
        location.href = url;
      }
    }, seconds + 300);
  }

  //API
	var api = {
		config: function (opts) {
			if(!opts) return options;
			for(var key in opts) {
				options[key] = opts[key];
      }
			return this;
		},

		listen: function listen(elem) {
			if (typeof elem === 'string') {
				var elems = document.querySelectorAll(elem),
					      i = elems.length;
        while (i--) {
          listen(elems[i]);
        }
        return
			}
			return this;
		},

    show: function(msg, type, url, seconds){
      alertShow(msg, type, url, seconds);
    }
	}

	this.stoneUI.alert = api;
})();

