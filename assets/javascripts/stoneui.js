

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
					layer.open({ content: "没有找到表单地址",skin: 'msg',time: 2 });
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
				layer.open({ content: response.data.msg, skin: 'msg',time: 2 });
				setTimeout(function(){
					location.href = response.data.url;
				},response.data.seconds*1000);
			}else{
				layer.open({ content: response.data.msg, skin: 'msg',time: 2 });
			}
		})
		.catch(function (error) {
			layer.open({ content: error,skin: 'msg',time: 2 });
		});
	}
})();



/************************************************************************/
/******************************** 分割线 *********************************/
/************************************************************************/

/** 缩略图插件
* @author   ngtwewy <https://www.restfulapi.cn>
* @license  Apache 2
* @time     2018-10-14
*/

(function(){
	//所有缩略图绑定
	var thumbnailContainers = document.querySelectorAll(".thumbnail-panel");
  if (thumbnailContainers) {
		console.log("ssss: ", thumbnailContainers);
    thumbnailContainers.forEach(function (item) {
			console.log("item ", item);
      item.querySelector('.upload-button').addEventListener('click', thumbnailAction);
      item.querySelector('.delete-button').addEventListener('click', thumbnailDelete);
      //检测是否有缩略图，有的话, 显示缩略图，同时显示删除按钮
      if (item.querySelector('.input-hidden').value) {
				var imgUrl = item.querySelector('.project-thumbnail img').getAttribute("data-thumbnail") 
											+ item.querySelector('.input-hidden').value;
        item.querySelector('.project-thumbnail img').src = imgUrl;
        item.querySelector('.delete-button').style.display = 'block';
      }
    });
  }
  //上传按钮事件
  function thumbnailAction() {
    let fileInput = this.parentNode.querySelector("input[name='file'].upload-input");
    let url = fileInput.getAttribute("data-url");

    fileInput.click();
    fileInput.onchange = function () {
      if (!this.files[0] || this.files[0] == undefined) return;

      var fd = new FormData();
      fd.append("file", this.files[0]);
      // fd.append("project", 123);

      axios({
        method: 'post',
        url: url,
        data: fd,
        headers: { 'content-type': 'multipart/form-data' },
      }).then(function (response) {
        if (response.data.error == 0) {
          fileInput.parentNode.parentNode.querySelector('.input-hidden').value = response.data.data.thumbnail;
          fileInput.parentNode.parentNode.querySelector('.project-thumbnail img').src = response.data.data.url;
          fileInput.parentNode.parentNode.querySelector(".delete-button").style.display = 'block';
        }else{
          myAlert.show(response.data.msg, 'danger');
          fileInput.value="";
        }
      });
    }
  }

  //删除按钮事件
  function thumbnailDelete() {
    var thumbnail = this.parentNode.querySelector(".project-thumbnail img");
    thumbnail.src = thumbnail.getAttribute("data-nothumbnail");
    this.parentNode.parentNode.querySelector('.input-hidden').value = "";
    this.style.display = 'none';
  }
})();



/************************************************************************/
/******************************** 分割线 *********************************/
/************************************************************************/
/**
 * 上传图片列表
 */

 /**
  <div class="image-item">
      <input type="text" name="image_name[]" value="{$vo.name}" class="form-control">
      <input type="hidden" name="image_url[]" value="{$vo.url}" class="form-control">
      <img src="{$vo.url}">
      <a href="javascript:;" class="btn btn-warning image-btn-update">替换</a>
      <a href="javascript:;" class="btn btn-danger image-btn-delete">删除</a>
  </div>

  <a class="btn btn-primary btn-sm image-btn-add" href="javascript:;">添加图片</a>
  <input type="file" name="image_input" style="display:none;" data-url='{:url("asset/Image/uploadThumbnail")}'>
  */


 (function(){
  //上传按钮事件
  var imagesAction = function () {
    var that = this;
    let fileInput = this.parentNode.querySelector("input[name='image_input']");
    let url = fileInput.getAttribute("data-url");

    fileInput.click();
    fileInput.onchange = function () {
      if (!this.files[0] || this.files[0] == undefined) return;

      var fd = new FormData();
      fd.append("file", this.files[0]);

      axios({
        method: 'post',
        // url: url + '?resize=true',
        url: url,
        data: fd,
        headers: { 'content-type': 'multipart/form-data' },
      }).then(function (response) {
        if (response.data.error == 0) {
          var data = response.data.data;
          console.log(data);
          var image_item = '\
                <div class="image-item">\
                    <input type="text" name="image_name[]" var="" class="form-control">\
                    <input type="hidden" name="image_url[]" value="'+ data.thumbnail + '" class="form-control">\
                    <img src="'+ data.url + '">\
                    <a href="javascript:;" class="btn btn-warning image-btn-update">替换</a>\
                    <a href="javascript:;" class="btn btn-danger image-btn-delete">删除</a>\
                </div>\
                ';

          var ss = document.createElement("div");
          ss.innerHTML = image_item;
          var add_btn = that.parentNode.querySelector(".image-btn-add");
          add_btn.parentNode.insertBefore(ss, add_btn);
        } else {
          console.log("图片上传错误");
        }
      });
    }
  }
  var image_btn_add = document.querySelectorAll(".image-btn-add");
  if(image_btn_add){
    image_btn_add.forEach(function(btn){
      btn.addEventListener('click', imagesAction);
    });
  }
  

  // 删除
  var image_btn_delete = document.querySelectorAll(".image-btn-delete");
  image_btn_delete.forEach(function (btn) {
    btn.addEventListener('click', function () {
      console.log("del");
      this.parentNode.parentNode.removeChild(this.parentNode);
    });
  });

  // 修改
  //上传按钮事件
  var updateAction = function () {
    let fileInput = this.parentNode.parentNode.querySelector("input[name='image_input']");
    let url = fileInput.getAttribute("data-url");

    let image_name = this.parentNode.querySelector('input[type="text"]');
    let image_url = this.parentNode.querySelector('input[type="hidden"]');
    let img = this.parentNode.querySelector('img');

    fileInput.click();
    fileInput.onchange = function () {
      if (!this.files[0] || this.files[0] == undefined) return;

      var fd = new FormData();
      fd.append("file", this.files[0]);

      axios({
        method: 'post',
        url: url,
        data: fd,
        headers: { 'content-type': 'multipart/form-data' },
      }).then(function (response) {
        if (response.data.error == 0) {
          var data = response.data.data;
          console.log(data);
          img.src = data.url;
          image_url.value = data.thumbnail;
        } else {
          console.log("图片上传错误");
        }
      });
    }
  }
  // 删除
  var image_btn_update = document.querySelectorAll(".image-btn-update");
  if(image_btn_update){
    image_btn_update.forEach(function (btn) {
      btn.addEventListener('click', updateAction);
    });
  }
})();




