'use strict';

(function(document){


    var resa = document.querySelector(".reset");
    var arr = [0,0,0,0,0,0,0,0];

    document.addEventListener("touchstart", pressingDown, false);
    document.addEventListener("touchend", notPressingDown, false);

    let PlayerDirection = {
        up: false,
        down: false,
        left: false,
        right: false,
    };

    let PlayerVelocity = 3;
    let PlayerCoordinates = {
        x: 0,
        y: 0,
    };

    function pressingDown(e){
        let targetedClass = e.target.className
        // console.log(e.target.className);
        /* left joypad */
        if('up but' == e.target.className || e.target.className == 'fas fa-arrow-up'){
            PlayerDirection.up = true;
        }
        if('left but' == e.target.className || e.target.className == 'fas fa-arrow-left'){
            PlayerDirection.left = true;
        }
        if('right but' == e.target.className || e.target.className == 'fas fa-arrow-right'){
            PlayerDirection.right= true;
        }
        if('down but' == e.target.className || e.target.className == 'fas fa-arrow-down'){
            PlayerDirection.down = true;
        }
    }

    function notPressingDown(e){
        let targetedClass = e.target.className
        // console.log(e.target.className);
        /* left joypad */
        if('up but' == e.target.className || e.target.className == 'fas fa-arrow-up'){
            PlayerDirection.up = false;
        }
        if('left but' == e.target.className || e.target.className == 'fas fa-arrow-left'){
            PlayerDirection.left = false;
        }
        if('right but' == e.target.className || e.target.className == 'fas fa-arrow-right'){
            PlayerDirection.right= false;
        }
        if('down but' == e.target.className || e.target.className == 'fas fa-arrow-down'){
            PlayerDirection.down = false;
        }
    }



    // document.addEventListener("click", function(e){
    //
    //     let targetedClass = e.target.className;
    //     console.log(e.target.className);
    //     /* left joypad */
    //     if('up but' == e.target.className || e.target.className == 'fas fa-arrow-up'){
    //         arr[0]++;
    //     }
    //     if('left but' == e.target.className || e.target.className == 'fas fa-arrow-left'){
    //         arr[2]++;
    //     }
    //     if('right but' == e.target.className || e.target.className == 'fas fa-arrow-right'){
    //         arr[3]++;
    //     }
    //     if('down but' == e.target.className || e.target.className == 'fas fa-arrow-down'){
    //         arr[1]++;
    //     }
    //
    //
    //     /* Right joypad */
    //     if('trou but' == e.target.className || e.target.className == 'fas fa-caret-up'){
    //         arr[4]++;
    //     }
    //     if('iks but' == e.target.className || e.target.className == 'fas fa-times'){
    //         arr[5]++;
    //     }
    //     if('kocka but' == e.target.className || e.target.className == 'fas fa-square-full'){
    //         arr[6]++;
    //     }
    //     if('krug but' == e.target.className || e.target.className == 'fas fa-circle'){
    //         arr[7]++;
    //     }
    //     counter();
    //
    // });


    function enstablishConnection(){

        var client = new MasterSocket({ip:window.config.ip, port: window.config.port});

        client.onSocketOpen((socket)=>{
            // // connection is opened and ready to use
            console.log("client connected");
            client.send('ClientCredentials',{});

        });

        // // the data you receive from server can be found in some of client.receiver methods
        client.connection((socket)=>{

        });

        setInterval(()=>{


            updatePlayerCoordinates();
            client.send('ClientUpdate',{
                x: PlayerCoordinates.x,
                y: PlayerCoordinates.y
            });
        },1000/60);


        client.onClose( err=>{
            console.log("This client get disconnected form server!")
            enstablishConnection();
        });

        client.onerror =  (error)=>{
            console.log("Some Error occurred!!");
        }

    }

    enstablishConnection();

    function updatePlayerCoordinates(){
        PlayerCoordinates.x = 0;
        PlayerCoordinates.y = 0;
        if(PlayerDirection.up == true){
            PlayerCoordinates.y = -PlayerVelocity;
        }
        if(PlayerDirection.down == true){
            PlayerCoordinates.y = PlayerVelocity;
        }
        if(PlayerDirection.left == true){
            PlayerCoordinates.x = -PlayerVelocity;
        }
        if(PlayerDirection.right == true){
            PlayerCoordinates.x = PlayerVelocity;
        }
    }







    resa.addEventListener("click",reset);

    function reset(){
        for(var i = 0; i < arr.length;i++){
            arr[i] = 0;
            document.getElementById("broj").innerHTML = "U:" + arr[0] + " D:" + arr[1] + " L:" + arr[2]+ " R:"
                + arr[3]+ " T:" +arr[4] + " X:" +arr[5] + " K:" + arr[6] +" KR:" +arr[7];
        }
    }

    function counter(){
        document.getElementById("broj").innerHTML = "U:" + arr[0] + " D:" + arr[1] + " L:" + arr[2]+ " R:"
            + arr[3]+ " T:" +arr[4] + " X:" +arr[5] + " K:" + arr[6] +" KR:" +arr[7];
    }

    function toggleFullScreen() {
        var doc = window.document;
        var docEl = doc.documentElement;

        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            requestFullScreen.call(docEl);
        }
        else {
            cancelFullScreen.call(doc);
        }
    }
    var fsBut = document.getElementById("goFS");
    fsBut.addEventListener("click",toggleFullScreen);
    function holding(){
        while(mousedown == true){
            arr[0]++;
        }
    }


}(document));