"use strict";

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

// анімація верхньої рекламної смуги
var topAdverty = document.getElementById("top-adverty");
topAdverty.insertAdjacentHTML("afterbegin", "<i></i>");
setTimeout(function () {
  topAdverty.classList.add("show");
}, 3000); // кнопка закриття рекламної стрічки

var topAdvertyClose = topAdverty.getElementsByTagName("i")[0];
topAdvertyClose.addEventListener("click", function () {
  topAdverty.classList.remove("show");
}); 

// https://github.com/lvivduncan/levus-nav
{
  // обгортка меню
  var menu = document.querySelector("#levus-menu"); // перевірка довжити усіх елементів

//   var allLis = document.querySelectorAll("#levus-menu ul");
//   console.log(allLis.children); 
  // перевіряємо, чи таке меню існує

  if (menu != null) {
    // перемикаємо меню
    var changeMenu = function changeMenu() {
      if (window.innerWidth < 1340) {
        menu.classList.remove("desktop");
        menu.classList.add("mobile");
      } else {
        menu.classList.remove("mobile");
        menu.classList.add("desktop");
      }
    }; // показуємо/ховаємо мобільне меню

    var showMenu = function showMenu() {
      if (menu.classList.contains("show")) {
        menu.classList.remove("show");
      } else {
        menu.classList.add("show");
      }
    }; // показати вкладені списки

    var showUl = function showUl(e) {
      e.stopPropagation();
      e.target.classList.contains("parent")
        ? this.classList.toggle("show")
        : "";
    };

    // обгортка для мобільного меню
    var wrapper = document.createElement("div");
    wrapper.className = "levus-wrapper"; // усі li в меню

    var lis = menu.querySelectorAll("li"); // додаємо клас для батьківського елемента

    lis.forEach(function (li) {
      return li.children.length > 1 ? (li.className = "parent") : "";
    }); // міняємо тип меню при зміні розміру вікна

    window.addEventListener("resize", changeMenu); // визначаємо при завантаженні сторінки

    changeMenu(); // додаємо елемент на сторінку

    menu.append(wrapper); // розкрити меню на мобільному

    wrapper.addEventListener("click", showMenu); // розкриваємо/ховаємо вкладені списки

    lis.forEach(function (li) {
      li.addEventListener("click", showUl);
    });
  }
} 

// https://github.com/lvivduncan/levus-onslide
var LevusOnslide = /*#__PURE__*/ (function () {
  function LevusOnslide(slider) {
    _classCallCheck(this, LevusOnslide);

    // слайдер
    this.slider = document.querySelector(slider); // слайди

    this.slides = this.slider.querySelectorAll("article"); // вліво

    this.left = this.slider.querySelector("#levus-left"); // вправо

    this.right = this.slider.querySelector("#levus-right"); // кількість слайдів

    this.length = this.slides.length - 1; // 1 слайд

    this.first = this.slides[0]; // лічильник

    this.cnt = 0;
  } // клік на кпоку вправо/вліво

  _createClass(LevusOnslide, [
    {
      key: "click",
      value: function click() {
        var _this = this;

        // клік на ліву
        this.left.addEventListener("click", function () {
          setTimeout(function () {
            _this.slides.forEach(function (slide) {
              return slide.removeAttribute("class");
            });

            _this.cnt < _this.length ? _this.cnt++ : (_this.cnt = 0);

            _this.slides[_this.cnt].classList.add("show");
          }, 500);
        }); // клік на праву кнопку

        this.right.addEventListener("click", function () {
          setTimeout(function () {
            _this.slides.forEach(function (slide) {
              return slide.removeAttribute("class");
            });

            _this.cnt === 0 ? (_this.cnt = _this.length) : _this.cnt--;

            _this.slides[_this.cnt].classList.add("show");
          }, 500);
        });
      }
    },
    {
      key: "arrow",
      value: function arrow() {
        var _this2 = this;

        // ховаємо
        this.left.classList.add("hide");
        this.right.classList.add("hide"); // показати стрілки при наведенні на слайдер

        this.slider.addEventListener("mouseover", function () {
          _this2.left.removeAttribute("class");

          _this2.right.removeAttribute("class");
        }); // сховати стрілки

        this.slider.addEventListener("mouseout", function () {
          _this2.left.classList.add("hide");

          _this2.right.classList.add("hide");
        });
      }
    },
    {
      key: "autoScroll",
      value: function autoScroll() {
        var _this3 = this;

        setInterval(function () {
          _this3.slides.forEach(function (slide) {
            return slide.removeAttribute("class");
          });

          _this3.cnt < _this3.length ? _this3.cnt++ : (_this3.cnt = 0);

          _this3.slides[_this3.cnt].classList.add("show");
        }, 8000);
      }
    },
    {
      key: "init",
      value: function init() {
        this.click(); // присвоюємо клас 1 елементу

        this.first.classList.add("show"); // показуємо стрілочки при завантаженні

        this.arrow(); // автоскрол на всі екранах

        this.autoScroll();
      }
    }
  ]);

  return LevusOnslide;
})();

