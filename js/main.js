route = function(){
	var router = {};

	router.evalRoute = function (partialHtml, objAvatar){
		switch (partialHtml)
		{
			//inicializar login
			case "login": {
				app.loadTemplate(partialHtml, objAvatar);
				break;
			}
			//inicializar registrarse
			case "registrarse": {
				app.loadTemplate(partialHtml, objAvatar);
				break;
			}
			//inicializar avatar
			case "avatar": {
				if (objAvatar && objAvatar.avatarUrl){
					app.loadNavbar("navbar");
					app.loadTemplate(partialHtml, objAvatar);
				}
				else{
					app.loadTemplate(partialHtml, objAvatar);
				}
				break;
			}
			//inicializar perfil, dashboard
			case "perfil":
			case "dashboard": {
				app.loadNavbar("navbar");
				app.loadTemplate(partialHtml, objAvatar);
				break;
			}
		}
	};

	return router;
}();

app = function(myRoute){
	var myApp = {
		avatarTag: "",
		avatarUrl : "",
		avatarPublicId: ""
	};

	myApp.initializeObj = function(){
		if (myApp.isLogged()){
			var keyValue = localStorage.key(0);
	        if (keyValue != null){
	            var documento = JSON.parse(localStorage.getItem(keyValue));
	        	var publicId = documento.AvatarId;

            	console.log("User is logged...");

				myApp.setAvatarPublicId(publicId);
				$.cloudinary.config({ cloud_name: 'dj51tmvrt', api_key: '531544743286888'});
				myApp.setAvatarUrl($.cloudinary.url(publicId));
				myApp.setAvatarTag("");

				console.log("public_id: " + app.getAvatarPublicId());
				console.log("url: " + app.getAvatarUrl());
				console.log("tag: " + app.getAvatarTag());

	        }
			myRoute.evalRoute("dashboard");
		}else{
			myApp.setAvatarTag("default");
			setAvatarPublicIdAndUrlByTag("default");
			myRoute.evalRoute("login");
		}
		
	};
	
	myApp.init = function(){
		$(document).ready(function(){
			myApp.initializeObj();
		});
	}();

	myApp.getAvatarTag = function(){return myApp.avatarTag};
	myApp.setAvatarTag = function(tag){this.avatarTag = tag};

	myApp.getAvatarUrl = function(){return myApp.avatarUrl};
	myApp.setAvatarUrl = function(url){this.avatarUrl = url};

	myApp.getAvatarPublicId = function(){return myApp.avatarPublicId};
	myApp.setAvatarPublicId = function(publicId){this.avatarPublicId = publicId};

	myApp.isLogged = function(){
		if (localStorage == null || localStorage.length == 0){
	        return false;
	    }
	    else{
	        var keyValue = localStorage.key(0);
	        if (keyValue != null){
	            return true;
	        }
	    }
	};

	myApp.loadNavbar = function(partialHtml){
		console.log("Loading... " + partialHtml + ".html");
		$("#navbar").load( "partials/" + partialHtml + ".html", function(){
			var keyValue = localStorage.key(0);
			initNavbar(keyValue);
		});
	};

	myApp.loadTemplate = function(partialHtml, objAvatar){
		console.log("Loading... " + partialHtml + ".html");
		$("#forInsert").load( "partials/" + partialHtml + ".html", function(){
			switch (partialHtml)
				{
					//inicializar login
					case "login": {
						initLogin();
						break;
					}

					//inicializar registrarse
					case "registrarse": {
						initRegistrarse(objAvatar);
						break;
					}

					//inicializar avatar
					case "avatar": {
						initAvatar(objAvatar.usuario);
						break;
					}

					//inicializar perfil
					case "perfil": {
						var keyValue = localStorage.key(0);
						initPerfil(keyValue, objAvatar);
						break;
					}

					//inicializar dashboard
					case "dashboard": {
						initDashboard();
						break;
					}
				}			
		});
	};

	return myApp;

}(route);