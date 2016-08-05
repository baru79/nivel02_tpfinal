initRegistrarse = function(objAvatar){
	console.log("Calling Registrarse...");

	if (objAvatar && objAvatar.avatarUrl){
		$("#imgDefault").append($.cloudinary.image(objAvatar.avatarUrl));
		$('#imgDefault img').css('width', '128px');
	  	$('#imgDefault img').css('height', '128px');
	  	$('#imgDefault img').css('border-radius', '50%');
	  	$('#imgDefault img').css('border', '1px solid black');
	}
	else{
		$("#imgDefault").append($.cloudinary.image(app.getAvatarPublicId(),{ width: 128, height: 128, 
                        crop: 'thumb', gravity: 'face', radius: 'max' , format: 'png', border: { width: 1, color: 'black' }}));

	}

	$('.cloudinary-fileupload').bind('cloudinarydone', function(e, data) {
		console.log("Avatar uploaded...");

		app.setAvatarPublicId(data.result.public_id);
		app.setAvatarUrl($.cloudinary.url(data.result.public_id));
		app.setAvatarTag("");
		
		console.log("public_id: " + app.getAvatarPublicId());
		console.log("url: " + app.getAvatarUrl());
		console.log("tag: " + app.getAvatarTag());

		var nuevoDocumento = {
            "Usuario" : $('#usuario').val(),
            "Password" : $('#password').val(),
            "Nombre" : $('#nombre').val(),
            "Apellido" : $('#apellido').val(),
            "Edad" : $('#edad').val(),
            "Email" : $('#email').val(),
            "URL" : $('#url').val(),
            "AvatarId": app.getAvatarPublicId()
        };
        
        insertarDocumento(nuevoDocumento, function(documentoInsertado){
            if (documentoInsertado != "error"){
                var keyValue = documentoInsertado._id.$oid;
                localStorage.setItem(keyValue, JSON.stringify(documentoInsertado));
                route.evalRoute("dashboard");
                $("#forInsert").html("");
            };
        });

	});
	
    $("#lnkAvatar").on("click", function(e){
	    e.preventDefault();
	    route.evalRoute("avatar");
	    $("#forInsert").html("");
	});

	function readURL(input) {
      	if (input.files && input.files[0]){
			var reader = new FileReader();

			reader.onload = function (e) {
			    objAvatar = null;
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

    $("#btnRegistrarse").on("click",function(e){
	    e.preventDefault();
	    var usuario = $('#usuario').val();
	    obtenerDocumento(usuario,function(documento){
	        if (documento != "error" && documento == null){
	            if (objAvatar && objAvatar.avatarUrl){

	            	console.log("Avatar exists on Cloudinary, so is not necesary to upload a new Avatar");

					app.setAvatarPublicId(objAvatar.avatarPublicId);
					app.setAvatarUrl(objAvatar.avatarUrl);
					app.setAvatarTag(objAvatar.avatarTag);

					console.log("public_id: " + app.getAvatarPublicId());
					console.log("url: " + app.getAvatarUrl());
					console.log("tag: " + app.getAvatarTag());

					var nuevoDocumento = {
			            "Usuario" : $('#usuario').val(),
			            "Password" : $('#password').val(),
			            "Nombre" : $('#nombre').val(),
			            "Apellido" : $('#apellido').val(),
			            "Edad" : $('#edad').val(),
			            "Email" : $('#email').val(),
			            "URL" : $('#url').val(),
			            "AvatarId": app.getAvatarPublicId()
			        };
			        
			        insertarDocumento(nuevoDocumento, function(documentoInsertado){
			            if (documentoInsertado != "error"){
			                var keyValue = documentoInsertado._id.$oid;
			                localStorage.setItem(keyValue, JSON.stringify(documentoInsertado));
			                route.evalRoute("dashboard");
			                $("#forInsert").html("");
			            };
			        });

	            }
	            else{
	            	//Upload image to Cloudinary
	            	cloudinary_upload_url_aux($("#imgDefault img").attr("src"),usuario);
	            }
	        }
	        else{
	            alert("El usuario " + usuario + " ya existe!\nIngrese otro usuario");
	        }
	    });

	});

    $("#btnCerrarRegistrarse").on("click",function(e){
    	console.log("Closing Registrarse...");
	    e.preventDefault();
	    $("#forInsert").html("");
	    route.evalRoute("login");
	});

}