import $ from "jquery"; // Jquery
import "slick-carousel";
import wow from "wowjs";
import Isotope from "isotope-layout";

window.WOW = wow.WOW;

$(function() {
  new WOW().init();
  /** Smooth Scrollin */
  $(".link").click(function(e) {
    e.preventDefault();
    $("html  , body").animate(
      {
        scrollTop:
          $(this.hash).length === 0
            ? $(this).offset().top
            : $(this.hash).offset().top
      },
      1000
    );
  });

  /** Menu Collapse */
  $(".collapse-btn").click(function(e) {
    const collapse = $(".collapse");

    if (
      $(window).resize(function(e) {
        if ($(window).width() > 768) {
          collapse.fadeIn(10);
        } else {
          collapse.fadeOut(0);
        }
      })
    )
      if (!e.target.classList.contains("collapsed")) {
        e.target.classList.add("collapsed");
        collapse.slideDown(350);
      } else {
        e.target.classList.remove("collapsed");
        collapse.slideUp(350);
      }
  });

  function loadMore($btn, $textTitle) {
    let btn = $($btn),
      textElem = btn.prev(),
      text = textElem.text(),
      length =
        textElem.attr("data-split") !== undefined
          ? +textElem.attr("data-split")
          : text.length / 2;

    if (length < text.length) {
      let _text = text.slice(0, length);

      textElem.text(_text);

      btn.on("click", function(e) {
        e.preventDefault();

        let elem = e.target;

        if (elem.textContent.toUpperCase() === $textTitle.toUpperCase()) {
          textElem.text(text);
          elem.textContent = "Weniger wissen";
        } else {
          textElem.text(_text);
          elem.textContent = $textTitle;
        }
      });
    }
  }

  $(".loadMore").each((_, el) => loadMore(el, "Know More"));
  loadMore(".Weiterlesen", "Weiterlesen");

  /**
   * Load more data
   * @param {HtmlElemnt} $elem
   * @param {Number} $count
   */
  function showMore($elem, $btn, $count) {
    let allElems = $($elem),
      btn = $($btn);

    $($elem)
      .slice(0, $count)
      .show();

    if (allElems.length !== $count) {
      btn.show();

      btn.on("click", function(e) {
        e.preventDefault();
        $(`${$elem}:hidden`)
          .slice(0, $count)
          .slideDown();

        if ($(`${$elem}:hidden`).length === 0) {
          btn.fadeOut();
        }
      });
    }
  }

  showMore(".machen__block", ".showMore", 6);

  // Your code here....
  /* portfolio */
  let myModal = $(".modal");
  let modal_content = $(".modal-content");
  let img01 = $("#img01");
  let img_conteiner = $(".img_conteiner");
  img_conteiner.on("click", function() {
    myModal.css("display", "block");
    setTimeout(() => {
      myModal.css("opacity", "1");
      modal_content.css("width", "70%");
    }, 100);
    img01.attr(
      "src",
      $(this)
        .children()
        .eq(1)
        .attr("src")
    );
  });
  let close = $(".close");
  close.on("click", function() {
    modal_content.css("width", "10%");
    myModal.css("opacity", "0");
    setTimeout(() => {
      myModal.css("display", "none");
    }, 910);
  });

  // /* isotope */
  let elem = document.querySelector(".grid");
  let iso = new Isotope(elem);

  let buttons = $(".filter_btns");

  buttons.on("click", function() {
    let filterBy = $(this).attr("data-filter");

    let _self = $(this);

    for (let button of buttons) {
      if (button.classList.contains("active"))
        button.classList.remove("active");

      _self.addClass("active");
    }

    iso.arrange({ filter: filterBy });
  });

  $("#slider-area").slick({
    prevArrow: "<button class='slick-arrow slick-prev'><</button>",
    nextArrow: "<button class='slick-arrow slick-next'>></button>"
  });
});
//modal portfolio
