// Aaron Itzkovitz
// 4/24/18
// P6
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const wss = new WebSocketServer( { port: 5923 } );

clients = [];
clientCount = 0;
clientImages = [ 'illusion.jpg', 'illusion2.png', 'illusion3.jpg' ];

wss.on( 'listening', function(){
    console.log( 'listening on port 5923' );
});

// Send out change info 
wss.broadcast = function broadcast( data ){
  	wss.clients.forEach(function each( client ){
    	if ( client.readyState === WebSocket.OPEN ){
      		client.send( 
      			JSON.stringify({
					msgType	: 'gameData',
					'gameData' 	: data
				})
      		);
    	}
	});
};

// define listeners on initial connection
wss.on( 'connection', function( ws ){

	function sendClientId( id ){
		ws.send( JSON.stringify({
			msgType		: 'status',
			'id' 		: id,
			imageName 	: clientImages[ clientCount ]
		}));
	}

    ws.on( 'message', function( msg ){
        console.log( 'msg from client: ', msg );
        var msg = JSON.parse( msg );
        if ( msg.msgType == 'gameData' ){
        	keyUpdate = msg.data;
        	// get key
        	switch( keyUpdate ){
		   		case 'x':
		   			console.log( 'Logged an E' );
		   			wss.broadcast({
		   				direction 	: 'x',
		   				action		: 'rotation',
		   				idToChange	:  msg.senderId
		   			});
		   			break;
		   		case 'y':
		   			wss.broadcast({
		   				direction 	: 'y',
		   				action		: 'rotation',
		   				idToChange	:  msg.senderId
		   			});
		   			break;
		   		case 'z':
		   			wss.broadcast({
		   				direction 	: 'z',
		   				action		: 'rotation',
		   				idToChange	:  msg.senderId
		   			});
		   			break;
		   		case 'w':
		   			wss.broadcast({
		   				direction 	: 'w',
		   				action		: 'move',
		   				idToChange	:  msg.senderId
		   			});
		   			break;
		   		case 'a':
		   			wss.broadcast({
		   				direction 	: 'a',
		   				action		: 'move',
		   				idToChange	:  msg.senderId
		   			});
		   			break;
		   		case 's':
		   			wss.broadcast({
		   				direction 	: 's',
		   				action		: 'move',
		   				idToChange	:  msg.senderId
		   			});
		   			break;
		   		case 'd':
		   			wss.broadcast({
		   				direction 	: 'd',
		   				action		: 'move',
		   				idToChange	:  msg.senderId
		   			});
		   			break;
		   		case 'e':
		   			wss.broadcast({
		   				direction 	: 'e',
		   				action		: 'move',
		   				idToChange	:  msg.senderId
		   			});
		   			break;
		   		case 'c':
		   			wss.broadcast({
		   				direction 	: 'c',
		   				action		: 'move',
		   				idToChange	:  msg.senderId
		   			});
		   			break;
		   		default:
		   			console.log( "Didn't understand that." );
		   	}

        } else if( msg.msgType == 'status' ){

        	console.log( 'status from client: requesting client ID' );
        	sendClientId( clientCount.toString() );
        	clientCount++;

        } else {

        	console.log( 'did not understand the message.' );

        }
	});
});