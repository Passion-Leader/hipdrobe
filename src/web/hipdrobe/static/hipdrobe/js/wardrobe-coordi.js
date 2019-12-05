var g_elem = [];

$(document).ready(function(){
    // 로고 검은색
    changeLogColor('black')

    // 제목 및 액티브 효과 적용
    setTitle(["나만의 옷장 :", "코디 작성"]);
    setActive(["main-ln-wardrobe", "ln-coordi"]);

    // enable test Drag & Drop 
    enableDnD();

    //Set Buttons
    setButtons();
});


function setButtons() {
    parts = $('.clickable');

    parts.on('click', function(e) {
        getItemUrlsAndOpenList($(this).attr('value'), 'openAddItemDialog(event)');
    });

}
