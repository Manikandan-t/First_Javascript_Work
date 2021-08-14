//Challenge 1 Daycount
function daycount(){
    var year=prompt("Your birth year");
    let days=(2021-year)*365;
    document.getElementById("result").innerHTML="You are "+days+" days old";
}
function reset(){
    document.getElementById("result").innerHTML=0;
}

//Challenge 2 Image Generator
function generator(){
    var image=document.createElement ('img');
    var div=document.getElementById("image-generator");
    image.src="https://wp-modula.com/wp-content/uploads/2018/12/gifgif.gif";    
    div.appendChild(image);
}

//Challenge 3 Rock Paper Scissor
function startgame(yourchoice){
    var humanchoice,botchoice;
    humanchoice=yourchoice.id;
    botchoice= positionChoice(index());
    result=decideWinner(humanchoice,botchoice);
    message =messageDisplay(result);
    frontDisplay(humanchoice,botchoice,message);

}

function index(){
    return Math.floor(Math.random()*3);
}

function positionChoice(value){
   return ['rock','paper','scissors'][value];
}

function decideWinner(yourchoice,computerchoice){
    var resultdatabase={
        'rock':{'scissors':1, 'rock':0.5, 'paper':0},
        'paper':{'scissors':0, 'rock':1, 'paper':0.5},
        'scissors':{'scissors':0.5, 'rock':0, 'paper':1},
    };
    var yourScore= resultdatabase[yourchoice][computerchoice];
    var computerScore=resultdatabase[computerchoice][yourchoice];

     return([yourScore,computerScore]);
}

function messageDisplay([yourchoice,computerchoice]){
    if(yourchoice===1){
        return{'message':'You Won!', 'color':'green'};
    }
    else if(yourchoice===0){
        return{'message':'You Lost', 'color':'red'};
    }
    else{
        return{'message':'Match Tied', 'color':'yellow'};
    }
}

function frontDisplay(humanImageChoice,botImageChoice,finalMessage){
    var imageDatabase={
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv=document.createElement('div');
    var botDiv =document.createElement('div');
    var messageDiv=document.createElement('div');

    humanDiv.innerHTML="<img src='" + imageDatabase[humanImageChoice]+ "' height=150 width=150>";
    botDiv.innerHTML="<img src='" + imageDatabase[botImageChoice]+ "' height=150 width=150>";
    messageDiv.innerHTML="<h1 style='color: " + finalMessage['color'] + "; font-size:60px; padding:30px; '>" + finalMessage['message'] + "</h1>"
    document.getElementById('flexbox-rps-div').appendChild(humanDiv);
    document.getElementById('flexbox-rps-div').appendChild(messageDiv);
    document.getElementById('flexbox-rps-div').appendChild(botDiv);
}

//Challenge 4 Change Buttons colour
var all_buttons=document.getElementsByTagName("button");

var all_items=[];
for(let i=0;i<all_buttons.length;i++){
    all_items.push(all_buttons[i].classList[1]);
}

function changeColour(youroption){
    if(youroption.value==='red'){
        colorRed();
    }
    else if(youroption.value==='green'){
        colorGreen();
    }
    else if(youroption.value==='reset'){
        colorReset();
    }
    else if(youroption.value==='random'){
        colorRandom();
    }
}

function colorRed(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}
function colorGreen(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function colorReset(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(all_items[i]);
    }
}

function colorRandom(){
    var choice=['btn-primary','btn-success','btn-warning','btn-danger'];

    for(let i=0;i<all_buttons.length;i++){
        let random=Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choice[random]);
    }
}

