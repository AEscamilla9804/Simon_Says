var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    $("h1").text("Level " + (level + 1));
    level++;

    userClickedPattern = [];
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 50);
}

function checkAnswer(currentLevel) {
    var gameOver = new Audio("sounds/wrong.mp3");

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver.play();

        $("h1").text("Game Over. Press any Key to restart the Game.");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
}

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push($(this).attr("id"));
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keypress", function() {
    if (level === 0) {
        nextSequence();
    }
});