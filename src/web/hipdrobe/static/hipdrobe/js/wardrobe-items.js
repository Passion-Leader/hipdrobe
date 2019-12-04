var g_data = null;

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
                g_data = data['url'];
                console.log(g_data)
                var g_data_len = Object.keys(g_data).length;
                $('div.carousel-inner').html('');
                
                
                console.log(g_data_len)
                if(g_data_len<=3) {
                    for(var i=0; i<=g_data_len-1; i++) {
                        $('div.carousel-inner').append("<div class='carousel-item active'></div>")
                        $('div.carousel-item.active').append("<img class='d-block w-100' src='" +
                        g_data[i] + "' />")
                    }
                } // if end
                else if(g_data_len>3) {
                    $('div.carousel-inner').append("<div class='carousel-item active'></div>")
                    $('div.carousel-inner').append("<div class='carousel-item></div>")
                    for(var i=0; i<=g_data_len-1; i++) {
                        if (i<=2) {
                            $('div.carousel-item.active').append("<img class='d-block w-100' src='" +
                            g_data[i] + "' />")                            
                        } else if (i>2 && i%3==0) {
                            $('div.carousel-inner').append("<div class='carousel-item'></div>")
                            $('div.carousel-inner').children().eq((i/3)).append("<img class='d-block w-100' src='" + g_data[i] + "' />")
                        } else if (i>2 && i%3!=0) {
                            $('div.carousel-inner').children().eq(parseInt(i/3)).append("<img class='d-block w-100' src='" + g_data[i] + "' />")
                        }    
                    } //for end
                } // else if1 end
                    
                $('#myModal').modal();
            },
            error: function (e) {
                console.log("ERROR : ", e);
                alert("fail");
            }
        });
    })

});
