/*
 * apis-cruditem.js
 */

var g_data = null;


/*-----------------------------------------------------------------------------
 * getItemUrlsAndOpenList
 */
function getItemUrlsAndOpenList(name, fnStr) {
 
    $.ajax({
        type: "GET",
        url: "/apis/clothes/",
        contentType: "application/json",
        data: {userid: "user01@test.com", name: name},
        success: function (data) { 
            g_data = data['url'];
            var g_data_len = Object.keys(g_data).length;
            $('div.carousel-inner').html('');
            
            // url 개수가 3보다 작은 경우
            if(g_data_len<=3) {
                for(var i=0; i<=g_data_len-1; i++) {
                    $('div.carousel-inner').append("<div class='carousel-item active'></div>")
                    $('div.carousel-item.active').append(`<img class='d-block w-100' onclick='${fnStr}' src='` +
                    g_data[i] + "' />")
                }
            } // if end
            
            // url 개수가 3보다 큰 경우
            else if(g_data_len>3) {
                $('div.carousel-inner').append("<div class='carousel-item active'></div>")
                $('div.carousel-inner').append("<div class='carousel-item></div>")
                
                for(var i=0; i<=g_data_len-1; i++) {
                    // 처음 3개 item은 .active에 추가
                    if (i<=2) {
                        $('div.carousel-item.active').append(`<img class='d-block w-100' onclick='${fnStr}' src='` +
                        g_data[i] + "' />")                            
                    } else if (i>2 && i%3==0) { // 그 이후부터 아이템 3개 단위로 div 추가하고 이미지 추가
                        $('div.carousel-inner').append("<div class='carousel-item'></div>")
                        $('div.carousel-inner').children().eq((i/3)).append(`<img class='d-block w-100' onclick='${fnStr}' src='` + g_data[i] + "' />")
                    } else if (i>2 && i%3!=0) {
                        $('div.carousel-inner').children().eq(parseInt(i/3)).append(`<img class='d-block w-100' onclick='${fnStr}' src='` + g_data[i] + "' />")
                    }    
                } //for end
            } // else if1 end

            $('.modal-title.item').text(name + ' 리스트')
                
            $('#myModal').modal();

            // setTimeout(function(){  
            // }, 500);
            
            if(fnStr==="") {
                var url = null;
                // 이미지 클릭시 실행 함수 start
                $('div.carousel-item img').click(function() {
                    url = $(this).attr('src');
                    $.ajax({
                        type: "GET",
                        url: "/apis/clothes_detail",
                        contentType: "application/json",
                        data: {userid: "user01@test.com", url: url},
                        success: function(data) {
                            console.log(data)
                            $('.modal-title.detail').text('아이템 상세정보');
                            $('#d_image_wrap').append("<img src='"+ data['url'] + "' />");
                            $('#cate').text("종류 : " + data['cate1_name'] + " ▶ " + data['cate2_name']);
                            $('#descript').text("옷 설명 : " + data['descript']);
                            $('#brand').text("브랜드 : " + data['brand']);
                            $('#color').append("색깔 : " + "<input type='color' onclick='' value='" + data['color'] + "' />");
                            $('#pattern').append("무늬 : " + data['pattern']);
                            $('#texture').text("재질 : " + data['texture']);
                            $('#season').text("계절 : " + data['season']);
                            $('#count').text("입은 횟수 : " + data['worn'] + "회")
                            
                            // 모달 닫을 때 입력값 초기화 되는 세팅 추가로 해야 함
                            $('#detail_modal').modal();
                            
                            // 수정 창 start
                            // $('#update_item').click(function() {
                            //     $('.modal-title.add').text('아이템 정보 수정')
                            //     console.log($('#id-additem-cate1 option:selected').val())
                            //     $('#id-modal-additem').modal('toggle');
                            // });

                            
                            
                        },
                        error: function (e) {
                            console.log("ERROR : ", e);
                            alert("fail");
                        }
                    }); //ajax end
                }); //클릭 함수 end
            }
        },
        error: function (e) {
            console.log("ERROR : ", e);
            alert("fail");
        }

    });
    


}
