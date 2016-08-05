initNavbar = function(keyValue){
	console.log("Calling Navbar...");

	var documento = JSON.parse(localStorage.getItem(keyValue));
    $('#nombreNB').html(documento.Nombre);
    $('#nombreApellidoNB').html(documento.Nombre + " " + documento.Apellido);
    $('#emailNB').html(documento.Email);
    $('.imgUsr').html($.cloudinary.image(documento.AvatarId,{ width: 40, height: 40, 
                        crop: 'thumb', gravity: 'face', radius: 'max' , format: 'png', border: { width: 1, color: 'black' }}));
    $('.imgUsr2').html($.cloudinary.image(documento.AvatarId,{ width: 85, height: 85, 
                        crop: 'thumb', gravity: 'face', radius: 'max' , format: 'png', border: { width: 1, color: 'black' }}));
 
    $("#btnCerrarSesion").on("click",function(e){
    	console.log("Loginout session...");
	    e.preventDefault();
	    var keyValue = localStorage.key(0);
	    localStorage.removeItem(keyValue);
	    app.initializeObj();
	    $('#nombreNB').html("");
	    $('#nombreApellidoNB').html("");
	    $('#emailNB').html("");
	    $("#navbar").html("");
	});
	
	$("#btnPerfil").on("click",function(e){
	    e.preventDefault();
	    if (localStorage != null || localStorage.length != 0){
	        var keyValue = localStorage.key(0);
	        var documento = JSON.parse(localStorage.getItem(keyValue));
	        var usuario = documento.Usuario;
	        obtenerDocumento(usuario,function(documento){
	            if (documento != "error" && documento != null){
	                if ($('.navbar-toggle').is( ":visible" )){
	                    $(".navbar-collapse").collapse('hide');
	                }
	                var keyValue = documento._id.$oid;
					var objAvatar = {
						avatarTag: app.getAvatarTag(),
						avatarUrl: app.getAvatarUrl(),
						avatarPublicId: app.getAvatarPublicId()
					};
	                route.evalRoute("perfil", objAvatar);
	            }
	            else{
	                alert("El usuario " + usuario + " no existe!\nIngrese otro usuario");
	            }
	        });
	    };
	});

};
