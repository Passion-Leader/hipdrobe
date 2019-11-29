$(document).ready(function(){
    // Index page는 로고 흰색
    fillLogoB();
    fillLogoSubB();

    // 제목 및 액티브 효과 적용
    setTitle(["나만의 옷장 :", "내 옷장 보기"]);
    setActive(["main-ln-wardrobe", "ln-items"]);


    $('.fun-btn').on('click', function(event) {
        $(this).toggleClass('start-fun');
        var $page = $('.page');
        $page.toggleClass('color-bg-start')
          .toggleClass('bg-animate-color');
      
        //change text when when button is clicked
      
        $(this).hasClass('start-fun') ?
          $(this).text('stop the fun') :
          $(this).text('start the fun');
      
      });

    $('.fun-btn').click(function() {
        // $.ajax({
        //     type: "GET",
        //     url: "/apis/clothes/",
        //     contentType: "application/json",
        //     data: {userid: "itemtest"},
        //     success: function (data) {
        //         alert(data)
        //     },
        //     error: function (e) {
        //         console.log("ERROR : ", e);
        //         alert("fail");
        //     }
        // });
        $('#myModal').modal();
          
    })

});