new LevusOnslide("#levus-slider").init(); 

// https://github.com/lvivduncan/levus-horizontal-scroll
{
  // scroll
  var scroll = document.querySelectorAll(".levus-horizontal-scroll"); // if exists one scroll

  if (scroll.length === 1) {
    // wrapper
    var ul = scroll[0].querySelector(".levus-horizontal-scroll ul"); // nodelist

    var li = ul.querySelectorAll("li"); // if less than 5, cloned

    if (li.length <= 5) {
      // cloned and append elements
      li.forEach(function (element) {
        return ul.append(element.cloneNode(true));
      }); // new nodelist

      li = scroll[0].querySelectorAll(".levus-horizontal-scroll li");
    }

    scroll[0].innerHTML +=
      '<span class="left"></span><span class="right"></span>';
    scroll[0].addEventListener("click", function (e) {
      var ul = scroll[0].querySelector(".levus-horizontal-scroll ul");

      if (e.target.className == "left") {
        // move last element
        var last = ul.lastElementChild;
        ul.prepend(last); // destroy transition

        ul.style.transition = "none";
        ul.classList.add("to-right");
        setTimeout(function () {
          ul.classList.remove("to-right");
          ul.style.transition = ".5s";
        }, 50);
      }
    });
    scroll[0].addEventListener("click", function (e) {
      var ul = scroll[0].querySelector(".levus-horizontal-scroll ul");

      if (e.target.className == "right") {
        // move first element
        var first = ul.firstElementChild;
        ul.append(first); // destroy transition

        ul.style.transition = "none";
        ul.classList.add("to-left");
        setTimeout(function () {
          ul.classList.remove("to-left");
          ul.style.transition = ".5s";
        }, 50);
      }
    });
  } // if exists more than one scroll

  if (scroll.length > 1) {
    scroll.forEach(function (item) {
      var ul = item.querySelector(".levus-horizontal-scroll ul"); // elements

      var li = ul.querySelectorAll("li"); // if less than 5, cloned

      if (li.length <= 5) {
        // cloned and append elements
        li.forEach(function (element) {
          return ul.append(element.cloneNode(true));
        }); // new nodelist

        li = item.querySelectorAll(".levus-horizontal-scroll li");
      }

      item.innerHTML += '<span class="left"></span><span class="right"></span>';
      item.addEventListener("click", function (e) {
        var ul = item.querySelector(".levus-horizontal-scroll ul");

        if (e.target.className == "left") {
          // move last element
          var last = ul.lastElementChild;
          ul.prepend(last); // destroy transition

          ul.style.transition = "none";
          ul.classList.add("to-right");
          setTimeout(function () {
            ul.classList.remove("to-right");
            ul.style.transition = ".5s";
          }, 50);
        }
      });
      item.addEventListener("click", function (e) {
        var ul = item.querySelector(".levus-horizontal-scroll ul");

        if (e.target.className == "right") {
          // move first element
          var first = ul.firstElementChild;
          ul.append(first); // destroy transition

          ul.style.transition = "none";
          ul.classList.add("to-left");
          setTimeout(function () {
            ul.classList.remove("to-left");
            ul.style.transition = ".5s";
          }, 50);
        }
      });
    });
  }
}
