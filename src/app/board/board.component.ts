import { Component, OnInit } from "@angular/core";
import { GameService } from "../services/game.service";
import { Game } from "../game";
import { Play } from "../play";
import { RefreshService } from "../services/refresh.service";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {
  game: Game = new Game();
  board: string[][] = [["", "", ""], ["", "", ""], ["", "", ""]];
  X: boolean = false;

  constructor(
    public gameService: GameService,
    private refreshService: RefreshService
  ) {
    refreshService.missionConfirmed$.subscribe(() => {
      this.initialiseExistingGame(this.gameService.id);
    });
  }

  ngOnInit() {
    setInterval(() => {
      this.refreshService.confirmMission();
    }, 2000);

    this.gameService
      .getMe()
      .then(response => (this.gameService.me = response.name));

    $(document).ready(function () {
      //display only the CHOOSE GAME STYLE box
      $("#chooseGame")
        .show()
        .addClass("animated fadeInDown");
      $("#chooseGame").one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function () {
          $("#chooseGame").removeClass("animated fadeInDown");
        }
      ); //close the animationEnd function
      $("#choosePlayer").hide();
      $("#peers").hide();
      $("#gameBox").hide();
      $("#winBox").hide();
      $("#loseBox").hide();
      $("#restartBtn").hide();

      //if we click on the title, go back to main menu
      $("#main").click(function () {
        $(".tic").text("");
        $(".tic").removeClass("ex");
        $(".tic").removeClass("oh");
        $("#chooseGame")
          .show()
          .addClass("animated fadeInDown");
        $("#chooseGame").one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            $("#chooseGame").removeClass("animated fadeInDown");
          }
        ); //close the animationEnd function
        $("#choosePlayer").hide();
        $("#gameBox").hide();
        $("#winBox").hide();
        $("#loseBox").hide();
        $("#restartBtn").hide();
      }); //end of click the title

      //EXISTING GAME
      $(".existingGame").click(function () {
        $("#chooseGame").hide();
        $("#gameBox").hide();
        $("#winBox").hide();
        $("#loseBox").hide();
        $("#restartBtn").hide();

        $("#peers").hide();
        $("#choosePlayer")
          .show()
          .addClass("animated flipInX");
        $("#choosePlayer").one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            $("#choosePlayer").removeClass("animated flipInX");
          }
        ); //close the animationEnd function

        var player; //set players turn to be either X or 0

        //click to choose player X
        $("#playerX").click(function () {
          player = "X";
          //display only GAME BOX and RESTART BTN
          $("#chooseGame").hide();
          $("#choosePlayer").hide();
          $("#gameBox")
            .show()
            .addClass("animated flipInX");
          $("#gameBox").one(
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
            function () {
              $("#gameBox").removeClass("animated flipInX");
            }
          ); //close the animationEnd function
          $("#winBox").hide();
          $("#loseBox").hide();
          $("#restartBtn").show();
        }); //end of player X turn

        //click to choose player 0
        $("#player0").click(function () {
          player = "0";
          //display only GAME BOX and RESTART BTN
          $("#chooseGame").hide();
          $("#choosePlayer").hide();
          $("#gameBox")
            .show()
            .addClass("animated flipInX");
          $("#gameBox").one(
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
            function () {
              $("#gameBox").removeClass("animated flipInX");
            }
          ); //close the animationEnd function
          $("#winBox").hide();
          $("#loseBox").hide();
          $("#restartBtn").show();
        }); //end of player 0 turn

        //check if someone of possible two players has won
        function checkIfSomeoneWon(symbol) {
          if (
            $("#box0").hasClass(symbol) &&
            $("#box1").hasClass(symbol) &&
            $("#box2").hasClass(symbol)
          ) {
            return true;
          } else if (
            $("#box3").hasClass(symbol) &&
            $("#box4").hasClass(symbol) &&
            $("#box5").hasClass(symbol)
          ) {
            return true;
          } else if (
            $("#box6").hasClass(symbol) &&
            $("#box7").hasClass(symbol) &&
            $("#box8").hasClass(symbol)
          ) {
            return true;
          } else if (
            $("#box0").hasClass(symbol) &&
            $("#box3").hasClass(symbol) &&
            $("#box6").hasClass(symbol)
          ) {
            return true;
          } else if (
            $("#box0").hasClass(symbol) &&
            $("#box4").hasClass(symbol) &&
            $("#box8").hasClass(symbol)
          ) {
            return true;
          } else if (
            $("#box1").hasClass(symbol) &&
            $("#box4").hasClass(symbol) &&
            $("#box7").hasClass(symbol)
          ) {
            return true;
          } else if (
            $("#box2").hasClass(symbol) &&
            $("#box5").hasClass(symbol) &&
            $("#box8").hasClass(symbol)
          ) {
            return true;
          } else if (
            $("#box2").hasClass(symbol) &&
            $("#box4").hasClass(symbol) &&
            $("#box6").hasClass(symbol)
          ) {
            return true;
          } else {
            return false;
          }
        } //end of winner function

        //click a field to play
        $(".tic").click(function () {
          let fieldClicked = $(this);
          //if the field is already clicked animate the symbol
          if (fieldClicked.hasClass("ex") || fieldClicked.hasClass("oh")) {
            fieldClicked.addClass("animated jello");
            fieldClicked.one(
              "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
              function () {
                fieldClicked.removeClass("animated jello");
              }
            ); //close the animationEnd function
            //if the field was not clicked beforehand, add the symbol and check if the player won
          } else {
            if (player === "X") {
              fieldClicked.addClass("ex").text(player);
              if (checkIfSomeoneWon("ex")) {
                $(".tic").text("");
                $("#choosePlayer").hide();
                $("#gameBox").hide();
                $("#winBox").hide();
                $("#loseBox").hide();
                $("#restartBtn").hide();
              } else {
                player = "X";
              }
            } else {
              fieldClicked.addClass("oh").text(player);
              if (checkIfSomeoneWon("oh")) {
                $(".tic").text("");
                $("#choosePlayer").hide();
                $("#gameBox").hide();
                $("#winBox").hide();
                $("#loseBox").hide();
                $("#restartBtn").hide();
              } else {
                player = "0";
              }
            }
          }
        }); //end of click a field to play function

        //set the reset function
        function reset() {
          $(".tic").text("");
          $(".tic").removeClass("ex");
          $(".tic").removeClass("oh");
          $("#chooseGame")
            .show()
            .addClass("animated fadeInDown");
          $("#chooseGame").one(
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
            function () {
              $("#chooseGame").removeClass("animated fadeInDown");
            }
          ); //close the animationEnd function
          $("#choosePlayer").hide();
          $("#gameBox").hide();
          $("#winBox").hide();
          $("#loseBox").hide();
          $("#restartBtn").hide();
        } //end of reset function

        //click the RESET and PLAY AGAIN button
        $(".btn").click(function () {
          reset();
        });
      });
    }); //document load end

    //SET THE LOGIC FOR VS.COMPUTER GAME MODE *******************************
    $("#vsComp").click(function () {
      //show the CHOOSE YOUR PLAYER box
      $("#chooseGame").hide();
      $("#choosePlayer")
        .show()
        .addClass("animated flipInX");
      $("#choosePlayer").one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function () {
          $("#choosePlayer").removeClass("animated flipInX");
        }
      ); //close the animationEnd function
      $("#gameBox").hide();
      $("#winBox").hide();
      $("#loseBox").hide();
      $("#restartBtn").hide();

      //declare some variables
      var turn;
      var computersTurn;
      var turns = ["", "", "", "", "", "", "", "", ""];
      var count = 0;
      var gameOn = false;
      var slot;
      var computersMove;

      //create a winning combination function to check for winner
      function checkForWinner(symbol) {
        if (
          $("#box0").hasClass(symbol) &&
          $("#box1").hasClass(symbol) &&
          $("#box2").hasClass(symbol)
        ) {
          return true;
        } else if (
          $("#box3").hasClass(symbol) &&
          $("#box4").hasClass(symbol) &&
          $("#box5").hasClass(symbol)
        ) {
          return true;
        } else if (
          $("#box6").hasClass(symbol) &&
          $("#box7").hasClass(symbol) &&
          $("#box8").hasClass(symbol)
        ) {
          return true;
        } else if (
          $("#box0").hasClass(symbol) &&
          $("#box3").hasClass(symbol) &&
          $("#box6").hasClass(symbol)
        ) {
          return true;
        } else if (
          $("#box0").hasClass(symbol) &&
          $("#box4").hasClass(symbol) &&
          $("#box8").hasClass(symbol)
        ) {
          return true;
        } else if (
          $("#box1").hasClass(symbol) &&
          $("#box4").hasClass(symbol) &&
          $("#box7").hasClass(symbol)
        ) {
          return true;
        } else if (
          $("#box2").hasClass(symbol) &&
          $("#box5").hasClass(symbol) &&
          $("#box8").hasClass(symbol)
        ) {
          return true;
        } else if (
          $("#box2").hasClass(symbol) &&
          $("#box4").hasClass(symbol) &&
          $("#box6").hasClass(symbol)
        ) {
          return true;
        } else {
          return false;
        }
      } //end of winner function

      //create a function for computers turn to choose random field
      function computerTurn() {
        var taken = false;
        while (taken === false && count !== 5) {
          computersMove = (Math.random() * 10).toFixed();
          var move = $("#box" + computersMove).text();
          if (move === "") {
            $("#box" + computersMove)
              .text(computersTurn)
              .addClass("oh");
            taken = true;
            turns[computersMove] = computersTurn;
          }
        }
      } //end of computer turn function

      //declare function for Players turn
      function playerTurn(turn, id) {
        var spotTaken = $("#" + id).text();
        if (spotTaken === "") {
          turns[id] = turn;
          $("#" + id)
            .text(turn)
            .addClass("ex");
          count++;
          if (checkForWinner("ex")) {
            $(".tic").text("");
            $("#choosePlayer").hide();
            $("#gameBox").hide();
            $("#winBox")
              .show()
              .addClass("animated fadeInUp");
            $("#winBox").one(
              "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
              function () {
                $("#winBox").removeClass("animated fadeInUp");
              }
            ); //close the animationEnd function
            $("#loseBox").hide();
            $("#restartBtn").hide();
          }
          if (gameOn === false) {
            computerTurn();
            if (checkForWinner("oh")) {
              $(".tic").text("");
              $("#choosePlayer").hide();
              $("#gameBox").hide();
              $("#winBox").hide();
              $("#loseBox")
                .show()
                .addClass("animated fadeInUp");
              $("#loseBox").one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function () {
                  $("#loseBox").removeClass("animated fadeInUp");
                }
              ); //close the animationEnd function
              $("#restartBtn").hide();
            }
          }
        }
      } //end of player turn function

      //click a field to play
      $(".tic").click(function () {
        slot = $(this).attr("id");
        playerTurn(turn, slot);
      }); //end of click a field function

      //click to choose player X
      $("#playerX").click(function () {
        turn = "X";
        computersTurn = "0";
        $("#chooseGame").hide();
        $("#choosePlayer").hide(); //display only GAME BOX and RESTART BTN
        $("#gameBox")
          .show()
          .addClass("animated flipInX");
        $("#winBox").hide();
        $("#loseBox").hide();
        $("#restartBtn").show();
      }); //end of player X turn

      //click to choose player 0
      $("#player0").click(function () {
        turn = "0";
        computersTurn = "X";
        $("#chooseGame").hide();
        $("#choosePlayer").hide(); //display only GAME BOX and RESTART BTN
        $("#gameBox")
          .show()
          .addClass("animated flipInX");
        $("#winBox").hide();
        $("#loseBox").hide();
        $("#restartBtn").show();
      }); //end of player 0 turn

      function resetVScomp() {
        turns = ["", "", "", "", "", "", "", "", ""];
        count = 0;
        gameOn = false;
        $(".tic").text("");
        $(".tic").removeClass("ex");
        $(".tic").removeClass("oh");
        $("#chooseGame").hide();
        $("#choosePlayer")
          .show()
          .addClass("animated flipInX");
        $("#choosePlayer").one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            $("#choosePlayer").removeClass("animated flipInX");
          }
        ); //close the animationEnd function
        $("#gameBox").hide();
        $("#winBox").hide();
        $("#loseBox").hide();
        $("#restartBtn").hide();
      } //end of restart function

      //click the RESET and PLAY AGAIN button
      $(".btn").click(function () {
        resetVScomp();
      });
    }); //end of VS.COMPUTER PLAYER MODE *************************************

    //************************************************************************

    //SET THE GAME LOGIC FOR TWO PLAYERS MODE ********************************

    $("#2players").click(function () {
      $("#chooseGame").hide();
      $("#peers")
        .show()
        .addClass("animated flipInX");
      $("#gameBox").hide();
      $("#winBox").hide();
      $("#loseBox").hide();
      $("#restartBtn").hide();

      // select peer
      $(".peer").click(function () {
        $("#peers").hide();
        $("#choosePlayer")
          .show()
          .addClass("animated flipInX");
        $("#choosePlayer").one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            $("#choosePlayer").removeClass("animated flipInX");
          }
        ); //close the animationEnd function
      });

      var player; //set players turn to be either X or 0

      //click to choose player X
      $("#playerX").click(function () {
        player = "X";
        //display only GAME BOX and RESTART BTN
        $("#chooseGame").hide();
        $("#choosePlayer").hide();
        $("#gameBox")
          .show()
          .addClass("animated flipInX");
        $("#gameBox").one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            $("#gameBox").removeClass("animated flipInX");
          }
        ); //close the animationEnd function
        $("#winBox").hide();
        $("#loseBox").hide();
        $("#restartBtn").show();
      }); //end of player X turn

      //click to choose player 0
      $("#player0").click(function () {
        player = "0";
        //display only GAME BOX and RESTART BTN
        $("#chooseGame").hide();
        $("#choosePlayer").hide();
        $("#gameBox")
          .show()
          .addClass("animated flipInX");
        $("#gameBox").one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            $("#gameBox").removeClass("animated flipInX");
          }
        ); //close the animationEnd function
        $("#winBox").hide();
        $("#loseBox").hide();
        $("#restartBtn").show();
      }); //end of player 0 turn

      //check if someone of possible two players has won
      function checkIfSomeoneWon(symbol) {
        if (
          $("#box0").hasClass(symbol) &&
          $("#box1").hasClass(symbol) &&
          $("#box2").hasClass(symbol)
        ) {
          return true;
        } else if (
          $("#box3").hasClass(symbol) &&
          $("#box4").hasClass(symbol) &&
          $("#box5").hasClass(symbol)
        ) {
          return true;
        } else if (
          $("#box6").hasClass(symbol) &&
          $("#box7").hasClass(symbol) &&
          $("#box8").hasClass(symbol)
        ) {
          return true;
        } else if (
          $("#box0").hasClass(symbol) &&
          $("#box3").hasClass(symbol) &&
          $("#box6").hasClass(symbol)
        ) {
          return true;
        } else if (
          $("#box0").hasClass(symbol) &&
          $("#box4").hasClass(symbol) &&
          $("#box8").hasClass(symbol)
        ) {
          return true;
        } else if (
          $("#box1").hasClass(symbol) &&
          $("#box4").hasClass(symbol) &&
          $("#box7").hasClass(symbol)
        ) {
          return true;
        } else if (
          $("#box2").hasClass(symbol) &&
          $("#box5").hasClass(symbol) &&
          $("#box8").hasClass(symbol)
        ) {
          return true;
        } else if (
          $("#box2").hasClass(symbol) &&
          $("#box4").hasClass(symbol) &&
          $("#box6").hasClass(symbol)
        ) {
          return true;
        } else {
          return false;
        }
      } //end of winner function

      //click a field to play
      $(".tic").click(function () {
        var fieldClicked = $(this);
        //if the field is already clicked animate the symbol
        if (fieldClicked.hasClass("ex") || fieldClicked.hasClass("oh")) {
          fieldClicked.addClass("animated jello");
          fieldClicked.one(
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
            function () {
              fieldClicked.removeClass("animated jello");
            }
          ); //close the animationEnd function
          //if the field was not clicked beforehand, add the symbol and check if the player won
        } else {
          if (player === "X") {
            fieldClicked.addClass("ex").text(player);
            if (checkIfSomeoneWon("ex")) {
              $(".tic").text("");
              $("#choosePlayer").hide();
              $("#gameBox").hide();
              $("#winBox").hide();
              $("#loseBox").hide();
              $("#restartBtn").hide();
            } else {
              player = "X";
            }
          } else {
            fieldClicked.addClass("oh").text(player);
            if (checkIfSomeoneWon("oh")) {
              $(".tic").text("");
              $("#choosePlayer").hide();
              $("#gameBox").hide();
              $("#winBox").hide();
              $("#loseBox").hide();
              $("#restartBtn").hide();
            } else {
              player = "0";
            }
          }
        }
      }); //end of click a field to play function

      //set the reset function
      function reset() {
        $(".tic").text("");
        $(".tic").removeClass("ex");
        $(".tic").removeClass("oh");
        $("#chooseGame").hide();
        $("#choosePlayer")
          .show()
          .addClass("animated flipInX");
        $("#choosePlayer").one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          function () {
            $("#choosePlayer").removeClass("animated flipInX");
          }
        ); //close the animationEnd function
        $("#gameBox").hide();
        $("#winBox").hide();
        $("#loseBox").hide();
        $("#restartBtn").hide();
      } //end of reset function

      //click the RESET and PLAY AGAIN button
      $(".btn").click(function () {
        reset();
      });
    }); //end of TWO PLAYERS MODE function*************************
  }

  initialiseExistingGame(id: string) {
    if (id) {
      this.gameService.getGame(id).then(response => this.processGame(response));
    }
  }

  play(row: number, column: number) {
    let play = new Play();
    play.id = this.game.id;
    play.row = row;
    play.column = column;

    this.gameService.play(play);
  }

  setX(value: boolean) {
    this.X = value;
    this.processGame(this.game);
  }

  processGame(game: Game) {
    let weArePlayer1 = game.player1.includes(this.gameService.me);
    let board: string[][] = [["", "", ""], ["", "", ""], ["", "", ""]];
    let count: number = 0;

    for (let x of game.board[0]) {
      board[0][count] = this.getMarker(x, weArePlayer1);
      count++;
    }

    count = 0;
    for (let x of game.board[1]) {
      board[1][count] = this.getMarker(x, weArePlayer1);
      count++;
    }

    count = 0;
    for (let x of game.board[2]) {
      board[2][count] = this.getMarker(x, weArePlayer1);
      count++;
    }

    document.getElementById("box0").innerHTML = this.getMarker(
      game.board[0][0],
      weArePlayer1
    );
    document.getElementById("box1").innerHTML = this.getMarker(
      game.board[0][1],
      weArePlayer1
    );
    document.getElementById("box2").innerHTML = this.getMarker(
      game.board[0][2],
      weArePlayer1
    );

    document.getElementById("box3").innerHTML = this.getMarker(
      game.board[1][0],
      weArePlayer1
    );
    document.getElementById("box4").innerHTML = this.getMarker(
      game.board[1][1],
      weArePlayer1
    );
    document.getElementById("box5").innerHTML = this.getMarker(
      game.board[1][2],
      weArePlayer1
    );

    document.getElementById("box6").innerHTML = this.getMarker(
      game.board[2][0],
      weArePlayer1
    );
    document.getElementById("box7").innerHTML = this.getMarker(
      game.board[2][1],
      weArePlayer1
    );
    document.getElementById("box8").innerHTML = this.getMarker(
      game.board[2][2],
      weArePlayer1
    );

    this.board = board;
    this.game = game;
  }

  getMarker(marker: number, weArePlayer1: boolean) {
    switch (marker) {
      case -1:
        return "";
      case 0:
        // player1 is always 0, if I'm player1, then I'm 0
        if (weArePlayer1) {
          if (this.X) {
            return "X";
          } else {
            return "0";
          }
        }
        if (this.X) {
          return "0";
        }
        return "X";
      case 1:
        if (weArePlayer1) {
          if (this.X) {
            return "0";
          } else {
            return "X";
          }
        }
        if (this.X) {
          return "X";
        }
        return "0";
      default:
        return;
    }
  }

  reset() {
    this.game = new Game();
    this.board = [["", "", ""], ["", "", ""], ["", "", ""]];
  }
}
