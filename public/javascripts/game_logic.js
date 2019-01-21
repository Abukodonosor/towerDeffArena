'use strict';


const game = function(){

    const WIDTH = 1000;
    const HEIGHT = 800;

    let canvas = document.getElementById("screen");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    let ctx = canvas.getContext('2d');


    function Run(){
        main();
    }

    function main(){

        // updatePlayer(player);
        clearScreen(ctx);

        drawPlayers(ctx);
        // drawPlayer(ctx, player);

        requestAnimationFrame(main);
    }


    function clearScreen(ctx){
        ctx.fillStyle = "black";
        ctx.fillRect( 0, 0, WIDTH, HEIGHT);
    }

    function drawPlayer(ctx, player){
        ctx.fillStyle = player.color;
        ctx.fillRect( player.x, player.y, player.width, player.height);
    }


    /* Player directions */

    var player = {
        x: 200,
        y: 200,
        width: 10,
        height: 10,
        color: '#009be2',
        speed: 6,
    };

    var allPlayers;

    //render all players
    function drawPlayers(ctx){
        for (let item in allPlayers){
            let player = allPlayers[item];
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x,player.y,10,10);
        }
    }
    //
    // function updatePlayer(player){
    //     if( PlayerDirections.top == true)
    //         player.y -= player.speed;
    //     if( PlayerDirections.bottom == true )
    //         player.y += player.speed;
    //     if( PlayerDirections.left == true)
    //         player.x -= player.speed;
    //     if( PlayerDirections.right == true)
    //         player.x += player.speed;
    // }
    //
    // var PlayerDirections = {
    //     top: false,
    //     bottom: false,
    //     right: false,
    //     left: false
    // };
    //
    // document.addEventListener("keydown", keyDownHandler, false);
    // document.addEventListener("keyup", keyUpHandler, false);
    //
    // function keyDownHandler(e){
    //     if(e.keyCode == 65)
    //         PlayerDirections.left = true;
    //     if(e.keyCode == 68)
    //         PlayerDirections.right = true;
    //     if(e.keyCode == 87)
    //         PlayerDirections.top = true;
    //     if(e.keyCode == 83)
    //         PlayerDirections.bottom = true;
    //
    //     // console.log(e.keyCode);
    // }
    //
    // function keyUpHandler(e){
    //     if(e.keyCode == 65)
    //         PlayerDirections.left = false;
    //     if(e.keyCode == 68)
    //         PlayerDirections.right = false;
    //     if(e.keyCode == 87)
    //         PlayerDirections.top = false;
    //     if(e.keyCode == 83)
    //         PlayerDirections.bottom = false;
    // }

    function enstablishConnection(){

        var client = new MasterSocket({ip:window.config.ip, port: window.config.port});

        client.onSocketOpen((socket)=>{
            // // connection is opened and ready to use
            console.log("socket PLAYGROUND is in the GAME");
            client.send('ServerCredentials',{
                serverName: "playground1",
                socketId: ''
            });

        });


        // // the data you receive from server can be found in some of client.receiver methods
        client.connection((socket)=>{

            client.receiver('gameUPDATE',socket,(data)=>{
                // console.log("DOBRO je");
                // console.log(data);
                allPlayers = data.gameUPDATE;
                console.log(data)
                // player.x++;
                // player.y++;
            });


        });

        client.onClose( err=>{
            console.log("This client get disconnected form server!")
            enstablishConnection();
        });

        client.onerror =  (error)=>{
            console.log("Some Error occurred!!");
        }

    }

    enstablishConnection();

    return {
        Run: Run
    }

}();

