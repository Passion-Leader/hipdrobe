
$(document).ready(function(){
    // 로고 검은색
    changeLogColor('black')

    // 제목 및 액티브 효과 적용
    setTitle(["나만의 옷장 :", "코디 자세히보기"]);
    setActive(["main-ln-wardrobe", "ln-coordi"]);

    setCoordi();

});

let g_coordi = null;
function setCoordi() {
    
    const dataRaw = $('#hidden-data').val()
            .replace(/'/gi, '"')
            .replace(/True/gi, 'true')
            .replace(/False/gi, 'false')
            .replace(/None/gi, null);
    console.log(dataRaw)
    g_coordi = JSON.parse(dataRaw);

    const $coordiWin = _objToCoordWind('100%', 'auto', g_coordi);
    

   

    const $card = $('.card');

    $coordiWin.appendTo($card);

    // Card Body
    const $cardBody = $('<div>').attr('class', 'card-body');
    $cardBody.appendTo($card);
    // Title
    const $title = $('<h4>').attr('class', 'card-title');
    $title.appendTo($cardBody);
    const $a = $('<a>').attr('href', 
        `/wardrobe/coordi/${g_coordi['id']}/detail/`)
        .attr('target', '_blank').html(g_coordi['title']);
    $a.appendTo($title);
    
    // Content
    const $content = $('<p>').attr('class', 'card-text').html(
        g_coordi['content']);
    $content.appendTo($cardBody);
    // DateTime
    const $cardFooter = $('<div>').attr('class', 'card-footer');
    $cardFooter.appendTo($card);
    const $small = $('<small>').attr('class', 'text-muted').html(
        g_coordi['created_at']);
    $small.appendTo($cardFooter);


}





var g_windowResized = false;
$(window).resize(function() {
    
});

