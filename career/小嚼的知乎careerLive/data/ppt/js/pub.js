var redis    = require('redis').createClient()
  , memcache = require('memcache')
  , server   = require('http').createServer()
  , io       = require('socket.io').listen(server)
  , cookie   = require('cookie')
  , sockets  = {};

mcClient = new memcache.Client()
mcClient.connect();

server.listen(8000);
io.set('authorization', function(handshake, callback)
{
  var cookies = cookie.parse(handshake.headers.cookie);
  console.log("session"+cookies.PHPSESSID);
  sess = {};
  sess['phpsessid'] = cookies.PHPSESSID; 
  handshake.session = sess;
  console.log(handshake.session.phpsessid);
  callback(null,true);
});

//calculate object count
function count(o){
        var t = typeof o;
        if(t == 'string'){
                return o.length;
        }else if(t == 'object'){
                var n = 0;
                for(var i in o){
                        n++;
                }
                return n;
        }
        return false;
}

io.sockets.on('connection', function(socket) 
{
  var session = socket.handshake.session;
  console.log('Received connection from user:', session.phpsessid);
  sockets[session.phpsessid] = socket;
  //console.log(socket);
  console.log("-----------------------------");
  console.log(count(sockets));
  console.log("-----------------------------");
});

io.on('connection', function(socket){
  socket.on('event', function(data){});
  socket.on('disconnect', function(){
     console.log("+++++++++++++++++++++++++ disconnect ++++++++++++++++++++++");
     var session = socket.handshake.session;
     sockets[session.phpsessid] = socket;
     sockets[session.phpsessid] = null;
  });
});

io.sockets.on('disconnect', function(socket){
  socket.manager.transports[socket.id].socket.setTimeout(15000);
  console.log("+++++++++++++++++++++++++ disconnect ++++++++++++++++++++++");
  var session = socket.handshake.session;
  sockets[session.phpsessid] = socket;
});

redis.subscribe("pub_all_user");
redis.subscribe("pub_single_user");
redis.on("message",function(channel,message){
    console.log("client channel---"+channel+": "+message);
    if(channel == "pub_all_user"){
        console.log("进去群发状态"+message);
        io.emit('news','sdddddddddddddddddddd');
        /**
        for(sess in sockets){
            console.log(sess);
            sockets[sess].emit('news',{'type':'chat','msg':message});
        }
        **/
    }
    if(channel == "pub_single_user"){
        console.log("进入单发状态"+message);
        single_user = JSON.parse(message);  
        user_id = single_user['user_id'];
        if(user_id > 0){
            mcClient.get('sess_user_'+user_id,function(error,result){
                if(error){

                }else if(result){
                    console.log("单发的PHPSESSID-------------------"+result);
                    sockets[result].emit('news',message);
                }else{

                } 
            });  
        }
        //sockets[sess].emit('news',{'type':'chat','msg':message});
    }
});

