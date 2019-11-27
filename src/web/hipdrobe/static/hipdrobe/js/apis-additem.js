/*
 * apis-additem.js
 */
function openAddItemDialog(event) {
    $.ajax({
        // headers: { "X-CSRFToken": getCookie('csrftoken') },
        type: "GET",
        url: "/apis/parts/",
        success: function (data) {
            alert(data['parts']);
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
            $('#preview').prop('src', "/clothes/" + data['org']);
            $('#preview').css('visibility', 'visible');
            $('#thumbnail').prop('src', "/clothes/" + data['tar']);
            $('#thumbnail').css('visibility', 'visible');
            //$("#btnSubmit").prop("disabled", false);
        },
        error: function (e) {
            console.log("ERROR : ", e);
            //$("#btnSubmit").prop("disabled", false);
            alert("fail");
        }
   });
 }

 