var game = function(){

    const WIDTH = 1000;
    const HEIGHT = 800;

    var canvas = document.getElementById("screen");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    ctx = canvas.getContext('2d');


    function Run(){
        main();
    }

    function main(){

        updatePlayer(player);
        clearScreen(ctx);
        
        drawPlayer(ctx, player);
        
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
    }

    function updatePlayer(player){
        if( PlayerDirections.top == true)
            player.y -= player.speed;
        if( PlayerDirections.bottom == true )
            player.y += player.speed;
        if( PlayerDirections.left == true)
            player.x -= player.speed;
        if( PlayerDirections.right == true)
            player.x += player.speed;
    }

    var PlayerDirections = {
        top: false,
        bottom: false,
        right: false,
        left: false
    };

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e){
        if(e.keyCode == 65)
            PlayerDirections.left = true;
        if(e.keyCode == 68)
            PlayerDirections.right = true;
        if(e.keyCode == 87)
        PlayerDirections.top = true;
        if(e.keyCode == 83)
            PlayerDirections.bottom = true;
    
        console.log(e.keyCode);
    }

    function keyUpHandler(e){
        if(e.keyCode == 65)
            PlayerDirections.left = false;
        if(e.keyCode == 68)
            PlayerDirections.right = false;
        if(e.keyCode == 87)
        PlayerDirections.top = false;
        if(e.keyCode == 83)
            PlayerDirections.bottom = false;   
    }

    
    return {
        Run: Run
    }

}();

game.Run();

