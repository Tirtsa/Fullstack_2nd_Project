//Page show the score of users
//set header
var curentUser = JSON.parse(localStorage.getItem('currentUser'));
if(curentUser[0]=="notConnect"){
  alert("User not Connect:(");
  location.replace("index.html");
}
else{
  var user = JSON.parse(localStorage.getItem(curentUser));
  document.getElementById("welcome").innerText = "Welcome " + curentUser + " !";
  document.getElementById("lastConnexion").innerHTML = "Last Connexion at " + user['LastConnexion'];
  document.getElementById("scores").innerHTML = "Your Score: Trivia - " + user['Scores']['Trivia']+" Sudoku - "+ user['Scores']['Sudoku'];
}

//sort users by scores
var user;
var name;
var items = { ...localStorage };
delete items.currentUser;
for (item in items) {
  items[item] = JSON.parse(items[item]);
}

//Trivia Scores
let keys = Object.keys(items);
keys.sort(function (a, b) { return Number(items[b]["Scores"]["Trivia"])- Number(items[a]["Scores"]["Trivia"]) });
for (i = 0; i < 6 && keys.length>i; i++) {
  document.getElementById("win" + (i + 1)).innerHTML = String(keys[i]);
  document.getElementById("grade" + (i + 1)).innerHTML = String(items[keys[i]]["Scores"]["Trivia"]);
  document.getElementsByClassName("bar-" + (i + 1))[0].style.width = (items[String(keys[i])]["Scores"]["Trivia"]/1.2)%100 + "%";
}
//Sudoku Scores
keys.sort(function (a, b) { return items[b]["Scores"]["Sudoku"] - items[a]["Scores"]["Sudoku"] });
for (i = 0; i < 6 && keys.length>i; i++) {
  document.getElementById("win" + (i + 1)+'s').innerHTML = String(keys[i]);
  document.getElementById("grade" + (i + 1)+'s').innerHTML = String(items[keys[i]]["Scores"]["Sudoku"]);
  document.getElementsByClassName("bar-" + (i + 1)+'s')[0].style.width = (items[String(keys[i])]["Scores"]["Sudoku"])/20 + "%";
}
