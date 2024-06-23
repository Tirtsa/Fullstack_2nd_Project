
var numSelected = null;
var tileSelected = null;
var levelSelected = null;

var score = 100;

var levels = ['easy', 'medium', 'expert']

var boards = {
    easy:[
        "1497----6",
        "-6----4-2",
        "-2-4-67--",
        "5---31-8-",
        "-3-6-9-2-",
        "-8-54---3",
        "--71-2-4-",
        "2-3----7-",
        "6----8291"
        ],
    medium:[
        "--74916-5",
        "2---6-3-9",
        "-----7-1-",
        "-586----4",
        "--3----9-",
        "--62--187",
        "9-4-7---2",
        "67-83----",
        "81--45---"
    ],
    expert:[
        "2------4-",
        "------5--",
        "-1-6-4-38",
        "1--74--89",
        "--9-8-1--",
        "37--95--4",
        "89-4-7-1-",
        "--2------",
        "-3------7"
    ],
}

var solutions = {
    easy:[
            "149725836",
            "765893412",
            "328416759",
            "576231984",
            "431689527",
            "982547163",
            "897162345",
            "213954678",
            "654378291"
        ],
    medium:[
            "387491625",
            "241568379",
            "569327418",
            "758619234",
            "123784596",
            "496253187",
            "934176852",
            "675832941",
            "812945763"
        ],
    expert:[
            "283519746",
            "964873521",
            "517624938",
            "156742389",
            "429386175",
            "378195264",
            "895437612",
            "742961853",
            "631258497"
        ],
}


window.onload = function() {
    setLevel(); 
}

//Display levels
function setLevel() {
    // Levels easy-medium-expert
    for (let i = 0; i < levels.length; i++) {
        let level = document.createElement("div");
        level.id = levels[i]
        level.innerText = levels[i];
        level.addEventListener("click", selectLevel);
        level.classList.add("level");
        document.getElementById("levels").appendChild(level);
    }
}

// Action when level selected - call function to display the game
function selectLevel() {
    if (levelSelected != null) {
        levelSelected.classList.remove("level-selected");
    }
    levelSelected = this;
    levelSelected.classList.add("level-selected");
    setGame();
}

// Display board and digits
function setGame() {
    // Score
    score = 100;

    // Digits 1-9
    if (document.getElementById("digits").childElementCount == 0) {
        for (let i = 1; i <= 9; i++) {
            //<div id="1" class="number">1</div>
            let number = document.createElement("div");
            number.id = i
            number.innerText = i;
            number.addEventListener("click", selectNumber);
            number.classList.add("number");
            document.getElementById("digits").appendChild(number);
        }
    }

    // In case of reload, clear the board before insert a new
    var myBoard = document.getElementById("board")
    if (myBoard.childElementCount !== 0) {
        while (myBoard.lastChild) {
            myBoard.removeChild(myBoard.lastChild);
        }
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (boards[levelSelected.id][r][c] != "-") {
                tile.innerText = boards[levelSelected.id][r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solutions[levelSelected.id][r][c] == numSelected.id) {
            this.innerText = numSelected.id;  // Update number on tile
            //Update score
            score += 10;
            document.getElementById("score").innerText = score;
            
            //Check if all tiles completed
            checkAllTiles();
        }
        else { // Error number for this tile
            if(score - 5 >= 0) {
               score -= 5;
            }
            else {
                score = 0;
            }
            document.getElementById("score").innerText = score;
            checkScore();
        }
    }
}

// Checks if score = 0 display lost windows
function checkScore() {
    if (score == 0) {
        setResultWindows("Game Over", "Sorry, you lost !")
    }
}

// Check if all tiles completed display win windows
function checkAllTiles() {
    var win = true;
    // For each tile, verify if the tile value isn't empty
    document.querySelectorAll(".tile").forEach(tileElement => {
        if(tileElement.innerText == "") {
            win = false;
        }
    });
    
    // If all tiles not empty
    if (win) {
        // Update user score in local storage
        var currentUserName = JSON.parse(localStorage.getItem('currentUser'));
        var user = JSON.parse(localStorage.getItem(currentUserName));
        user['Scores']['Sudoku'] += Number(score);
        localStorage.setItem(currentUserName, JSON.stringify(user));

        // Display win message
        setResultWindows("Felicitations !", "You win the game !");
        
    }
}

// Display result game windows for win/lost by message in parameter
function setResultWindows(title, message) {
    document.querySelector(".button").addEventListener("click", () => {
        document.getElementById("container").classList.remove("blur");
        document.getElementById("gameOver").classList.add("element-hidden");
        location.reload();
    });

    document.querySelector(".game-over-title").innerText = title; 
    document.querySelector(".message").innerText = message;
    document.getElementById("container").classList.add("blur");
    document.getElementById("gameOver").classList.remove("element-hidden");
}
