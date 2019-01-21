var up = document.getElementsByClassName("but");
// var down = document.getElementsByClassName("dugme");

var left = document.querySelector(".left");
var right = document.querySelector(".right");
var tro = document.querySelector(".trou");
var iks = document.querySelector(".iks");
var koc = document.querySelector(".kocka");
var kru = document.querySelector(".krug");
var resa = document.querySelector(".reset");

var arr = [0,0,0,0,0,0,0,0];

document.addEventListener("click", function(e){

    console.log(e.target.className);
    /* left joypad */
    if('up but' == e.target.className || e.target.className == 'fas fa-arrow-up'){
        arr[0]++;
    }
    if('left but' == e.target.className || e.target.className == 'fas fa-arrow-left'){
        arr[2]++;
    }
    if('right but' == e.target.className || e.target.className == 'fas fa-arrow-right'){
        arr[3]++;
    }
    if('down but' == e.target.className || e.target.className == 'fas fa-arrow-down'){
        arr[1]++;
    }


    /* Right joypad */
    if('trou but' == e.target.className || e.target.className == 'fas fa-caret-up'){
        arr[4]++;
    }
    if('iks but' == e.target.className || e.target.className == 'fas fa-times'){
        arr[5]++;
    }
    if('kocka but' == e.target.className || e.target.className == 'fas fa-square-full'){
        arr[6]++;
    }
    if('krug but' == e.target.className || e.target.className == 'fas fa-circle'){
        arr[7]++;
    }
    counter()

});

resa.addEventListener("click",reset);

function reset(){
    for(var i = 0; i < arr.length;i++){
        arr[i] = 0;
        document.getElementById("broj").innerHTML = "U:" + arr[0] + " D:" + arr[1] + " L:" + arr[2]+ " R:"
        + arr[3]+ " T:" +arr[4] + " X:" +arr[5] + " K:" + arr[6] +" KR:" +arr[7];
    }
};

function counter(){
    document.getElementById("broj").innerHTML = "U:" + arr[0] + " D:" + arr[1] + " L:" + arr[2]+ " R:"
    + arr[3]+ " T:" +arr[4] + " X:" +arr[5] + " K:" + arr[6] +" KR:" +arr[7];
};