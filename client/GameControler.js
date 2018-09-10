"use strict";

var GameControler = GameControler || {};

window.onload = () => GameControler.initGame();

(function (publics) {

    let privates = {};

    publics.initGame = function () {
        privates.socketIoUtils = new SocketIoUtils();

    };

    publics.moveToken = function () {
        this.square = "Square";
        this.token = "Token";

    };

    publics.build = function () {
        this.square = "Square";

    };

    publics.victory = function () {
        this.player = "Player";

    };

    publics.init = function () { };
    publics.playerConnect = function () { };
    publics.playerLeave = function () { };
    publics.yourTurn = function () { };
    publics.opponentTurn = function () {

        this.player = "Player";

    };

}(GameControler));
