initAvatar = function(usuario){
	console.log("Calling Avatar...");

	var tag = "others";
    var htmlObj =  "#imgAvatar";
    showImgByTag(tag,htmlObj);

    var tag = usuario;
    var htmlObj =  "#imgAvatar";
    showImgByTag(tag,htmlObj);

    $("#lnkAvatarRegistrarse").on("click", function(e){
	    e.preventDefault();
	    $("#forInsert").html("");
	   
        var url = e.target.src;
        var arrUrl = url.split("/");
        arrUrl.splice(arrUrl.length - 2,1);
        var publicId = arrUrl[arrUrl.length-1].split(".")[0];
        url = arrUrl.join("/");

	    var objAvatar = {
	    	avatarTag: "",
	    	avatarUrl: url,
	    	avatarPublicId: publicId
	    }

	    if (app.isLogged()){
	    	route.evalRoute("perfil",objAvatar);
	    }
	    else{
	    	route.evalRoute("registrarse",objAvatar);
	    }
	});

	$("#btnCerrarAvatar").on("click",function(e){
	    e.preventDefault();
	    $("#forInsert").html("");
		var avatarObj = {
	    	avatarTag: app.getAvatarTag(),
	    	avatarUrl: app.getAvatarUrl(),
	    	avatarPublicId: app.getAvatarPublicId()
	    };
	    if (app.isLogged()){
	    	route.evalRoute("perfil", avatarObj);
	    }
	    else{
	    	route.evalRoute("registrarse", avatarObj);
	    }
	});
}