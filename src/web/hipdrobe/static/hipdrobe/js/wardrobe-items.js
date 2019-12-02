$(document).ready(function(){
    // 로고 검은색
    changeLogColor('black')

    // 제목 및 액티브 효과 적용
    setTitle(["나만의 옷장 :", "내 옷장 보기"]);
    setActive(["main-ln-wardrobe", "ln-items"]);

    // 아이템 버튼 onMouse & click 이벤트
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
        var name = $(this).val()
        // alert(name)
        $.ajax({
            type: "GET",
            url: "/apis/clothes/",
            contentType: "application/json",
            data: {userid: "user01@test.com", name: name},
            success: function (data) {
                console.log(data['url'])
                $('#myModal').modal();
            },
            error: function (e) {
                console.log("ERROR : ", e);
                alert("fail");
            }
        });
          
    })

});


