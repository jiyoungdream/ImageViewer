var domain = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');

function request(type, url, jsonParam, successCallback, failCallback) {
	jQuery.ajax({
		type : type,
		url : domain + url,
		data : jsonParam,
		datatype : "JSON",
		success : function(obj) {
			var data = JSON.parse(obj);
			console.log(data);
			
		},
		complete : function(data) {// 응답이 종료되면 실행, 잘 사용하지않는다
//			console.log(data);
		},
		error : function(xhr, status, error) {
			alert("ERROR!!!");
		}
	});
}



