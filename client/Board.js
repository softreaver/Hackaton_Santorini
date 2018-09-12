"use strict";

function Board(initSquaresList, initPlayersList) {
    let activePlayer = null;
    let playersList = initPlayersList;
    let squaresList = initSquaresList;

    this.sendMove = function (token, square) {
        SocketIoUtils.sendMoveToken(token, square);
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

    this.setSquareList = function () {

     }

    this.setActivePlayer = function(newPlayer) {
        activePlayer = newPlayer;
    }

    this.getActivePlayer = function() {
        return activePlayer;
    }

    this.addPlayer = function (player) {
        playersList.push(player);
    }

    this.removePlayer = function (player) {

    }

}

// Parse un objet 
Board.parse = function (board) {
    let squaresList = [];
    let squaresObjList = board.squaresList;

    let playersList = [];
    let playersObjList = board.playersList;

    for(let squareJson of squaresObjList) {
        squaresList.push(Square.parse(squareJson));
    }

    for(let playerJson of playersObjList) {
        playersList.push(Player.parse(playerJson));
    }

    let newBoard = new Board(squaresList, playersList);
    newBoard.setActivePlayer(board.activePlayer);

    return newBoard;
}

// Serialiser un objet en JSON
Board.stringify = function (board) {
    let squaresObjList = [];
    let squares = board.getSquaresList();

    let playersObjList = [];
    let players = board.getPlayersList();

    for(let square of squares) {
        squaresObjList.push(JSON.parse(Square.stringify(square)));
    }

    for(let player of players) {
        playersObjList.push(JSON.parse(Player.stringify(player)));
    }

    let newBoard = {
        activePlayer: board.getActivePlayer(),
        playersList: playersObjList,
        squaresList: squaresObjList
    }

    return JSON.stringify(newBoard);
}
