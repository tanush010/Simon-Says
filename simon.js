let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "blue", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let highScore = 0;

document.addEventListener("keypress", function() {
    if(started == false)
    {
        started = true;
        console.log(started);
        levelUp(); 
    }
});

function levelUp() 
{
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIndex];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    btnFlash(randomBtn);
}

function btnFlash(btn)
{
    btn.classList.add("flash");
    setTimeout(function()
    {
        btn.classList.remove("flash");
    }, 250)
}

function checkAns(idx)
{
    if(userSeq[idx] == gameSeq[idx])
    {
        if(userSeq.length == gameSeq.length)
        {
            setTimeout(levelUp, 1000);
        }
        
    }
    else
    {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b>.<br> Press Any Key to Restart`;
        h2.style.fontSize = "1.2rem";
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        } , 100);
        if(level > highScore)
        {
            highScore = level;
        }
        let span = document.querySelector("#high-score");
        span.innerHTML = `<b>${highScore}</b>`;
        reset();
    }
}

function btnPress()
{
    let btn = this;
    btnFlash(btn);
    let userColour = btn.getAttribute("id");
    userSeq.push(userColour);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btnss of allBtns)
{
    btnss.addEventListener("click", btnPress);
}

function reset()
{
    userSeq = [];
    gameSeq = [];
    started = false;
    level = 0;
}