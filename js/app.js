//Database

$(function() {
  var database;
  function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  /*
     * Create a list that holds all of your cards
     */
  
  let images = [
    "./img/image-1.png",
    "./img/image-1.png",
    "./img/image-2.png",
    "./img/image-2.png",
    "./img/image-3.png",
    "./img/image-3.png",
    "./img/image-4.png",
    "./img/image-4.png",
    "./img/image-5.png",
    "./img/image-5.png",
    "./img/image-6.png",
    "./img/image-6.png",
    "./img/image-7.png",
    "./img/image-7.png",
    "./img/image-8.png",
    "./img/image-8.png"
  ];
  
  /*
     * Create a list that holds all of your songs
     */
  
  const songs = [
    "./audio/Genkai Toppa x Survivor.mp3",
    "./audio/Chozetsu☆Dynamic!.mp3",
    "./audio/Haruka.mp3",
    "./audio/Forever Dreaming.mp3",
    "./audio/Chaahan.mp3"
  ];
  
  let content = "";
  let songTitle = document.querySelector(".songTitle");
  let song = new Audio();
  let currentSong = 0;
  
  const slider = document.querySelector(".seekbar");
  
  //Slider Update
  function sliderUpdate() {
    let interval = setInterval(function() {
      slider.stepUp();
      slider.dispatchEvent(new Event("input"));
      if (slider.value == 100 || song.paused) clearInterval(interval);
    }, 1000);
  }
  
  sliderUpdate();
  
  //Seekbar Update
  $(".seekbar").on("click", function(e) {
    let offset = $(this).offset();
    let left = e.pageX - offset.left;
    const totalWidth = $(".seekbar").width();
    const percentage = left / totalWidth;
    const songTime = song.duration * percentage;
    song.currentTime = songTime;
  });
  
  //Play Song
  function playSong() {
    song.src = songs[currentSong];
    switch (currentSong) {
      case 0:
        content = "Limit Breaker";
        break;
      case 1:
        content = "Chozetsu";
        break;
      case 2:
        content = "Haruka";
        break;
      case 3:
        content = "Dreaming";
        break;
      case 4:
        content = "Chaahan";
    }
    songTitle.textContent = content;
    song.play();
  }
  
  //Play Next Song
  function next() {
    currentSong++;
    if (currentSong > 4) {
      currentSong = 0;
    }
  
    playSong();
  
    $(".pause").removeClass("fa fa-play");
    $(".pause").addClass("fa fa-pause");
    slider.value = 0;
    sliderUpdate();
  }
  
  //Play Previous Song
  function prev() {
    currentSong--;
    if (currentSong < 0) {
      currentSong = 4;
    }
  
    playSong();
  
    $(".pause").removeClass("fa fa-play");
    $(".pause").addClass("fa fa-pause");
    slider.value = 0;
    sliderUpdate();
  }
  
  //Play Or Pause Song
  function playOrPauseSong() {
    if (song.paused) {
      song.play();
      $(".pause").toggleClass("fa fa-play");
      $(".pause").toggleClass("fa fa-pause");
      console.log(slider.value);
      let interval = setInterval(function() {
        slider.stepUp();
        slider.dispatchEvent(new Event("input"));
        if (slider.value == 100 || song.paused) clearInterval(interval);
      }, 1000);
    } else {
      song.pause();
      $(".pause").toggleClass("fa fa-pause");
      $(".pause").toggleClass("fa fa-play");
    }
  }
  
  $(".pause").on("click", function() {
    playOrPauseSong();
  });
  
  $(".next").on("click", function() {
    next();
  });
  
  $(".back").on("click", function() {
    prev();
  });
  
  //Input Range
  $('input[type="range"]').on("input", function() {
    let percent = Math.ceil(
      (this.value - this.min) / (this.max - this.min) * 100
    );
    console.log(this.min);
    $(this).css(
      "background",
      "-webkit-linear-gradient(left, #e74c3c 0%, #e74c3c " +
      percent +
      "%, #999 " +
      percent +
      "%)"
    );
  });
  
  /*
     * Display the cards on the page
     *   - shuffle the list of cards using the provided "shuffle" method below
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */
  // Shuffle function from http://stackoverflow.com/a/2450976
  
  shuffle(images);
  let cardContainer = document.querySelector(".deck");
  
  let openCards = [];
  let matchedCards = [];
  //Create Cards
  function init() {
    setUpModeButtons();
    for (let i = 0; i < images.length; i++) {
      const card = document.createElement("li");
      card.classList.add("card");
      card.innerHTML = `<img src="${images[i]}" alt="image-${i +
        1}"" class="img-card">`;
      cardContainer.appendChild(card);
      $("img").addClass("remove");
      //Card click even
      click(card);
    }
  }
  
  let modeButtons = document.querySelectorAll(".mode");
  
  function setUpModeButtons() {
    for (let i = 0; i < modeButtons.length; i++) {
      modeButtons[i].addEventListener("click", function() {
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        modeButtons[2].classList.remove("selected");
        this.classList.add("selected");
        if (this.textContent == "Easy") {
          images = [
            "./img/image-1.png",
            "./img/image-1.png",
            "./img/image-2.png",
            "./img/image-2.png",
            "./img/image-3.png",
            "./img/image-3.png",
            "./img/image-4.png",
            "./img/image-4.png",
            "./img/image-5.png",
            "./img/image-5.png",
            "./img/image-6.png",
            "./img/image-6.png"
          ];
  
          $(cardContainer).removeClass("medium");
          $(cardContainer).removeClass("hard");
          $(cardContainer).addClass("easy");
        } else if (this.textContent == "Medium") {
          images = [
            "./img/image-1.png",
            "./img/image-1.png",
            "./img/image-2.png",
            "./img/image-2.png",
            "./img/image-3.png",
            "./img/image-3.png",
            "./img/image-4.png",
            "./img/image-4.png",
            "./img/image-5.png",
            "./img/image-5.png",
            "./img/image-6.png",
            "./img/image-6.png",
            "./img/image-7.png",
            "./img/image-7.png",
            "./img/image-8.png",
            "./img/image-8.png"
          ];
  
          $(cardContainer).removeClass("easy");
          $(cardContainer).removeClass("hard");
          $(cardContainer).addClass("medium");
        } else {
          images = [
            "./img/image-1.png",
            "./img/image-1.png",
            "./img/image-2.png",
            "./img/image-2.png",
            "./img/image-3.png",
            "./img/image-3.png",
            "./img/image-4.png",
            "./img/image-4.png",
            "./img/image-5.png",
            "./img/image-5.png",
            "./img/image-6.png",
            "./img/image-6.png",
            "./img/image-7.png",
            "./img/image-7.png",
            "./img/image-8.png",
            "./img/image-8.png",
            "./img/image-9.png",
            "./img/image-9.png",
            "./img/image-10.png",
            "./img/image-10.png"
          ];
  
          $(cardContainer).removeClass("medium");
          $(cardContainer).removeClass("easy");
          $(cardContainer).addClass("hard");
        }
        restartGame();
      });
    }
  }
  
  /*
     * set up the event listener for a card. If a card is clicked:
     *  - display the card's symbol (put this functionality in another function that you call from this one)
     *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
     *  - if the list already has another card, check to see if the two cards match
     *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
     *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
     *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
     *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
     */
  
  //Click Cards
  let timer = new Timer();
  let checkTime = false;
  function click(card) {
    $(card).on("click", function() {
      checkTime = true;
      timer.start();
      timer.addEventListener("secondsUpdated", function(e) {
        $(".timer").html(timer.getTimeValues().toString());
      });
  
      let currentImage = $(this).find("img");
      let previousImage = openCards[0];
      console.log(currentImage);
      //Opened Card
      if (openCards.length === 1) {
        $(this).addClass("animated flipInY");
        $(this)
          .find("img")
          .addClass("display");
        $(this)
          .find("img")
          .removeClass("remove");
        $(this).addClass("disabled");
  
        openCards.push(card);
        //Compare cards
        compare(currentImage, previousImage);
      } else {
        //Closed card
        $(this).addClass("animated flipInY");
        currentImage.addClass("display");
        currentImage.removeClass("remove");
        currentImage.parent().addClass("disabled");
  
        openCards.push(currentImage);
      }
      console.log(currentImage, previousImage);
    });
  }
  
  function compare(currentImage, previousImage) {
    if (currentImage.attr("src") === previousImage.attr("src")) {
      console.log("Matched!");
      currentImage.addClass("animated pulse");
      previousImage.addClass("animated pulse");
      //Matched
      matchedCards.push(currentImage, previousImage);
      openCards = [];
      //Check If game is over
      isOver();
    } else {
      setTimeout(function() {
        currentImage.parent().toggleClass("animated flipInY");
        previousImage.parent().toggleClass("animated flipInY");
        currentImage.addClass("remove");
        currentImage.removeClass("display");
        currentImage.parent().removeClass("disabled");
        previousImage.addClass("remove");
        previousImage.removeClass("display");
        previousImage.parent().removeClass("disabled");
        console.log("Not Matched!");
      }, 500);
      openCards = [];
    }
    addMove();
  }
  
  function restartGame() {
    //Delete all cards
    timer.innerHTML = "00:00:00";
    cardContainer.innerHTML = "";
    //Call init funtion
    shuffle(images);
    init();
  
    //Reset variables
  
    matchedCards = [];
    openCards = [];
    moves = 0;
    points = 3;
    restartTimer();
    movesContainer.innerHTML = 0;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`;
    modal.innerHTML = "";
  }
  
  //Timer
  function restartTimer() {
    timer.pause();
    timer.addEventListener("started", function(e) {
      $(".timer").html(timer.getTimeValues().toString());
    });
    timer.reset();
    timer.addEventListener("reset", function(e) {
      $(".timer").html(timer.getTimeValues().toString());
    });
    timer.reset();
    timer.addEventListener("reset", function(e) {
      $(".timer").html(timer.getTimeValues().toString());
    });
    timer.pause();
    timer.addEventListener("started", function(e) {
      $(".timer").html(timer.getTimeValues().toString());
    });
  }
  
  //Leader Board
  const leaderboard = document.querySelector(".board");
  
  $(".leaderboard").on("click", function() {
    $(".modal").css(
      "background-image",
      "linear-gradient(to left, #eb3349, #f45c43)"
    );
    $(".modal").modal("show");
  
    $(document).on("hidden.bs.modal", ".modal", function() {
      $(".modal").modal("hide");
      $(".modal").css("display", "none");
    });
  });
  
  // Game Over
  const modal = document.querySelector(".modal-box");
  
  function isOver() {
    if (images.length === matchedCards.length) {
      modal.innerHTML = `<div class="modal animated fadeIn" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
  <div class="modal-content">
  <div class="modal-header">
  <h5 class="modal-title">KAMEHAMAHAAA 💥</h5>
  <button type="button" class="close" data-dismiss="modal" data-backdrop="static" data-keyboard="false" aria-label="Close">
  <span aria-hidden="true">&times;</span>
  </button>
  </div>
  <div class="modal-body">
  <p>Well done, you got <span class='e'>${medal}</span> medal, you scored a rating of  ${points} stars in ${moves} moves.
  Total time taken ${timer.getTimeValues().hours} hrs 
  ${timer.getTimeValues().minutes} mins 
  ${timer.getTimeValues().seconds} secs
  </p>
  <p class="add-name">Add your name in the leaderboard <span class="emoji">🏆</span></p>
  <form class="form-inline">
  <div class="form-group mb-2 mr-3">
  <input type="text" class="form-control" id="name" placeholder="Enter your name">
  </div>
  <button type="submit" class="btn btn-success submit mb-2">Submit</button>
  </form>
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-warning play-again">Play Again</button>
  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
  </div>
  </div>
  </div>
  </div>`;
      $(".board .modal").modal("hide");
      $(".modal-box .modal").modal("show");
  
      const submitButton = document.querySelector(".submit");
      submitButton.addEventListener("click", function(e) {
        $(".form-inline").css("display", "none");
        e.preventDefault();
        $(".add-name").addClass("animated fadeIn");
        $(".add-name").text(
          "Thank you for giving your name <span class='emoji'>✔️</span>, now you can close this or play again to improve your score."
        );
        submitScores();
      });
  
      const playAgain = document.querySelector(".play-again");
      playAgain.addEventListener("click", function() {
        $(".modal").modal("hide");
        restartGame();
      });
  
      $(document).on("hidden.bs.modal", ".modal", function() {
        $(".modal").modal("hide");
        $(".modal").css("display", "none");
      });
    }
  }
  
  //Submit scores
  
  function submitScores() {
    let name = document.getElementById("name").value;
    let time = `${timer.getTimeValues().hours} hrs ${
    timer.getTimeValues().minutes
    } mins ${timer.getTimeValues().seconds} secs`;
    if (
      timer.getTimeValues().seconds <= 60 &&
      timer.getTimeValues().minutes < 1
    ) {
      time = `${timer.getTimeValues().seconds} sec(s)`;
    } else if (timer.getTimeValues().minutes <= 60) {
      time = `${timer.getTimeValues().minutes} min(s) ${
      timer.getTimeValues().seconds
    } sec(s)`;
    }
  
    var data = {
      name: name,
      points: points,
      medal: medal,
      time: time
    };
  
    console.log(data);
    database = firebase.database();
    var ref = database.ref("leaderboard");
    ref.push(data);
  }
  //Restart Game
  const restart = $(".restart");
  restart.on("click", function() {
    restartGame();
  });
  
  //Add moves
  const movesContainer = document.querySelector(".moves");
  let moves = 0;
  function addMove() {
    moves++;
    movesContainer.innerHTML = moves;
  
    //Set Rating
    rating();
  }
  
  //Rating
  const starsContainer = document.querySelector(".stars");
  let points = 3;
  let medal = `🥇`;
  function rating() {
    if (moves > 12 && moves < 20) {
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>`;
      points = 2;
      medal = `🥈`;
    }
  
    if (moves > 20) {
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
      points = 1;
      medal = `🥉`;
    }
  }
  //Start the game
  
  init();
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAp5-eiVZOQPylcSJqqTdnZNEYKpXBRWoI",
    authDomain: "memory-game-e06b7.firebaseapp.com",
    databaseURL: "https://memory-game-e06b7.firebaseio.com",
    projectId: "memory-game-e06b7",
    storageBucket: "memory-game-e06b7.appspot.com",
    messagingSenderId: "385483034025"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  
  var ref = database.ref("leaderboard");
  ref.on("value", gotData, errData);
  
  function gotData(data) {
    let scores = data.val();
    let keys = Object.keys(scores);
    let name, points, medal, time;
    console.log(keys);
    const table = document.querySelector(".table");
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
  
      console.log(keys.length);
      name = scores[k].name;
      points = scores[k].points;
      medal = scores[k].medal;
      time = scores[k].time;
      console.log(name, points, medal, time);
      $(table).append(
        `<tr><td>${name}</td><td>${points}</td><td>${medal}</td><td>${time}</td></tr>`
      );
    }
  }
  
  function errData(err) {
    console.log("Error!");
    console.log(err);
  }
  
  function loadStyleSheet(src) {
    if (document.createStyleSheet){
        document.createStyleSheet(src);
    }
    else {
        $("head").append($("<link rel='stylesheet' href='"+src+"' />"));
    }
};

});