//Challenge 5 BlackJack
let blackjackgame={
    'you':{'scorespan':'#your-result','div':'#yourbox','score':0},
    'dealer':{'scorespan':'#bot-result','div':'#botbox','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardvalue':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,
};
const YOU=blackjackgame['you'];
const DEALER=blackjackgame['dealer'];
const HITSOUND=new Audio(".//sounds/swish.m4a");
const Winsound=new Audio(".//sounds/cash.mp3");
const Losesound=new Audio(".//sounds/aww.mp3");

document.querySelector("#hit-button").addEventListener('click',hitbutton);
document.querySelector("#stand-button").addEventListener('click',standbutton);
document.querySelector("#deal-button").addEventListener('click',dealbutton);

function hitbutton(){
    if(blackjackgame['isStand']===false){
        let card=randomCard();
        showcard(YOU,card);
        updateScore(card,YOU);
        showscore(YOU);
    }
}

function showcard(showit,card){
    if(showit['score']<=21){
    let cardImage=document.createElement('img');
    cardImage.src=`.//images/Blackjack/${card}.png`;
    document.querySelector(showit['div']).appendChild(cardImage);
    HITSOUND.play();
    }
}

function dealbutton(){
    if(blackjackgame['turnsOver']===true){
        blackjackgame['isStand']=false;
        let yourImage=document.querySelector('#yourbox').querySelectorAll('img');
        let dealerImage=document.querySelector("#botbox").querySelectorAll('img');
        for(let i=0;i<yourImage.length;i++){
            yourImage[i].remove();
        }
        for(let i=0;i<dealerImage.length;i++){
            dealerImage[i].remove();
        }
        YOU['score']=0;
        DEALER['score']=0;
        document.querySelector("#your-result").textContent=0;
        document.querySelector("#your-result").style.color="#ffffff";

        document.querySelector('#bot-result').textContent=0;
        document.querySelector("#bot-result").style.color="#ffffff";

        document.querySelector("#blackjack-result").textContent="Let's Play";
        document.querySelector("#blackjack-result").style.color='black';
        blackjackgame['turnsOver']=false;
    }
}

function randomCard(){
    let cardIndex=Math.floor(Math.random()*13);
    return blackjackgame['cards'][cardIndex];
}

function updateScore(card,updateit){
    if(card==='A'){
        //if adding 11 results in score of above 21 take 1 or take 11
        if(updateit['score'] + blackjackgame['cardvalue'][card][1] <= 21){
            updateit['score'] += blackjackgame['cardvalue'][card][1];
        }
        else{
            updateit['score'] += blackjackgame['cardvalue'][card][0];
        }
    }
    else{
    updateit['score'] += blackjackgame['cardvalue'][card];
    }
}

function showscore(myscore){
    if(myscore['score']<=21){
    document.querySelector(myscore['scorespan']).textContent=myscore['score'];
    }
    else{
    document.querySelector(myscore['scorespan']).textContent="BUST";
    document.querySelector(myscore['scorespan']).style.color='red';
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}

async function standbutton(){
    blackjackgame['isStand']=true;
    while(DEALER['score']<16 && blackjackgame['isStand']===true){
        let card=randomCard();
        showcard(DEALER,card);
        updateScore(card,DEALER);
        showscore(DEALER);
        await sleep(1000);
    }
    blackjackgame['turnsOver']=true;
    let Winner=findWinner();
     showWinner(Winner);
}

function findWinner(){
    let Winner;
    if(YOU['score']<=21){
        //dealer less than 21 or dealer bust or same score
        if(YOU['score']>DEALER['score'] || DEALER['score']>21){
            blackjackgame['wins']++;
            Winner=YOU;
        }
        else if(YOU['score'] < DEALER['score']){
            blackjackgame['losses']++;
            Winner=DEALER;
        }
        else if(YOU['score'] === DEALER['score']){
            blackjackgame['draws']++;
        }
    }
    //your score greater than 21 and dealer is less than 21 or bust
    else if(YOU['score']>21 && DEALER['score']<=21){
        blackjackgame['losses']++;
        Winner=DEALER;
    }
    else if(YOU['score']>21 && DEALER['score']>21){
        blackjackgame['draws']++;
    }
    return Winner;
}

function showWinner(Winner){
    let message,messageColor;
    if(blackjackgame['turnsOver']===true){
        if(Winner===YOU){
            document.querySelector('#wins').textContent=blackjackgame['wins'];
            message='You Win!';
            messageColor='green';
            Winsound.play();
        }
        else if(Winner===DEALER){
            document.querySelector('#losses').textContent=blackjackgame['losses'];
            message='You Lost!';
            messageColor='red';
            Losesound.play();
        }
        else{
            document.querySelector('#draws').textContent=blackjackgame['draws'];
            message='You Drew';
            messageColor='brown';
        }
        document.querySelector('#blackjack-result').textContent=message;
        document.querySelector('#blackjack-result').style.color=messageColor;
    }
}