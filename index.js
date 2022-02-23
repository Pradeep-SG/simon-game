var colors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userCLickedPattern = [];
var start = true;
var level = 0;

// Press any key to start | Only for start has to work
$(document).keydown(function() {
  if (start) {
    nextSequence();
    $("#title").text("Level " + level);
    start = false;
    $(".info").addClass("hide");
  }
});

// Clicking of colors
$(".btn").click(function() {
  // While genarating next sequence user is not allowed to make click
  if (userCLickedPattern.length < gamePattern.length) {
    var userChosenColor = $(this).attr("id");
    userCLickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    pressAnimation(userChosenColor);
    checkOrder(userCLickedPattern.length - 1);
  }
});

// Checking the order of clicks are correct
function checkOrder(currentLevel) {
  // Checks whether colors at same index matches
  if (userCLickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("correct");
    // If user fineshes one level, make the next sequence
    if (userCLickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 500);
    }
  } else {
    console.log("wrong");
    $("#title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    // When user hits wrong pattern restart all values
    start = true;
    level = 0;
    gamePattern = [];
    $(".info").removeClass("hide");
  }
}

// Generate next random color
function nextSequence() {
  level++;
  $("#title").text("Level " + level);
  userCLickedPattern = [];
  var randomColorIndex = Math.floor(4 * Math.random());
  var randomColor = colors[randomColorIndex];

  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function pressAnimation(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

$(".info").click(function() {
  $(".instruction").addClass("show");
  $(this).addClass("hide");
});

$(".back").click(function() {
  $(".instruction").removeClass("show");
  $(".info").removeClass("hide");
});