$(document).ready(function(){
    // 로고 검은색
    changeLogColor('black')

    // 제목 및 액티브 효과 적용
    setTitle(["나만의 옷장 :", "코디 작성"]);
    setActive(["main-ln-wardrobe", "ln-coordi"]);

    getCoordi(false, 1);
});




const CARDS_IN_ROW = 2;
const CARDS_EACH_PAGE = 4;
var g_coordiDailyPage = 0;
var g_coordiNormalPage = 0;
var g_coordiDailyLoading = false;
var g_coordiNormalLoading = false;
/* ----------------------------------------------------------------------------
 * 사용자가 저장한 Coordi List를 요청하여 받기
 */
function getCoordi(is_daily, page_num) {
    // 이미 요청 중이면 리턴
    if (is_daily) {
        if (g_coordiDailyLoading)
            return;
        else 
            g_coordiDailyLoading = true;
    } else {
        if (g_coordiNormalLoading)
            return;
        else 
            g_coordiNormalLoading = true;
    }

    $('.spin-page-bottom').css('visibility', 'visible');
    axios.get('/apis/coordi/', {
        params: {
            is_daily: false,
            'page_num': page_num
        }
    })
    .then(function (response) {
        data = response.data;
        if ( data['result'] == false )
            return;

        if (is_daily) {
            
        } else {
            g_coordiNormalPage = data['page_num']
            pushCoordisToBottom(data['coordis']);
        }

    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        if (is_daily)
            g_coordiDailyLoading = false;
        else 
            g_coordiNormalLoading = false;
        setTimeout(_ => $('.spin-page-bottom').css(
            'visibility', 'collapse'), 100);
        
    });  
}

/* ----------------------------------------------------------------------------
 * 서버에서 날아온 Coordi Object를 DOM Element로 복원하여 화면에 심어준다.
 */
function pushCoordisToBottom(data) {
    const $parent = $('#id-coordi-timeline-normal')
    
    const length = data.length;
    const rowToGo = Math.ceil(parseFloat(length)/CARDS_IN_ROW);

    let cardsIndex = 0;
    for (let i = 0; i < rowToGo; i++) {
        
        const $cardGroup = $('<div>').attr('class', 'card-group');
        $cardGroup.appendTo($parent)
        
        let slotRemained = CARDS_IN_ROW;
        for (let j = 0; j < slotRemained; j++) {
            const $card = $('<div>').attr('class', 'card');
            $card.appendTo($cardGroup);

            if (cardsIndex >= length)  
                return;

            // Coordi Win
            const $coordiWin = _objToCoordWind(
                    '100%', 'auto', data[cardsIndex]);
            $coordiWin.appendTo($card);

            // Card Body
            const $cardBody = $('<div>').attr('class', 'card-body');
            $cardBody.appendTo($card);
            // Title
            const $title = $('<h4>').attr('class', 'card-title').html(
                    data[cardsIndex]['title']);
            $title.appendTo($cardBody);
            // Content
            const $content = $('<p>').attr('class', 'card-text').html(
                    data[cardsIndex]['content']);
            $content.appendTo($cardBody);
            // DateTime
            const $cardFooter = $('<div>').attr('class', 'card-footer');
            $cardFooter.appendTo($card);
            const $small = $('<small>').attr('class', 'text-muted').html(
                    data[cardsIndex]['created_at']);
            $small.appendTo($cardFooter);

            cardsIndex++;
        }
    }
}


$(window).resize(function() {
    const targetList = $('.card .coord-post');
    targetList.each(function(i, target) {
        _setPartHeight($(target), 1);
    });
});


$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        const is_daily = $('.nav-link.active').attr('href') 
            == '#id-coordi-timeline-daily';
        let page_num = is_daily ? g_coordiDailyPage : g_coordiNormalPage;
        getCoordi(is_daily, page_num + 1);
    }
 });
