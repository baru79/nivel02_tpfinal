function getUrlByTag(tag){
    $.cloudinary.config({ cloud_name: 'dj51tmvrt', api_key: '531544743286888'});
    return $.cloudinary.url(tag, {format: 'json', type: 'list'});
}

function getPublicId(){
    $.cloudinary.config({ cloud_name: 'dj51tmvrt', api_key: '531544743286888'});
}

function setAvatarPublicIdAndUrlByTag(tag){
    $.cloudinary.config({ cloud_name: 'dj51tmvrt', api_key: '531544743286888'});
    var urlWithTagDefault = $.cloudinary.url(tag, {format: 'json', type: 'list'});
    $.ajax({
        dataType: 'json',
        url: urlWithTagDefault,
        success: function (data){
            if (data !=null){
                var drl = data.resources.length;
                if (drl > 0){
                    for (var i = 0 ; i < drl; i++) {
                        var public_id = data.resources[i].public_id;
                        app.setAvatarPublicId(public_id);
                        app.setAvatarUrl($.cloudinary.url(public_id));
                    }
                }
            }
        },
        error: function (xhr, status, err){
            console.log(err);
        }
    });
}

function showImgByTag(tag,htmlObj){
    $.cloudinary.config({ cloud_name: 'dj51tmvrt', api_key: '531544743286888'});
    var urlWithTagDefault = $.cloudinary.url(tag, {format: 'json', type: 'list'});
    $.ajax({
        dataType: 'json',
        url: urlWithTagDefault,
        success: function (data){
            if (data !=null){
                var drl = data.resources.length;
                if (drl > 0){
                    for (var i = 0 ; i < drl; i++) {
                         var public_id = data.resources[i].public_id;
                        $(htmlObj).append($.cloudinary.image(public_id + '.jpg',{ width: 128, height: 128, 
                        crop: 'thumb', gravity: 'face', radius: 'max' , format: 'png', border: { width: 1, color: 'black' }}));
                    }
                }
            }
        },
        error: function (xhr, status, err){
            console.log(err);
        }
    });
}

function cloudinary_upload_url_aux(remote_url,usuario) {
    $.cloudinary.config({ cloud_name: 'dj51tmvrt', api_key: '531544743286888'});
    var upload_preset = "sdffhkqj";
    //var fu = $('.cloudinary-fileupload').unsigned_cloudinary_upload(upload_preset);
    var data = {
      tags: [usuario],
      folder: usuario
    };
    var fu = $('.cloudinary-fileupload').unsigned_cloudinary_upload(upload_preset, data);
    //var fu = $('.cloudinary-fileupload').unsigned_cloudinary_upload(upload_preset, {folder: 'prueba', tags: ['holaaa']});
    fu.cloudinary_upload_url(remote_url);
    console.log("Uploading avatar...");
}
