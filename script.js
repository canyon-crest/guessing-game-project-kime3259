//css, disable or enable hot/cold, disallow same guess, optional guess limit, guess history
let level, answer, score;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
date.textContent = time();
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);
setInterval(time, 1000);
time();
function play(){
    let named = document.getElementById("named").value.toLowerCase();
    let name = named.charAt(0).toUpperCase() + named.slice(1);
    if(name == ""){
        msg.textContent = "Please type in a name";
        return;
    }
    score = 0;
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    for(let i = 0; i < levelArr.length; i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }
    msg.textContent = name + ", guess a number from 1 to " + level;
    answer = Math.floor(Math.random()*level) + 1;
    guess.placeholder = answer;
}
function makeGuess(){
    let named = document.getElementById("named").value.toLowerCase();
    let name = named.charAt(0).toUpperCase() + named.slice(1);
    if(name == ""){
        msg.textContent = "Please type in a name";
        return;
    }
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
        msg.textContent = name + ", enter a VALID number from 1 to " + level;
        return;
    }
    score++;
    if(userGuess > answer){
        msg.textContent = name + " has guessed too high, try again.";
    }
    else if(userGuess < answer){
        msg.textContent = name + " has guessed too low, try again.";
    }
    else{
        if(score != 1){
            msg.textContent = "Correct! " + name + " guessed the number in " + score + " tries! Press play to play again.";
        }
        else{
            msg.textContent = "Correct! " + name + " guessed the number in 1 try! Press play to play again.";
        }
        updateScore();
        reset();
    }
}
function reset(){
    guessBtn.disabled = true;
    guess.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    playBtn.disabled = false;
    for(let i = 0; i < levelArr.length; i++){
        levelArr[i].disabled = false;
    }
}
function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a, b) => a - b);
    let lb = document.getElementsByName("leaderboard");
    wins.textContent = "Total wins: " + scoreArr.length;
    let sum = 0;
    for(let i = 0; i < scoreArr.length; i++){
        sum += scoreArr[i];
        if(i < lb.length){
            lb[i].innerHTML = scoreArr[i];
        }
    }
    let avg = sum/scoreArr.length;
    avgScore.textContent = "Average Score: " + avg.toFixed(2);
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