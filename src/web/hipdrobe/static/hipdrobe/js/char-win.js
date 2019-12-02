/* 
 * char-win.js
 * 
 * ref:
 * - displace.js    https://catc.github.io/displace/#demo
 */

var g_moveables = []

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

