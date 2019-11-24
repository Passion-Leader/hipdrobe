/*
 *  index.js
 */


$(document).ready(function(){
    // Index page는 로고 흰색
    fillLogoH();
    fillLogoSubH();

    // Index page는 페이지 제목 없음
    setTitle("");

    // Carousel 밑의 컨텐츠 시작 위치 맞추기
    fitBottom();

});

window.onresize = function(event) {
    fitBottom();
};

