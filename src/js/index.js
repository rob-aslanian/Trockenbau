import $ from 'jquery' // Jquery 

$(function(){


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
    $('.collapse-btn').click(function(e){

        const collapse = $('.collapse');

        if($(window).resize(function(e) { 
            if($(window).width() > 768){
                collapse.fadeIn(10);
            }
            else{
                collapse.fadeOut(0);
            }
        }))

        if(!e.target.classList.contains('collapsed')){
            e.target.classList.add('collapsed');
            collapse.slideDown(350);
        }
        else{
            e.target.classList.remove('collapsed');
            collapse.slideUp(350);
          
        } 
        
    });


    /**
     * Load more data
     * @param {HtmlElemnt} $elem 
     * @param {Number} $count 
     */
    function showMore($elem , $count){
        let allElems = $($elem),
            btn = $('.showMore');


        $($elem).slice(0 , $count).show();

        if(allElems.length !== $count){
            btn.show();

            btn.on('click' , function(e){
                e.preventDefault();
                $(`${$elem}:hidden`).slice(0 , $count).slideDown();

                if($(`${$elem}:hidden`).length === 0){
                    btn.fadeOut();
                }
            })
        }
        
    }

    showMore('.machen__block' , 6);

    // Your code here....

});
