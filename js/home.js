var curentUser = JSON.parse(localStorage.getItem('currentUser'));
var user = JSON.parse(localStorage.getItem(curentUser));
document.getElementById("welcome").innerText = "Welcome " + curentUser + " !";
document.getElementById("lastConnexion").innerHTML = "Last Connexion at " + user['LastConnexion'];
document.getElementById("scores").innerHTML = "Your Score: Trivia - " + user['Scores']['Trivia']+" Sudoku - "+ user['Scores']['Sudoku'];