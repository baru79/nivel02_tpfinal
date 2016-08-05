initLogin = function(){
	console.log("Calling Login...");

	$("form[name='login']").submit(function(e){
		e.preventDefault();
	    var usuario = $("#usuario").val();
	    obtenerDocumento(usuario,function(documento){
	        if (documento != "error" && documento != null){
	            var password = $("#password").val();
	            if (password == documento.Password){
	                var keyValue = documento._id.$oid;
	                localStorage.setItem(keyValue, JSON.stringify(documento));

	                app.setAvatarPublicId(documento.AvatarId);
					app.setAvatarUrl($.cloudinary.url(documento.AvatarId));
					app.setAvatarTag("");

					console.log("public_id: " + app.getAvatarPublicId());
					console.log("url: " + app.getAvatarUrl());
					console.log("tag: " + app.getAvatarTag());

	                route.evalRoute("dashboard");
	                $("#forInsert").html(""); 
	            }
	            else{
	                alert("Error al ingresar, verifique el usuario y la contraseña");
	            }
	        }
	        else{
	            alert("El usuario " + usuario + " no existe!\nIngrese otro usuario");
	        }
	    });
		
	});

	$("#registrarse").on("click",function(e){
	    e.preventDefault();
	    var avatarObj = {
	    	avatarTag: app.getAvatarTag(),
	    	avatarUrl: app.getAvatarUrl(),
	    	avatarPublicId: app.getAvatarPublicId()
	    }
	    route.evalRoute("registrarse", avatarObj);
	    $("#forInsert").html("");
	});

}

