io.sockets.on('connection',function(socket){
	socket.on('making',function(data){
		var newid = data.newid;
		var newpw = data.newpw;
		fs.readFile(newid+'.txt','utf8',function(err,data){
			if(!err){
				console.log('already_Exist');
				io.sockets.emit('R_making_no',null);
			}
			else{
				fs.writeFile(newid+'.txt',newpw,function(err){
					if(!err){
						console.log('success');
						io.sockets.emit('R_making_yes',null);
					}else{}
				});
			}
		});
	});
	socket.on('roommake',function(data){
		var roomname = data.roomname;
		var checkid = data.nickname;
		var checkpw = data.pw;
		console.log(data.nickname);
		fs.readFile(data.nickname+'.txt','utf8',function(err,data){
			if(!err){
				if(data ==checkpw){
					socket.join(roomname);
					socket.set('room',roomname);
					socket.set('nickname',checkid);		
					socket.get('nickname',function(err,name){
						io.sockets.emit('roomlist',{"roomdata":io.sockets.manager.rooms,"clientid":socket.id,"nickname":name});
						socket.get("room",function(err,room){
							io.sockets.in(room).emit('intro',name);
						});
					});
					console.log('success2');
				}else{
					io.sockets.emit('error',null);
				}
				
			}else{
				io.sockets.emit('error',null);
				console.log('fail');
			}
		});
	});
	socket.on('message',function(data){
		socket.get('nickname',function(err,name){
			socket.get('room',function(err,room){
				io.sockets.in(room).emit('message_send',{'msg':data.msg,'from':name});
			});
		});
	});
	socket.on('disconnect', function () {
		socket.get('nickname',function(err,nickname){
			socket.get('room',function(err,room){
				io.sockets.in(room).emit('message_send_disconnect',{'msg':'','from':nickname});
			});
		});
		io.sockets.emit('room_research',null);
	});
});

