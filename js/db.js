//--------------DB functions--------------------

var db = "mcb";
var collection = "usuarios";
var apiKey = "hGf6YyAmFZfGbHdvtpoF8JsWuSe6nlzD";

function obtenerDocumento(usuario,callback){
    var objDatos = {"Usuario": usuario};
    $.ajax({ 
        url: "https://api.mlab.com/api/1/databases/" + db + "/collections/" + collection + "?q=" + JSON.stringify(objDatos) + "&fo=true&apiKey=" + apiKey,
        type: "GET",
        contentType: "application/json",
        success: function (data){
            //console.log("function obtenerDocumento - success: " + data);
            callback(data);
        },
        error: function (xhr, status, err){
            console.log("function obtenerDocumento - error: " + status);
            callback("error");
        }
    });
};

function insertarDocumento(documento, callback){
    $.ajax( { 
        url: "https://api.mlab.com/api/1/databases/" + db + "/collections/" + collection + "?apiKey=" + apiKey,
        data: JSON.stringify(documento),
        type: "POST",
        contentType: "application/json",
        success: function (data){
            //console.log("function insertarDocumento - success: " + data);
            callback(data);
        },
        error: function (xhr, status, err){
            console.log("function insertarDocumento - error: " + status);
            callback("error");
        }
    } );
};

function actualizarDocumento(id, documento, callback){
    $.ajax( { 
        url: "https://api.mlab.com/api/1/databases/" + db + "/collections/" + collection + "/" + id + "?apiKey=" + apiKey,
        data: JSON.stringify( { "$set" : documento } ),
        type: "PUT",
        contentType: "application/json",
        success: function (data) { 
            //console.log("function actualizarDocumento - success: " + data);
            callback(data);
        },
        error: function (xhr, status, err) { 
            console.log("function actualizarDocumento - error: " + status);
            callback("error");
        }  
    } );
}
//--------------DB functions--------------------