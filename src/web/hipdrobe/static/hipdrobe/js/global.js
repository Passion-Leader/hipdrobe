/*
 *  global.js
 */

 
/* ----------------------------------------------------------------------------
 * 페이지 제목 넣어주기
 */
function setTitle(titles) {
    $("#page-title").html(titles[0]);
    $("#page-title-sub").html(titles[1]);
}


/* ----------------------------------------------------------------------------
 * 활성화 효과 주기
 */
function setActive(ids) {
    for(let i = 0; i < ids.length; i++) {
        let id = ids[i];
        $("#"+id).addClass('active');
    }
}


function changeLogColor(color) {
    $('#brand-main').css('color', color);
    $('#brand-main-narrow').css('color', color);
    $('#brand-main-hangeul-narrow').css('color', color);
}


/* ----------------------------------------------------------------------------
 * index page에서 이미지 밑 부분의 컨텐츠 시작 위치를 맞추기 위한 함수
 */
function fitBottom() {
    let imgheight = $(".carousel-item.active img").css('height')

    $("#sidebar").css({
       'height': imgheight
    });
}


// text effect
var textWrapper = document.querySelector('.ml7 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml7 .letter',
    translateY: ["1.1em", 0],
    translateX: ["0.55em", 0],
    translateZ: 0,
    rotateZ: [180, 0],
    duration: 750,
    easing: "easeOutExpo",
    // delay: (el, i) => 50 * i
  }).add({
    targets: '.ml7',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 2000
  });



/* ----------------------------------------------------------------------------
 * loading
 */
function enableLoading() {
    $('#loading').css('visibility', 'visible' )
}

function disableLoading() {
    $('#loading').css('visibility', 'collapse' )
}


/*-----------------------------------------------------------------------------
 * var csrf_token = getCookie('csrftoken');
 */
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function openmodal(){
    $('.login-info').openmodal
}

/* ----------------------------------------------------------------------------
 * 로고 제네레이터 
 * https://danmarshall.github.io/google-font-to-svg-path/
 * Rock Salt
 */
