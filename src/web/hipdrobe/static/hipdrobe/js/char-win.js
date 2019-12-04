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
 * 브라우저 화면 사이즈에 따라 비율에 맞게 height 조절
 */
function setPartsHeights() {
    // Container Div
    _setPartHeight($('#id-div-char-win'), 1);

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

