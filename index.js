var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var level=0;
var start=true;
$(document).keypress(function(){
  if(start){
    $("#level-title").text("Level " + level);
    nextSequence();
    start=false;
  }

});

function nextSequence(){
  level++;
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  $("#level-title").text("Level " + level);
};
$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");
      console.log(gamePattern);
      console.log(userClickedPattern);

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
          userClickedPattern=[];
        }, 1000);

      }

    }
    else {

      console.log("wrong");
      console.log(gamePattern);
      console.log(userClickedPattern);
      $("#level-title").text("Wrong Press any key to start over");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over")
      }, 200);
      startOver()


    }

}
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();

}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){$("#"+currentColor).removeClass("pressed")},100);
}
function startOver(){
    gamePattern=[];
    start=true;
    level=0;
    userClickedPattern=[];
  };
