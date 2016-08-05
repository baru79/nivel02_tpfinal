initPerfil = function(keyValue, objAvatar){
	console.log("Calling Perfil...");

	var documento = JSON.parse(localStorage.getItem(keyValue));
    $('#usuario').val(documento.Usuario);
    $('#password').val(documento.Password);
    $('#nombre').val(documento.Nombre);
    $('#apellido').val(documento.Apellido);
    $('#edad').val(documento.Edad);
    $('#email').val(documento.Email);
    $('#url').val(documento.URL);

    if (objAvatar && objAvatar.avatarPublicId){
    	if (objAvatar.avatarPublicId != app.getAvatarPublicId()){
			$("#imgDefault").append($.cloudinary.image(objAvatar.avatarPublicId,{ width: 128, height: 128, 
                        crop: 'thumb', gravity: 'face', radius: 'max' , format: 'png', border: { width: 1, color: 'black' }}));
    	}
    	else{
    		$("#imgDefault").append($.cloudinary.image(app.getAvatarPublicId(),{ width: 128, height: 128, 
                        crop: 'thumb', gravity: 'face', radius: 'max' , format: 'png', border: { width: 1, color: 'black' }}));
    	}

    }

	$('.cloudinary-fileupload').bind('cloudinarydone', function(e, data) {
		console.log("Avatar uploaded...");

		app.setAvatarPublicId(data.result.public_id);
		app.setAvatarUrl($.cloudinary.url(data.result.public_id));
		app.setAvatarTag("");

		console.log("Upgrading profile...");
		console.log("public_id: " + app.getAvatarPublicId());
		console.log("url: " + app.getAvatarUrl());
		console.log("tag: " + app.getAvatarTag());

		var documento = {
	        "Usuario" : $('#usuario').val(),
	        "Password" : $('#password').val(),
	        "Nombre" : $('#nombre').val(),
	        "Apellido" : $('#apellido').val(),
	        "Edad" : $('#edad').val(),
	        "Email" : $('#email').val(),
	        "URL" : $('#url').val(),
	        "AvatarId": app.getAvatarPublicId()
	    };
	    var keyValue = localStorage.key(0);
	    localStorage.removeItem(keyValue);
	    actualizarDocumento(keyValue, documento, function(documentoActualizado){
	        if (documentoActualizado != "error"){
	            localStorage.setItem(keyValue, JSON.stringify(documentoActualizado));
				var avatarObj = {
			    	avatarTag: app.getAvatarTag(),
			    	avatarUrl: app.getAvatarUrl(),
			    	avatarPublicId: app.getAvatarPublicId()
			    }
			    route.evalRoute("perfil", avatarObj);
	        };
	    });

	});

    $("#lnkAvatar").on("click", function(e){
	    e.preventDefault();
	    var objAvatar = {
	    	usuario: $('#usuario').val()
	    }
	    route.evalRoute("avatar",objAvatar);
	    $("#forInsert").html("");
	});

	function readURL(input) {
      	if (input.files && input.files[0]){
			var reader = new FileReader();

			reader.onload = function (e) {
			    objAvatar.avatarUrl = e.target.result;
			  	$('#imgDefault img').attr('src', e.target.result);
			  	$('#imgDefault img').css('width', '128px');
			  	$('#imgDefault img').css('height', '128px');
			  	$('#imgDefault img').css('border-radius', '50%');
			  	$('#imgDefault img').css('border', '1px solid black');
			}

			reader.readAsDataURL(input.files[0]);
  		}
  	}

    $("#imgInp").change(function(){
    	readURL(this);
  	});

    $("#btnCerrar").on("click",function(e){
	    e.preventDefault();
	    $("#forInsert").html("");
	    route.evalRoute();
	});

    $("#btnActualizar").on("click",function(e){
	    e.preventDefault();
	    if (!objAvatar.avatarUrl.startsWith("http://res.cloudinary.com/")){
	    	//Upload image to Cloudinary
	        cloudinary_upload_url_aux($("#imgDefault img").attr("src"),$('#usuario').val());
	    }
	    else{
	    	app.setAvatarPublicId(objAvatar.avatarPublicId);
			app.setAvatarUrl(objAvatar.avatarUrl);
			app.setAvatarTag("");

			console.log("Upgrading profile...");
			console.log("public_id: " + app.getAvatarPublicId());
			console.log("url: " + app.getAvatarUrl());
			console.log("tag: " + app.getAvatarTag());

			var documento = {
		        "Usuario" : $('#usuario').val(),
		        "Password" : $('#password').val(),
		        "Nombre" : $('#nombre').val(),
		        "Apellido" : $('#apellido').val(),
		        "Edad" : $('#edad').val(),
		        "Email" : $('#email').val(),
		        "URL" : $('#url').val(),
		        "AvatarId": app.getAvatarPublicId()
		    };
		    var keyValue = localStorage.key(0);
		    localStorage.removeItem(keyValue);
		    actualizarDocumento(keyValue, documento, function(documentoActualizado){
		        if (documentoActualizado != "error"){
		            localStorage.setItem(keyValue, JSON.stringify(documentoActualizado));
				    route.evalRoute("perfil", objAvatar);
		        };
		    });


	    }
	    
	});

}