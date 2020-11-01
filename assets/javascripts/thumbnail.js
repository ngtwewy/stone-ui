/** 缩略图插件
* @author   ngtwewy <https://www.restfulapi.cn>
* @license  Apache 2
* @time     2018-10-14
*/

(function(){
  //上传按钮事件
  var thumbnailAction = function () {
    let fileInput = this.parentNode.parentNode.querySelector("input[name='file'].upload-input");
    let url = fileInput.getAttribute("data-url");

    fileInput.click();
    fileInput.onchange = function () {
      if (!this.files[0] || this.files[0] == undefined) return;

      var fd = new FormData();
      fd.append("file", this.files[0]);

      axios({
        method: 'get',
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
  var thumbnailDelete = function () {
    var thumbnail = this.parentNode.querySelector(".project-thumbnail img");
    thumbnail.src = thumbnail.getAttribute("data-nothumbnail");
    this.parentNode.querySelector('.input-hidden').value = "";
    this.style.display = 'none';
  }

  //所有缩略图绑定
  var thumbnailContainers = document.querySelectorAll(".thumbnail-container");
  if (thumbnailContainers) {
    thumbnailContainers.forEach(function (item) {
      item.querySelector('.upload-button').addEventListener('click', thumbnailAction);
      item.querySelector('.delete-button').addEventListener('click', thumbnailDelete);
      //检测是否有缩略图，有的话, 显示缩略图，同时显示删除按钮
      if (item.querySelector('.input-hidden').value) {
        var imgUrl = item.querySelector('.project-thumbnail img').getAttribute("data-thumbnail") + item.querySelector('.input-hidden').value;
        item.querySelector('.project-thumbnail img').src = imgUrl;
        item.querySelector('.delete-button').style.display = 'block';
      }
    });
  }
})();
