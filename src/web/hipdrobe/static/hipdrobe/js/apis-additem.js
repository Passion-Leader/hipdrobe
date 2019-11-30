/*
 * apis-additem.js
 */
function openAddItemDialog(event) {
    _eraseOption('#id-additem-cate1')
    _eraseOption('#id-additem-cate2')
    
    $.ajax({
        type: "GET",
        url: "/apis/parts/",
        success: function (data) {
            _clearModal()
            _addOption('#id-additem-part', data['parts'])
            $('#id-modal-additem').modal('toggle');
        },
        error: function (e) {
            console.log("ERROR : ", e);
            alert("fail");
        }
   });
}

function onPartChange() {
    part_name = $('#id-additem-part option:selected').val()
    if (part_name == "") {
        _eraseOption('#id-additem-cate1')
        _eraseOption('#id-additem-cate2')
        return;
    }      

    $.ajax({
        type: "GET",
        url: "/apis/cate1/",
        contentType: "application/json",
        data: {part: part_name},
        success: function (data) {
            _addOption('#id-additem-cate1', data['cate1'])
        },
        error: function (e) {
            console.log("ERROR : ", e);
            alert("fail");
        }
   });
}

function onCate1Change() {
    cate1_name = $('#id-additem-cate1 option:selected').val()
    if (cate1_name == "") {
        _eraseOption('#id-additem-cate2')
        return;
    }
        

    $.ajax({
        type: "GET",
        url: "/apis/cate2/",
        contentType: "application/json",
        data: {cate1: cate1_name},
        success: function (data) {
            _addOption('#id-additem-cate2', data['cate2'])
        },
        error: function (e) {
            console.log("ERROR : ", e);
            alert("fail");
        }
   });
}





function uploadImage(event) {
    event.preventDefault();
    
    var form = $('#id-form-upload')[0];
    var data = new FormData(form);

    //$("#btnSubmit").prop("disabled", true);

    $.ajax({
        // headers: { "X-CSRFToken": getCookie('csrftoken') },
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/apis/upload/",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {
            console.log(data);
            $('#id-div-imgselect').css('display', 'block');
            $('#id-additem-preview1').prop('src', "/clothes_tmp/" + data['org']);
            $('#id-additem-preview2').prop('src', "/clothes_tmp/" + data['mod']);
        },
        error: function (e) {
            console.log("ERROR : ", e);
            alert("fail");
        }
   });
 }

 

function _addOption(target, data) {
    var select = $(target).html("");
    select.append("<option value='' selected>선택하세요</option>");

    for (let opt of data) {
        select.append("<option value='" + opt + "'>" + opt + "</option>");
    }
}

function _eraseOption(target) {
    var select = $(target).html("");
    select.append("<option selected>선택하세요</option>");
}

function _clearModal() {
    for (form of $('#id-modal-additem').find('form')) {
        form.reset();
    }

    for (img of $('#id-modal-additem').find('img')) {
        $(img).attr('src', '');
    }

    $('#id-div-imgselect').css('display', 'none');
}
