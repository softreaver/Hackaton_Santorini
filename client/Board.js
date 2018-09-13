"use strict";

function BoardException(message) {
    this.message = message;
}

function Board(initSquaresList, initPlayersList) {
    let activePlayer = null;
    let playersList = initPlayersList;
    let squaresList = initSquaresList;

    this.sendMove = function (tokenId, squareId) {
        let token = activePlayer.findTokenById(tokenId);
        let square = this.findSquareBycoord(squareId);

        if(token !== null && square !== null) {
            try {
                SocketIoUtils.sendMoveToken(token, square);
            } catch (error) {
                console.log(error.message);
            }
        } else {
            throw new BoardException("The token or the square given on parameter was not found!");
        }
    }

    this.getMove = function (token, square) {

    }

    this.sendBuild = function (tokenId, squareId) {
        let token = activePlayer.findTokenById(tokenId);
        let square = this.findSquareBycoord(squareId);

        if(token !== null && square !== null) {
            try {
                SocketIoUtils.sendBuild(token, square);
            } catch (error) {
                console.log(error.message);
            }
        } else {
            throw new BoardException("The token or the square given on parameter was not found!");
        }
     }

    this.getBuild = function (token, square) {

    }

    this.sendPositionToken = function(tokenId, squareId) {
        let token = activePlayer.findTokenById(tokenId);
        let square = this.findSquareBycoord(squareId);

        if(token !== null && square !== null) {
            try {
                SocketIoUtils.sendPositionToken(token, square);
            } catch (error) {
                console.log(error.message);
            }
        } else {
            throw new BoardException("The token or the square given on parameter was not found!");
        }
    }

    this.getPositionToken = function (token, square) {

    }

    this.sendInitGame = function() {
        SocketIoUtils.sendInitGame(this);
    }

    this.findPlayerById = function( playerId ) {
        let ret = null;

        playersList.forEach(player => {
            if(player.getID() === playerId)
                ret = player;
        });

        return ret;
    }

    this.findSquareBycoord = function( squareId ) {
        let ret = null;

        squaresList.forEach(square => {
            if(
                (square.getX() === Number.parseInt(squareId.substr(0,1))) &&
                (square.getY() === Number.parseInt(squareId.substr(2)))
            )
                ret = square;
        });

        return ret;
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
        activePlayer: JSON.parse(Player.stringify(board.getActivePlayer())),
        playersList: playersObjList,
        squaresList: squaresObjList
    }

    return JSON.stringify(newBoard);
}
