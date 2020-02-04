$(document).ready(intializeApp);
var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var attempts = 0;
var games_played = 0;
var max_matches = 9;


function intializeApp(){

  shuffleAndCreateCards();

  var card = $('.card');
  card.off('click');
  card.click(handleCardClick);
  var shuffleButton = $('.shuffle');
  shuffleButton.off('click');
  shuffleButton.on("click", shuffleCards);
  var resetButton = $('.resetButton');
  resetButton.off('click');
  resetButton.on("click", resetGame);
  resetButton.on("click", displayStats);

}

function handleCardClick(event){
  var currentCard = $(event.currentTarget);
  currentCard.addClass('flip');

  if(!firstCardClicked) {
    firstCardClicked = $(event.currentTarget);
  } else if(!secondCardClicked){
    secondCardClicked = $(event.currentTarget);
    var firstCardImage = firstCardClicked.find('.front').css('background-image');
    var secondCardImage = secondCardClicked.find('.front').css('background-image');
      if(firstCardImage == secondCardImage){
        console.log("cards match!");
        firstCardClicked = null;
        secondCardClicked = null;
        matches++;
        attempts++;
      } else {
          console.log("cards did not match!");
          attempts++;
          setTimeout(function() {
            firstCardClicked.removeClass("flip");
            secondCardClicked.removeClass("flip");
            firstCardClicked = null;
            secondCardClicked = null;
          }, 850);
      }
      if(matches === max_matches){
      openModal();
      setTimeout(function(){
        resetStats();
        $("div.container div").removeClass("flip");
      });
    }
    displayStats();
  }
}

function openModal(){
  setTimeout(function(){$('#ex1').modal()}, 1000);
}

function calculateAccuracy(){
    var totalAccuracy = Math.floor((matches/attempts)*100);
    var roundedAccuracy = totalAccuracy;
    return roundedAccuracy;
}

function resetStats(){
  matches = 0;
  attempts = 0;
  games_played++;
  firstCardClicked = null;
  secondCardClicked = null;
  $(".card").removeClass("flip");
}

function resetGame(){
  matches = 0;
  attempts = 0;
  games_played = 0;
  firstCardClicked = null;
  secondCardClicked = null;
  $("div.container div").removeClass("flip");
  displayStats()
}

function displayStats(){
  var percentAccuracy = calculateAccuracy();

  if(!percentAccuracy){
    percentAccuracy = 0;
  }

  $("#numGamesPlayed").text(games_played);
  $("#numAttempts").text(attempts);
  $("#numAccuracy").text(percentAccuracy + "%");
}

function shuffle(array){
  array.sort(() => Math.random() - 0.5);
  return array;
}

var classArray = [
  "aya",
  "aya",
  "boom",
  "boom",
  "glassKnight",
  "glassKnight",
  "jaraxxus",
  "jaraxxus",
  "varian",
  "varian",
  "zuljin",
  "zuljin",
  "lich",
  "lich",
  "toki",
  "toki",
  "inquisitor",
  "inquisitor",
]


function shuffleCards(){
  $("div.container div").removeClass("flip");
  setTimeout(function(){
    intializeApp();
    resetStats();
    displayStats();
  }, 350)
}

function shuffleAndCreateCards(){
  shuffle(classArray);
  $('.container').empty();
  for (var i = 0; i < classArray.length; i++) {
    var frontDiv = $("<div>").addClass(`front ${classArray[i]}`);
    var backDiv = $("<div>").addClass('back');
    var innerDiv = $("<div>").addClass('card-inner');
    var cardDiv = $("<div>").addClass('card');
    innerDiv.append(frontDiv, backDiv);
    cardDiv.append(innerDiv);
    $(".container").append(cardDiv);
  }
}

function gameStart(){
  initializeApp();
}
