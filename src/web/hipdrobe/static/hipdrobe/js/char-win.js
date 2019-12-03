/* 
 * char-win.js
 * 
 * ref:
 * - displace.js    https://catc.github.io/displace/#demo
 */

var g_moveables = []

$(document).ready(function(){
    _setPartsHeight();
});

function enableDnD() {
    const elems = document.querySelectorAll('.moveable');
    const options = { constrain: true };

    for(i = 0; i < elems.length; i++) {
        g_moveables.push(displacejs(elems[i], options));
    }
}

function disableDnD() {
    for(i = 0; i < g_moveables.length; i++) {
        g_moveables[i].destroy();
    }
    g_moveables = [];
}


/*-----------------------------------------------------------------------------
 * 개별 코딩 해 놓고 추후 결정되면 공통사항 묶어서 다시 코딩
 */
function _setPartsHeight() {
    // Div
    const elemDiv = $('#id-div-char-win')
    let divWidth = parseInt(elemDiv.css('width'));
    elemDiv.css('height', `${divWidth}px`);

    // Head
    const elemHead = $('#id-coord-head')
    let headWidth = parseInt(elemHead.css('width'));
    elemHead.css('height', `${headWidth}px`);

    // Top-1
    const elemTop1 = $('#id-coord-top1')
    let top1Width = parseInt(elemTop1.css('width')) * 1.4;
    elemTop1.css('height', `${top1Width}px`);

    // Top-2
    const elemTop2 = $('#id-coord-top2')
    let top2Width = parseInt(elemTop2.css('width')) * 1.4;
    elemTop2.css('height', `${top2Width}px`);

    // Pants-1
    const elemPants1 = $('#id-coord-pants1')
    let pants1Width = parseInt(elemPants1.css('width')) * 1.4;
    elemPants1.css('height', `${pants1Width}px`);
}

window.onresize = function(event) {
    _setPartsHeight();
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

