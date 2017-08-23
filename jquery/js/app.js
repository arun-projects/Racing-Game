$(document).ready(function() {

    var $track = $("#track");

    function resizeTrack() {
        $track.height($(window).innerHeight() - 30);
    }

    $(window).resize(resizeTrack);

    resizeTrack();

    var player1;
    var player1Moving = false;

    var player2;
    var player2Moving = false;

    var winner;

    function setInitialState() {
        $track.append(`<div class="current-player" id="${player1}" style="top:50px;left:50px;"></div>`);

        $track.append(`<div class="current-player" id="${player2}" style="bottom:50px;left:50px;"></div>`);

        $(document).on("keyup", stopPlayer);
        $(document).on("keydown", movePlayer);
    }

    function movePlayer(event) {
        if (event.which === 39) {
            if (player1Moving) {
                return;
            }

            $(`.current-player#${player1}`).animate({
                "left": $(window).innerWidth() - 125
            }, {
                duration: 5000,
                step: checkWin
            });

            player1Moving = true;
        } else if (event.which === 68) {
            if (player2Moving) {
                return;
            }

            $(`.current-player#${player2}`).animate({
                "left": $(window).innerWidth() - 125
            }, {
                duration: 5000,
                step: checkWin
            });
        }
    }

    function stopPlayer() {
        if (event.which === 39) {
            $(`.current-player#${player1}`).stop(true, false);

            player1Moving = false;
        } else if (event.which === 68) {
            $(`.current-player#${player2}`).stop(true, false);

            player2Moving = false;
        }
    }

    function checkWin(now) {
        if (now === $(window).innerWidth() - 125 && !winner) {
            winner = $(this).attr("id");

            $(".current-player").stop(true, false);

            var winnerName = winner.split("").map(function(letter, index) {
                if (index === 0) {
                    return letter.toUpperCase();
                }

                return letter;
            }).join("");

            $("#winner-modal").html(winnerName + " Wins!").fadeIn();
        }
    }

    $("#select-player #players div").on("click", function() {
        var playerSelected = $(this).attr("id");
        var $selectPlayer = $("#select-player");

        $selectPlayer.fadeOut(function() {
            if (player1) {
                player2 = playerSelected;

                setInitialState();
            } else {
                player1 = playerSelected;
                $("#select-player h1").html("P2 Select a Player!");
                $selectPlayer.fadeIn(1000);
            }
        });
    });

});
