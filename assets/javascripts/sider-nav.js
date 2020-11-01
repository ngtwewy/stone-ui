/**
 * 控制面板左侧菜单
 *
 * @author ngtwewy <mail@restfulapi.cn>
 * @link https://restfulapi.cn
 */

(function(){
  var navs = document.querySelectorAll(".nav-list li a");

  navs.forEach(function (nav) {
    if (!nav.parentNode.children[1]) {
      return;
    }
    nav.addEventListener("click", function () {
      this.parentNode.classList.toggle("active");
      /*
      if (this.parentNode.classList.contains('active') == true) {
        // this.parentNode.children[1].style.display = "block";
        // this.querySelector(".arrow").classList.add("up");
        console.log("true");
      } else {
        // this.parentNode.children[1].style.display = "none";
        // this.querySelector(".arrow").classList.remove("up");
        console.log("false");
      }
      */
    });
  });
})();
