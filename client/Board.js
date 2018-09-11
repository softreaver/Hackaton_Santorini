"use strict";

function Board(initSquaresList, initPlayersList) {
    let playersList = initPlayersList;
    let squaresList = initSquaresList;

    this.sendMovePublics = function (token, square) {
        this.tokenJsonDeToken;
        this.jsonDeSquare;
    };

    this.getMovePublics = function (token, square) {
        this.tokenJson;
        this.squareJson;
    };

    this.sendBuildPublics = function (token, square) { };

    this.getBuildPublics = function (square) {
        this.squareJson;
    }


    this.getPlayersList = function () {
        return playersList;
    }

    this.getTokenList = function () {
        return tokenList;
    }

    this.getSquareList = function () {
        return squareList;
    }

    this.getBuildingList = function () {
        return buildingList;
    }

    this.setPlayerList = function () { }
    this.setTokenList = function () { }
    this.setSquareList = function () { }
    this.setBuildingList = function () { }



    this.addPlayer = function (player) {
        playersList.push(player);
    }




    this.removePlayer = function (player) {

    }
}
