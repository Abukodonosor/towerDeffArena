var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


var MasterSocket = require("./socketLogic/socketLib/Socket");
let webSoc = new MasterSocket();


var  GameWorld_vol1 = {
    displayServer:{
        Name: '',
        socketID: ''
    },
    players:{
        keys: [],
        all:{
            // 'socket_id':{
            //     x: 32,
            //     y: 32,
            //     color: random_rgba()
            // }
        }
    }
};


var playGROUND;
var playGroundSocket;

webSoc.onConnection( socket =>{
    console.log(socket.clientId);
    /* Server sending sockets to the client with specific purpose, client accept those with client.receiver method*/

    //server login and handle
    webSoc.event('ServerCredentials',socket, (pack)=>{
        GameWorld_vol1.displayServer.Name = pack.data.serverName;
        GameWorld_vol1.displayServer.socketID = socket.clientId;
        console.log(GameWorld_vol1);

        playGROUND = webSoc;
        playGroundSocket = socket;
        //main update gamearena stage
        setInterval(()=>{
            playGROUND.send('gameUPDATE', playGroundSocket, GameWorld_vol1.players.all);
        },1000/60);

    });

    /**********Client************/

    //client login and hangle
    webSoc.event('ClientCredentials',socket,(pac)=>{
        //add new player to playerHash
        GameWorld_vol1.players.all[socket.clientId] = {
            x: parseInt(Math.random()*400),
            y: parseInt(Math.random()*400),
            color:random_rgba()
        }
    });
    //update client movement
    webSoc.event('ClientUpdate',socket,(pac)=>{
        console.log(pac);
        GameWorld_vol1.players.all[socket.clientId].x = GameWorld_vol1.players.all[socket.clientId].x + pac.data.x;
        GameWorld_vol1.players.all[socket.clientId].y = GameWorld_vol1.players.all[socket.clientId].y + pac.data.y;

    });


    // setInterval(()=>{
    //     webSoc.send('supa', socket, {neki_podatci:"GDE 11111111111111111111"});
    // },500);


    // webSoc.send('krastavac', socket, {kolikoJE:"Veliki mi cuperak izraso."});

    // webSoc.event('UPDATE',socket,(data)=>{
    //     console.log("DOBRO je");
    //     console.log(data);
    //     setTimeout(()=>{
    //         webSoc.send('UPDATE', socket, {neki_podatci:"GDE SI BRE BARABO"});
    //     },5000);
    //
    // });
    webSoc.disconnect(socket, (msg)=>{
        console.log(msg);
        delete GameWorld_vol1.players.all[socket.clientId]
    });
});


function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}

module.exports = app;
