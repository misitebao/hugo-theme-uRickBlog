
"use strict";

//Variables
const MOBILE_POINT = 768;
const slideArrow = {
  nextArrow: `<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>`,
  prevArrow: `<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>`,
};
let currentCategoryLayout = "";

//==========================================
//  Utilities
//==========================================
function onMobileBreakpoint(less, than) {
  if (window.matchMedia(`(max-width: ${MOBILE_POINT}px)`).matches) {
    less();
  } else {
    than();
  }
}

function onResizeBreakpoint(less, than) {
  onMobileBreakpoint(less, than);
  $(window).on("resize", function () {
    onMobileBreakpoint(less, than);
  });
}

function clickOutSideElm(elm, callback) {
  $(document).mouseup(function (e) {
    var container = $(elm);
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      callback();
    }
  });
}
//==========================================
//==========================================

//Nav dropdown handle
function navDropdownHandle() {
  let header = $("header");
  let nav = $("header nav");

  function dropdownMenuMobileHandle() {
    if ($(".nav-item").children(".dropdown-menu__controller").length > 0) {
      return;
    }
    $(".nav-item:has(.dropdown-menu)").prepend(
      `<a href="#" class="dropdown-menu__controller"><i class="fas fa-plus"></i></a>`
    );

    $(".dropdown-menu__controller").on("click", function (e) {
      e.preventDefault();
      $(this)
        .parent()
        .siblings()
        .children(".dropdown-menu")
        .removeClass("show");
      $(this).siblings(".dropdown-menu").toggleClass("show");
      $(".dropdown-menu__controller i")
        .removeClass("fa-minus")
        .addClass("fa-plus");
      if ($(this).siblings(".dropdown-menu").hasClass("show")) {
        $(this).children().removeClass("fa-plus").addClass("fa-minus");
      } else {
        $(this).children().removeClass("fa-minus").addClass("fa-plus");
      }
    });
  }

  function dropdownMenuDesktopHandle() {
    $(".dropdown-menu__controller").remove();
    $(".dropdown-menu").removeClass("show");
  }

  //Mobile menu handle
  function menuMobileHandle() {
    header.addClass("is-mobile");
    nav.slideUp();
    dropdownMenuMobileHandle();
  }
  //Desktop menu handle
  function menuDesktopHandle() {
    header.removeClass("is-mobile");
    nav.removeAttr("style");
    dropdownMenuDesktopHandle();
  }

  onResizeBreakpoint(menuMobileHandle, menuDesktopHandle);

  (function () {
    $("#mobile-menu-controller").on("click", function (e) {
      e.preventDefault();
      nav.slideToggle();
    });
  })();
}

//Menu scroll handle
function menuScrollHandle() {
  let header = $("header");
  $(window).on("scroll", function (e) {
    let topPos = $(this).scrollTop();
    if (topPos > 200) {
      header.addClass("scroll-down");
    } else {
      header.removeClass("scroll-down");
    }
  });
}

// ChangeToc

function changeToc() {
  let $toc = $("#sidebarToc");
  let $content = $("#postContent");
  let $openToc = $("#openToc");
  let tocClass = "col-md-4 col-lg-4 order-md-2";
  let contentClass = "col-md-8 col-lg-8 order-md-1";
  let expandedClass = "expanded";
  $openToc.click(function () {
    if ($openToc.hasClass("expanded")) {
      $toc.removeClass(tocClass);
      $content.removeClass(contentClass);
      $openToc.removeClass(expandedClass);
      $toc.addClass("d-none");
    } else {
      $toc.addClass(tocClass);
      $toc.removeClass("d-none")
      $content.addClass(contentClass);
      $openToc.addClass(expandedClass);
    }
  });

}

function scrollTop() {
  $('#goTop').click(function () {
    $('body,html').animate({ scrollTop: 0 }, 400);
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() < 150) {
      $('#goTop').slideUp(400);
    } else {
      $('#goTop').slideDown(400);
    }
  });
}

function socialShare() {
  var clipboard = new ClipboardJS('.share');
  clipboard.on('success', function (e) {
    alert(e.trigger.getAttribute('data-clipboard-tips'));
  });
  clipboard.on('error', function (e) {
    console.error(e);
  });
}

function fixedTocTarget() {
  $('.toc a,.go-comment>a').click(function () {
    var target = $(this).attr('href');
    $('html, body').animate({ scrollTop: $(target).offset().top - 80 }, 300);
    return false;
  });
}

function banner(){
  console.log()
}


//Document ready
$(function () {
  banner();
  navDropdownHandle();
  menuScrollHandle();
  changeToc();
  scrollTop();
  socialShare();
  fixedTocTarget();
});


(function preload() {
  const $load = $("#load");
  $(window).on("load", function () {
    $load.fadeOut(100, function () {
      $load.remove();
    });
  });
})();
