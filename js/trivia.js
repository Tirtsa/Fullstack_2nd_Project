//Trivia Game

var myQuestions;
my_level = 1;
const myQuestions1 = [
  {
    question: "How long is an Olympic swimming pool?",
    answers: {
      a: "50 meters",
      b: "45 meters",
      c: "55 meters"
    },
    correctAnswer: "a"
  },
  {
    question: "In which language does 'konnichiwa' mean 'hello'?",
    answers: {
      a: "Hebrew",
      b: "French",
      c: "Japanese"
    },
    correctAnswer: "c"
  },
  {
    question: "How many wisdom teeth does the average adult have?",
    answers: {
      a: "1",
      b: "4",
      c: "2",
      d: "5"
    },
    correctAnswer: "b"
  }
];
const myQuestions2 = [
  {
    question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich"
    },
    correctAnswer: "c"
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm"
    },
    correctAnswer: "c"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint"
    },
    correctAnswer: "d"
  }
];

const myQuestions3 = [
  {
    question: "What is the joule a unit of?",
    answers: {
      a: "Length",
      b: "Energy",
      c: "Electricity"
    },
    correctAnswer: "b"
  },
  {
    question: "What is considered a normal human heart rate?",
    answers: {
      a: "60-100bpm",
      b: "80-120bpm",
      c: "70-100bpm"
    },
    correctAnswer: "a"
  },
  {
    question: "How many oceans are there on Earth?"
    ,
    answers: {
      a: "Five",
      b: "Three",
      c: "Four",
    },
    correctAnswer: "a"
  }
];

//set header
var curentUser = JSON.parse(localStorage.getItem('currentUser'));
var user = JSON.parse(localStorage.getItem(curentUser));
let score = user["Scores"];
document.getElementById("userh").innerHTML = "Welcome " + curentUser + "! Your Score: Trivia-" +  user['Scores']['Trivia'] +" Sudoku-"
  + user['Scores']['Sudoku'];

//set buttom enabel
if(my_level>1){
  document.getElementById("start2").style.display = 'inline-block';
  if(my_level>2){
    document.getElementById("start3").style.display = 'inline-block';
  }
}

//start the game by level
function start(game) {
  my_game=game;
  switch (game) {
    case 1:
      myQuestions = myQuestions1;
      break;
    case 2:
      myQuestions = myQuestions2;
      break;
    case 3:
      myQuestions = myQuestions3;
      break
  }
  
  document.getElementById("start1").style.display = "none";
  document.getElementById("start2").style.display = "none";
  document.getElementById("start3").style.display = "none";
  document.getElementById("restart").style.display = 'none';

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');


  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(currentSlide);
  nextButton.style.display = 'inline-block';

  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);

  function buildQuiz() {

    const output = [];


    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        const answers = [];

        for (letter in currentQuestion.answers) {

          answers.push(
            `<label>
              <input class="radiobtn" type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );


    quizContainer.innerHTML = output.join('');
  }

  function showResults() {

    const answerContainers = quizContainer.querySelectorAll('.answers');

    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {

      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;

        answerContainers[questionNumber].style.color = 'lightgreen';
      }

      else {
        answerContainers[questionNumber].style.color = 'red';
      }
    });
    document.getElementById("restart").style.display = 'inline-block';
    //set resultes in rate
    var curentUser = JSON.parse(localStorage.getItem('currentUser'));
    var user = JSON.parse(localStorage.getItem(curentUser));
    user["Scores"]["Trivia"] =user["Scores"]["Trivia"]+ Number(numCorrect);
    localStorage.setItem(curentUser, JSON.stringify(user));

    //set header
var curentUser = JSON.parse(localStorage.getItem('currentUser'));
var user = JSON.parse(localStorage.getItem(curentUser));
let score = user["Scores"];
document.getElementById("userh").innerHTML = "Welcome " + curentUser + "! Your Score: Trivia-" + score["Trivia"]+" Sudoku-"+score["Sudoku"];

    if(numCorrect==3){
      if(my_level==my_game){
      my_level+=1;
      document.getElementById('body').style. backgroundImage="linear-gradient(to right, rgba(255,0,0,"+my_game/3+"), rgba(255,0,0,1)";
      }
      if(my_level==2){
        document.getElementById("start2").style.display = 'inline-block';
        document.getElementById("start1").style.display = "none";
      }
      else if(my_level==3){
        document.getElementById("start3").style.display = 'inline-block';
        document.getElementById("start2").style.display = "none";
      }
      else{
          alert("Well done, try our others games!");
          location.replace("home.html");
      }
    }
  }


  //creat the slides
  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = 'none';
    }
    else {
      previousButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else {
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

}

//restart the game
function reStart() {

  const quizContainer = document.getElementById('quiz');
  const answerContainers = quizContainer.querySelectorAll('.answers');
  var x;
  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    answerContainers[questionNumber].style.color = 'black';
  });
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = "";

  var allChk = document.getElementsByClassName("radiobtn");
  for (i = 0; i < allChk.length; i++) {
    allChk[i].checked = false;
  }
  document.getElementById("start1").style.display = "none";
  document.getElementById("start2").style.display = "none";
  document.getElementById("start3").style.display = "none";
  document.getElementById("restart").style.display = 'none';
}
