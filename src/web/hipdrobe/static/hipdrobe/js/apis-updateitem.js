/*
 * apis-additem.js
 */


/*-----------------------------------------------------------------------------
 * 페이지 로드시 필수 실행
 * 페이지가 업로드 되었을 경우 업로드 버튼을 활성화하고
 * 필수항목 validator를 구성
 */
$('document').ready(function(){
    _setUploadTrigger();
    _makeValidator();
});


/*-----------------------------------------------------------------------------
 * 업데이트 모달 띄우기 
 */
function openUpdateItem(event) {
    _eraseOption('#id-updateitem-cate1')
    _eraseOption('#id-updateitem-cate2')
    _eraseErrorLabel();
    
    $.ajax({
        type: "GET",
        url: "/apis/parts/",
        success: function (data) {
            _clearModal()
            _addOption('#id-updateitem-part', data['parts'])
            $('#id-modal-updateitem').modal('toggle');
        },
        error: function (e) {
            console.log("ERROR : ", e);
            alert("fail");
        }
   });
}


/*-----------------------------------------------------------------------------
 * 부위가 변경되면 카테고리1의 항목값을 DB에서 받아와 채워줌
 */
function onPartChange() {
    part_name = $('#id-updateitem-part option:selected').val()
    if (part_name == "") {
        _eraseOption('#id-updateitem-cate1')
        _eraseOption('#id-updateitem-cate2')
        return;
    }      

    $.ajax({
        type: "GET",
        url: "/apis/cate1/",
        contentType: "application/json",
        data: {part: part_name},
        success: function (data) {
            _addOption('#id-updateitem-cate1', data['cate1'])
        },
        error: function (e) {
            console.log("ERROR : ", e);
            alert("fail");
        }
   });
}


/*-----------------------------------------------------------------------------
 * 카테고리1이 변경되면 카테고리2의 항목값을 DB에서 받아와 채워줌
 */
function onCate1Change() {
    cate1_name = $('#id-updateitem-cate1 option:selected').val()
    if (cate1_name == "") {
        _eraseOption('#id-updateitem-cate2')
        return;
    }
        
    $.ajax({
        type: "GET",
        url: "/apis/cate2/",
        contentType: "application/json",
        data: {cate1: cate1_name},
        success: function (data) {
            _addOption('#id-updateitem-cate2', data['cate2'])
        },
        error: function (e) {
            console.log("ERROR : ", e);
            alert("fail");
        }
   });
}


/*-----------------------------------------------------------------------------
 * Validator에서 모든 체크가 완료되면 실질적으로 AJAX POST를 진행한다. 
 * form에 있는 모든 정보를 서버로 전송한다.
 */
 function postUpdateItem() {
    enableLoading();

    $('#id-btn-updateitem').prop("disabled", true);
    var data = $('#id-form-updateitem').serialize();
    
    $.ajax({
        type: "POST",
        url: "/apis/updateitem/",
        data: data,
        // contentType: false,
        success: function (data) {
            disableLoading();
            $('#id-btn-updateitem').prop("disabled", false);
            alert('아이템 정보가 변경되었습니다.')
            $('#id-modal-updateitem').modal('hide');
            $('#id-modal-updateitem').on('hidden.bs.modal', function (e) {
                // refresh modal content
                $('#cate').text(" 종류 : " + data['cate1_name'] + " ▶ " + data['cate2_name']);
                $('#descript').text(" 옷 설명 : " + data['descript']);
                $('#brand').text(" 브랜드 : " + data['brand']);
                $("#color input[name='color']").val(data['color']);
                $('#pattern').text(" 패턴 : " + data['pattern'])
                $('#texture').text(" 재질 : " + data['texture']);
                $('#season').text(" 계절 : " + data['season']);
                $("#detail_modal").load();
                
                // updateitem페이지 초기화
                _clearModal();

              })
            
          
        },
        error: function (e) {
            console.log("ERROR : ", e);
            alert("fail");
            $('#id-btn-updateitem').prop("disabled", false);
            disableLoading();
        }
   });
 }

 
