$(document).ready(intializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = 0;
var attempts = 0;
var games_played = 0;
var max_matches = 9;



function intializeApp(){
  var card = $('.card');
  card.click(handleCardClick);
  // var shuffleButton = $('.shuffle');
  // shuffleButton.on("click", shuffleCards);
  var resetButton = $('.resetButton');
  resetButton.on("click", resetGame);
  resetButton.on("click", displayStats);
}


function handleCardClick(event){
  console.log(event);
  var currentCard = $(event.currentTarget);
  currentCard.addClass('flip');

  // currentCard.find(".back").addClass('hidden');


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
            // $(firstCardClicked).find(".back").removeClass('hidden');
            // $(secondCardClicked).find(".back").removeClass('hidden');
            firstCardClicked.removeClass("flip");
            secondCardClicked.removeClass("flip");
            firstCardClicked = null;
            secondCardClicked = null;
            }, 1000);
        }
      if(matches === max_matches){
      resetStats();
      openModal();
      $("div.container div").removeClass("flip");
    }
    displayStats();
  }


}

function openModal(){
  $('#ex1').modal();
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
  $(".back").removeClass("flip");
}

function resetGame(){
  matches = 0;
  attempts = 0;
  games_played = 0;
  $("div.container div").removeClass("flip");
  // secondCardClicked.removeClass("flip");
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


// function shuffleCards(){
//   $(".container div").remove();
//   shuffle(classArray);
//   console.table(classArray);
// for(var i=0;i<classArray.length;i++){
//     var frontDiv = $("<div>").addClass('front');
//   var backDiv = $("<div>").addClass('back');
//   var innerDiv = $("<div>").addClass('card-inner');
//   var cardDiv = $("<div>").addClass('card');


//   innerDiv.append(frontDiv);
//   innerDiv.append(backDiv);
//   cardDiv.append(innerDiv);
//   $(frontDiv).addClass(classArray[i]);
//   $(".container").append(cardDiv);

// }

// }
