let level, answer, score, start, sw, userGuess;
const levelArr = document.getElementsByName("level");
const guessArr = [];
const scoreArr = [];
const lossArr = [];
const timeArr = [];
let guesslim = false;
let ranout = false;
let hotcold = false;
let showr = false;
let playing = false;
let lost = false;
for(let i = 0; i < levelArr.length; i++){
    if(levelArr[i].checked){
        level = levelArr[i].value;
    }
    levelArr[i].disabled = false;
}
let max = level + 1;
let min = 0;
let gl = Math.ceil(Math.log2(level));
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
giveUp.addEventListener("click", quit);
glimit.addEventListener("click", gtoggle)
hc.addEventListener("click", hctoggle);
r.addEventListener("click", rangetoggle);
setInterval(time, 1000);
time();
setInterval(timer, 100);
timer();
function play(){
    start = Date.now();
    let named = document.getElementById("named").value.toLowerCase();
    let pname = named.charAt(0).toUpperCase() + named.slice(1);
    if(pname == ""){
        msg.textContent = "Please type in a name";
        return
    }
    playing = true;
    score = 0;
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    giveUp.disabled = false;
    glimit.disabled = true;
    hc.disabled = true;
    r.disabled = true;
    max = level + 1;
    min = 0;
    gl = Math.ceil(Math.log2(level));
    for(let i = 0; i < levelArr.length; i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }
    if(guesslim){
        gleft.textContent = "Guesses Left: " + gl;
    }
    if(showr){
        interval.textContent = "Range: [1, " + level + "]";
    }
    msg.textContent = pname + ", guess a number from 1 to " + level;
    answer = Math.floor(Math.random()*level) + 1;
}
function makeGuess(){
    let named = document.getElementById("named").value.toLowerCase();
    let pname = named.charAt(0).toUpperCase() + named.slice(1);
    if(pname == ""){
        msg.textContent = "Please type in a name";
        return;
    }
    userGuess = Number(guess.value);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
        msg.textContent = pname + ", enter a VALID number from 1 to " + level;
        return;
    }
    for(let i = 0; i < guessArr.length; i++){
        if(userGuess == guessArr[i]){
            msg.textContent = pname + ", you've already guessed " + userGuess;
            return;
        }
    }
    guessArr.push(userGuess);
    score++;
    if(userGuess > answer){
        msg.textContent = pname + " has guessed " + userGuess +  ", which is too high. Try again";
        guesslimit();
        if(gl == 0){
            msg.textContent = pname + " ran out of guesses and lost";
            ranout = true;
            quit();
            return;
        }
    }
    else if(userGuess < answer){
        msg.textContent = pname + " has guessed " + userGuess + ", which is too low. Try again";
        guesslimit();
        if(gl == 0){
            msg.textContent = pname + " ran out of guesses and lost.";
            ranout = true;
            quit();
            return;
        }
    }
    else{
        msg.textContent = msg.textContent = "Correct! " + pname + " guessed the number, " + answer + " in";
        if(score != 1){
            msg.textContent += score + " tries! Your score was";
        }
        else{
            msg.textContent += "1 try! Your score was";
        }
        if(score == 1){
            msg.textContent += " excellent. ";
        }
        else if(score <= Math.ceil(Math.log2(level))/2){
            msg.textContent += " great. ";
        }
        else if(score <= Math.ceil(Math.log2(level))){
            msg.textContent += " good. ";
        }
        else if(score <= Math.ceil(Math.log2(level))*3/2){
            msg.textContent += " okay. ";
        }
        else if(score <= level){
            msg.textContent += " bad. ";
        }
        else{
            msg.textContent += " terrible. ";
        }
        msg.textContent += "Press play to play again";
        updateScore();
        reset();
    }
    hcmode();
    range();
}
function reset(){
    guessBtn.disabled = true;
    guess.disabled = true;
    giveUp.disabled = true;
    glimit.disabled = false;
    hc.disabled = false;
    r.disabled = false;
    playing = false;
    start = 0;
    guess.value = "";
    playBtn.disabled = false;
    guessArr.length = 0;
    for(let i = 0; i < levelArr.length; i++){
        levelArr[i].disabled = false;
    }
}
function quit(){
    let named = document.getElementById("named").value.toLowerCase();
    let pname = named.charAt(0).toUpperCase() + named.slice(1);
    if(!ranout){
        msg.textContent = pname + " gave up and lost.";
    }
    msg.textContent += " The number was " + answer;
    ranout = false;
    for(let i = 0; i < levelArr.length; i++){
    if(levelArr[i].checked){
        level = levelArr[i].value;
    }
    }
    lossArr.push(level);
    score = level;
    lost = true;
    updateScore();
    reset();
}
function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a, b) => a - b);
    let lb = document.getElementsByName("leaderboard");
    won = scoreArr.length - lossArr.length;
    wins.textContent = "Total Wins: " + won;
    losses.textContent = "Total Losses: " + lossArr.length;
    let sum = 0;
    for(let i = 0; i < scoreArr.length; i++){
        sum += parseInt(scoreArr[i]);
        if(i < lb.length){
            lb[i].innerHTML = scoreArr[i];
        }
    }
    let avg = sum/scoreArr.length;
    avgScore.textContent = "Average Score: " + avg.toFixed(2);
    if(!lost){
        timeArr.push(sw);
    }
    lost = false;
    let sumt = 0;
    for(let i = 0; i < timeArr.length; i++){
        sumt += Number(timeArr[i]);
    }
    if(scoreArr.length == 0){
        sumt = "";
    }
    let avgt = (Number(sumt/won)).toFixed(2);
    if(isNaN(avgt)){
        avgt = "";
    }
    avgTime.textContent = "Average Time: " + avgt;
}
function timer(){
    let named = document.getElementById("named").value.toLowerCase();
    let pname = named.charAt(0).toUpperCase() + named.slice(1);
    if(pname == ""){
        playing = false;
    }
    if(playing){
        sw = (Date.now() - start)/1000;
        if(isNaN(sw)){
            sw = "";
        }
        stopwatch.textContent = "Game Time: " + sw.toFixed(1);
    }
}
function time(){
    let d = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[d.getMonth()];
    let day = d.getDate();
    if(day == 1 || day == 11 || day == 21|| day == 31){
        day += "st";
    }
    else if(day == 2 || day == 12 || day == 22){
        day += "nd";
    }
    else if(day == 3 || day == 13 || day == 23){
        day += "rd";
    }
    else{
        day += "th";
    }
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();
    let ampm = "";
    if(hour >= 12){
        ampm = " PM";
    }
    else{
        ampm += " AM";
    }
    if(minute < 10){
        minute = "0" + minute;
    }
    if(second < 10){
        second = "0" + second;
    }
    const nowTime = month + " " + day + ", " + year + ", " + hour % 12 + ":" + minute + ":" + second + ampm;
    date.textContent = nowTime;
}
function hctoggle(){
    if(!hotcold){
        hc.textContent = "Hot/Cold Mode: On";
    }
    else{
        hc.textContent = "Hot/Cold Mode: Off";
    }
    hotcold = !hotcold;
}
function hcmode(){
    if(hotcold){
        let userGuess = parseInt(guess.value);
        let dist = Math.abs(answer - userGuess);
        if(dist == 0){
            return;
        }
        else if(dist < level/8){
            msg.textContent += " (hot)";
        }
        else if(dist < level/4){
            msg.textContent += " (lukewarm)";
        }
        else if(dist < level*3/8){
            msg.textContent += " (cool)";
        }
        else if(dist < level){
            msg.textContent += " (cold)";
        }
        else{
            return;
        }
    }
}
function rangetoggle(){
    if(!showr){
        r.textContent = "Show Narrowed Down Range: On";
        interval.textContent = "Range: ";
    }
    else{
        r.textContent = "Show Narrowed Down Range: Off";
        interval.textContent = "";
    }
    showr = !showr;
}
function range(){
    if(showr){
        if(userGuess == answer){
            return;
        }
        else if(userGuess > answer && userGuess < max){
            max = userGuess;
        }
        else if(userGuess < answer && userGuess > min){
            min = userGuess;
        }
        if(min != 0){
            interval.textContent = "Range: (" + min;
        }
        else{
            interval.textContent = "Range: [1";
        }
        interval.textContent += ", ";
        let asdf = false;
        for(let i = 0; i < guessArr.length; i++){
            if(guessArr[i] == max){
                asdf = true;
            }
        }
        if(max != (level + 1) && asdf == true){
            interval.textContent += max + ")";
        }
        else{
            interval.textContent += level + "]";
        }
    }
    else{
        interval.textContent = "";
    }
}
function gtoggle(){
    if(!guesslim){
        glimit.textContent = "Have Guess Limit: On";
        gleft.textContent = "Guesses Left: " + gl;
    }
    else{
        glimit.textContent = "Have Guess Limit: Off";
        gleft.textContent = "";
    }
    guesslim = !guesslim;
}
function guesslimit(){
    if(guesslim){
        if(userGuess != answer){
            gl--;
            gleft.textContent = "Guesses Left: " + gl;
        }
    }
}