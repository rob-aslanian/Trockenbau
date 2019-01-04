import $ from "jquery"; // Jquery
import "slick-carousel";

$(function() {
  /** Smooth Scrollin */
  // $('YOUR CLASS').click(function(e){

  //     e.preventDefault();
  //     $('html  , body').animate({
  //         scrollTop: $(this.hash).length === 0 ?
  //                     $(this).offset().top :
  //                     $(this.hash).offset().top
  //     }, 1000);
  // });

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

  $("#slider-area").slick({
    // dots: false,
    // centerMode: true,
    // infinite: false,
    // speed: 300,
    // slidesToShow: 1,
    // slidesToScroll: 1
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  });
});
