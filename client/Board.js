"use strict";

function Board(initSquaresList, initPlayersList) {
    let activePlayer = null;

    let playersList = initPlayersList;
    let squaresList = initSquaresList;

    this.sendMove = function (token, square) {
        this.tokenJsonDeToken;
        this.jsonDeSquare;
    }

    this.getMove = function (token, square) {
        this.tokenJson;
        this.squareJson;
    }

    this.sendBuild = function (token, square) {

     }

    this.getBuild = function (token, square) {
        this.squareJson;
    }

    this.sendPositionToken = function (token, square) {

    }

    this.getPositionToken = function (token, square) {

    }

    this.sendInitGame = function() {
        SocketIoUtils.sendInitGame(this);
    }


    /**
     * GETTER / SETTER
     */

    this.getPlayersList = function () {
        return playersList;
    }

    this.getSquaresList = function () {
        return squaresList;
    }

    this.setPlayerList = function () { 

    }

    this.setTokenList = function () { 

    }

    this.setSquareList = function () {

     }

    this.setBuildingList = function () { 

    }

    this.addPlayer = function (player) {
        playersList.push(player);
    }

    this.removePlayer = function (player) {

    }
}
