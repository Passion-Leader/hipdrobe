/* 
 * char-win.js
 * 
 * ref:
 * - displace.js    https://catc.github.io/displace/#demo
 */

var g_moveables = []
var g_clothes = []

$(document).ready(function(){
    setPartsHeights();
    setPartsDefaultImage();

    // enable test Drag & Drop 
    // enableDnD();

    //Set Buttons
    setPartsButtons();
});





function enableDnD() {
    const elems = document.querySelectorAll('.moveable');
    const options = { constrain: true };

    for(i = 0; i < elems.length; i++) {
        displacejs(elems[i], options);
    }
}


function changeCoordMode(mode) {
    // 옷 설정 모드
    if (mode === 0) {
        $('#id-div-char-win').css('display', 'flex');
        $('#id-div-coord-win').css('display', 'none')
    }
    // 코디하기 모드
    else {
        $('#id-div-char-win').css('display', 'none');
        $('#id-div-coord-win').css('display', 'flex');

        setTimeout(function(){
            enableDnD();
        }, 300);
        
    }
}




/* ----------------------------------------------------------------------------
 * 성별에 맞게 각 부위의 기본 이미지를 설정 (성별기능 아직 없음)
 * 
 */
function setPartsDefaultImage() {
    let imgTags = $('.clickable').find('img');
    
    imgTags.each(function(i, tag) {
        let dummyUrl = $(tag).attr('src');
        $(tag).attr('value', dummyUrl);
    });

}

/*-----------------------------------------------------------------------------
 * 각 부위에 맞는 리스트창을 열도록 버튼을 설정
 * 이미지 선택 취소 버튼도 같이 설정한다.
 */
let g_currentPart = null;
function setPartsButtons() {
    parts = $('.clickable');

    parts.each(function(i, part){
        $(part).on('click', function(e) {
            g_currentPart = part;
            getItemUrlsAndOpenList($(this).attr('value'), 'setPartsImage(g_currentPart, this)');
        });

        $(part).find('.del').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.cancelbubble = true;

            unsetPartsImage(part);
        });
    });

    // 코디하기 div에 클릭 이벤트 등록
    // 빈 공간을 클릭하면 기존에 선택된 파트가 있다면 선택을 해제시킨다.
    $('#id-div-coord-win').click(function() {
        if(g_$currentCoortPart == null)
            return;
        
        g_$currentCoortPart.removeClass('outline');
        g_$currentCoortPart = null;
    });
    

}



/*-----------------------------------------------------------------------------
 * 각 파트에 선택한 이미지를 등록하거나 혹은 취소하여 원복시킴
 */
let g_$currentCoortPart = null;
function  setPartsImage(part, imgTag) {
    unsetPartsImage(part);

    let $imgUrl = $(imgTag).attr('src');
    let $imgTag = $(part).find('img');
    
    $imgTag.attr('src', $imgUrl);
    $(part).removeClass('blank')

    // 선택한 이미지를 코디하기 창에도 넣어준다.
    setTimeout(function() {
        let $div = $('<div>').addClass('coord-part').addClass('moveable');
        $div.attr('pid', $(part).attr('id'));
        let $img = $('<img>').css({
            'width':  $imgTag.css('width'),
            'height':  $imgTag.css('height'),
        });
        $img.attr('src',$imgUrl);

        // 클릭되었을 경우 선택된 것으로 인식도록 outline을 설정한다.
        $img.click(function(e) {
            e.stopPropagation();
            if (g_$currentCoortPart != null) {
                g_$currentCoortPart.removeClass('outline');
            }
            g_$currentCoortPart = $img;
            $img.addClass('outline');
        });

        $div.append($img);

        $('#id-div-coord-win').append($div);
        $div.css({
            'left': $(part).css('left'),
            'top': $(part).css('top')
        });

        // 등록되고나면 글로벌 변수 array에 넣어준다.
        g_moveables.push($div);
    }, 500);
   

    
    $('#myModal').modal('toggle');
}

function unsetPartsImage(part) {
    let pid = $(part).attr('id');
    g_moveables.forEach(function(elem, i) {
        let $elem = $(elem);
        if ($elem.attr('pid') == pid) {
            $elem.remove();
            delete g_moveables[i];
        }
    });

    $(part).addClass('blank');
    let imgTag = $(part).find('img');
    imgTag.attr('src', imgTag.attr('value'));
}



/*-----------------------------------------------------------------------------
 * 브라우저 화면 사이즈에 따라 비율에 맞게 height 조절
 */
function setPartsHeights() {
    // Container Div
    _setPartHeight($('#id-div-char-win'), 1);
    _setPartHeight($('#id-div-coord-win'), 1);
    
    // Head
    _setPartHeight( $('#id-coord-head'), 1);

    // Top
    _setPartHeight($('#id-coord-top1'), 1.2);
    _setPartHeight( $('#id-coord-top2'), 1.2);

    // Bottom
    _setPartHeight($('#id-coord-bottom1'), 1.4);
    _setPartHeight($('#id-coord-bottom2'), 1.4);

    // Bottom
    _setPartHeight($('#id-coord-foot1'), 1);
    _setPartHeight($('#id-coord-foot2'), 1);

    // Acc
    _setPartHeight($('#id-coord-acc1'), 1);
    _setPartHeight($('#id-coord-acc2'), 1);
    _setPartHeight($('#id-coord-acc3'), 4.4);
    _setPartHeight($('#id-coord-acc4'), 1.3);
    _setPartHeight($('#id-coord-acc5'), 1);
    _setPartHeight($('#id-coord-acc6'), 1);

    // Outer
    _setPartHeight($('#id-coord-outer'), 2);
}


function _setPartHeight(target, ratio) {
    let partheight = parseInt(target.css('width')) * ratio;
    target.css('height', `${partheight}px`);
}

/*-----------------------------------------------------------------------------
 * 브라우저 화면 사이즈가 바뀌면 그에 맞게 조정한다.
 */
window.onresize = function(event) {
    setPartsHeights();
};


/* test code
var g_dragOn = true;

let g_distX;
let g_distY;
let g_posX;
let g_posY;

function itemDrop(event) {
    event.stopPropagation();
    event.preventDefault();
    posX = event.pageX;
    posY = event.pageY;
    console.log(posX, posY, distX, distY);
    $('#id-div-char-head').css('margin-left', posX + distX + 'px')
        .css('margin-top', posY + distY + 'px');
}

function itemDragStart(event) {
    posX = event.pageX;
    posY = event.pageY;
    distX = event.srcElement.offsetLeft - posX;
    distY = event.srcElement.offsetTop - posY;
}

function itemDragOver(evnet) {
    event.stopPropagation();
    event.preventDefault();
}
*/

