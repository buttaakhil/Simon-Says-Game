let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;
let maxScore=0;

let btns=["red","green","yellow","purple"];

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        started=true;
        levelUp();
    }
});

let body=document.querySelector("body");
body.addEventListener("click",function(){
    if(started==false){
        started=true;
        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);

    gameFlash(randBtn);
}

function btnPress(){
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAnswer(userSeq.length-1);
}

function checkAnswer(idx){
    if(gameSeq[idx]===userSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,500);
        }
    }
    else{
        maxScore=level>maxScore?level:maxScore;
        h2.innerHTML=`Game Over! Your score was '${level}'<br>Highest score was "${maxScore}"<br><br>Press here or any key to start`;
        document.querySelector("body").style.color="red";
        setTimeout(function(){
            document.querySelector("body").style.color="black";
        },1000);
        setTimeout(reset,1000);
    }
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    level=0;
    started=false;
    gameSeq=[];
    userSeq=[];
}
