const tiles = ["red","blue","yellow","green"];
let level = 0;
let sequence = [];
let humanSequence = [];



const startButton = $(".start");
const info = $(".info");
const levelInfo = $(".level-info");
const tileConatiner = $(".container");



function humanTurn(level){
    
    tileConatiner.removeClass("unclickable");
    let s;
    if(level>1)
    s="s";
    else
    s="";
    info.text("Your Turn: "+ level +" Tap"+s );
}




function nextStep(){
    const random = Math.floor(Math.random()*tiles.length);
    return tiles[random];
}

function activateTile(color){
    const tile = $("."+color);
    tile.addClass("pressed");
    const sound = new Audio("sounds/"+color+".mp3");
    sound.play();

    setTimeout(()=>{
        tile.removeClass("pressed");
    },300);
}


function playRound(nextSequence){
    nextSequence.forEach((color,index)=>{
        setTimeout(()=>{
            activateTile(color);
        },(index+1)*500);
    });
}




function nextRound(){
    level+=1;

    tileConatiner.addClass("unclickable");
    info.text("Wait for the computer");
    levelInfo.text("level "+level+" of 20");

    const nextSequence = [...sequence];
    nextSequence.push(nextStep());
    playRound(nextSequence);

    sequence = [...nextSequence];
    setTimeout(()=>{
        humanTurn(level);
    },level*500+500);
}



function resetGame(text){
    alert(text);
    location.reload();
}




function handleClick(tile){
    const index = humanSequence.push(tile)-1;
    $("."+tile).addClass("pressed");
    const sound = new Audio("sounds/"+tile+".mp3");
    sound.play();

    setTimeout(()=>{
        $("."+tile).removeClass("pressed");
    },300);

    const remainingTaps = sequence.length - humanSequence.length;

    if(humanSequence[index]!=sequence[index]){
        resetGame("Oops! You pressed the wrong tile.");
        return ;
    }

    if(humanSequence.length === sequence.length){
        if(humanSequence.length === 20){
            resetGame("Congrats! You completed all the levels");
            return ;
        }
        humanSequence = [];
        info.text("Success! Keep Going");
        setTimeout(()=>{
            nextRound();
        },1000);
        return ;
    }

    let s;
    if(remainingTaps >1)
    s="s";
    else
    s="";
    info.text("Your Turn: "+ remainingTaps +" Tap"+s);
}




function startGame(){
    startButton.addClass('hidden');
    info.removeClass('hidden');
    info.text("Wait for the computer");
    nextRound();
}

startButton.on("click",startGame);

tileConatiner.on("click",event =>{
    const {tile} = event.target.dataset;
    
    if(tile){
        handleClick(tile);
    }

});




