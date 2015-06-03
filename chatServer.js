/**
 * Chat Server Source
 */
io.sockets.on('connection',function(socket){
	
	socket.on('making',function(data){
	  var newid = data.newid;
		var newpw = data.newpw;
		//아이디 및 비밀번호 텍스트 파일에 저장하기
	});
		
	
	socket.on('roommake',function(data){
	  // 로그인 하기
	});
	
	socket.on('message',function(data){
	  // 메세지 수신 및 송신
	});
	
	socket.on('disconnect', function () {
    // 연결 끝날 경우
	});
	
});