/*-----------------------------------------------------------------------------
 * target으로 주어진 select-box에 data로 주어진 항목들을 채움
 */
function _addOption(target, data) {
    var select = $(target).html("");
    select.append("<option value='' selected>선택하세요</option>");

    for(let i = 0; i < data.length; i++) {
        opt = data[i];
        select.append("<option value='" + opt + "'>" + opt + "</option>");
    }
}


/*-----------------------------------------------------------------------------
 * target으로 주어진 select-box의 모든 항목을 지우고 안내 문구만 남김
 */
function _eraseOption(target) {
    let select = $(target).html("");
    select.append("<option selected>선택하세요</option>");
}


/*-----------------------------------------------------------------------------
 * 의상 수정 다이얼로그를 새로 띄웠을 경우 기존 데이터를 모두 지움
 */
function _clearModal() {
    let forms = $('#id-modal-updateitem').find('form');
    for(let i = 0; i < forms.length; i++) {
        forms[i].reset();
    }
    $('#id-updateitem-id').val("");
}

/*-----------------------------------------------------------------------------
 * 기존에 작동된 validation 결과를 삭제함
 */
function _eraseErrorLabel() {
    let error_labels =  $('#id-modal-updateitem').find('label.error');
    for(let i = 0; i < error_labels.length; i++) {
        $(error_labels[i]).remove();
    }
}


/*-----------------------------------------------------------------------------
 * 의상 등록 다이얼로그를 새로 띄웠을 경우 기존 데이터를 모두 지움
 */
function _clearModal() {
    let forms = $('#id-modal-updateitem').find('form');
    for(let i = 0; i < forms.length; i++) {
        forms[i].reset();
    }

    let imgs = $('#id-modal-updateitem').find('img');
    for(let i = 0; i < imgs.length; i++) {
        $(imgs[i]).attr('src', "/static/hipdrobe/img/no-image.png");
    }

    $('#id-updateitem-url').val("");
}


/*-----------------------------------------------------------------------------
 * 최종 업로드 버튼
 */
function _setUploadTrigger() {
    $('#id-btn-updateitem').click(function(event){
        event.stopPropagation();
        event.preventDefault();

        // 버튼이 클릭되면 validator로 결정권을 넘김
        $('#id-form-updateitem').submit();
    });
}


/*-----------------------------------------------------------------------------
 * validator
 * 필수 항목을 모두 맞게 잘 넣었는지 체크
 * ref: 
 *  https://jqueryvalidation.org/
 *      
 */
function _makeValidator() {
    $("#id-form-updateitem").validate({
        rules: {
          part: {required: true },
          cate1: {required: true },
          cate2: {required: true },
        },
        messages: {
        },
        submitHandler: function (frm) {
            // 이미지 선택 form의 validation으로 넘김
            postUpdateItem();
        },
        success: function (e) {
            //ToDo: Nonthing To Do...
        }
    });

    $.extend( $.validator.messages, { 
        required: "필수 항목입니다.", 
        remote: "항목을 수정하세요.", 
        email: "유효하지 않은 E-Mail주소입니다.", 
        url: "유효하지 않은 URL입니다.", 
        date: "올바른 날짜를 입력하세요.", 
        dateISO: "올바른 날짜(ISO)를 입력하세요.", 
        number: "유효한 숫자가 아닙니다.", 
        digits: "숫자만 입력 가능합니다.", 
        creditcard: "신용카드 번호가 바르지 않습니다.", 
        equalTo: "같은 값을 다시 입력하세요.", 
        extension: "올바른 확장자가 아닙니다.", 
        maxlength: $.validator.format( "{0}자를 넘을 수 없습니다. " ), 
        minlength: $.validator.format( "{0}자 이상 입력하세요." ), 
        rangelength: $.validator.format( "문자 길이가 {0} 에서 {1} 사이의 값을 입력하세요." ), 
        range: $.validator.format( "{0} 에서 {1} 사이의 값을 입력하세요." ),
        max: $.validator.format( "{0} 이하의 값을 입력하세요." ), 
        min: $.validator.format( "{0} 이상의 값을 입력하세요." ) 
    });
}
