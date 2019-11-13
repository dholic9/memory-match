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
}

function handleCardClick(event){
  console.log(event);
  $(event.currentTarget).find(".back").addClass('hidden');


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
          console.log("cards did not match!SS");
          attempts++;
          setTimeout(function() {
            $(firstCardClicked).find(".back").removeClass('hidden');
            $(secondCardClicked).find(".back").removeClass('hidden');
            firstCardClicked = null;
            secondCardClicked = null;
            }, 1000);
        }
      if(matches === max_matches){
      resetStats();
    }
    displayStats();
  }


}



function calculateAccuracy(){
    var totalAccuracy = Math.floor((matches/attempts)*100);
    var roundedAccuracy = totalAccuracy.toFixed(0);
    return roundedAccuracy;
}

function resetStats(){
  matches = 0;
  attempts = 0;
  games_played++;
  $(".back").removeClass("hidden");
}

function displayStats(){
  var percentAccuracy = calculateAccuracy();

  $("#numGamesPlayed").text(games_played);
  $("#numAttempts").text(attempts);
  $("#numAccuracy").text(percentAccuracy);
}
