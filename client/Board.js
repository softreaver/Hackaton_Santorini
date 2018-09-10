"use strict";

function Board(service) {
    let playersList = [];
    let tokenList = [];
    let squareList = [];
    let buildingList = [];


    // let att1 = service;

    // this.att2;// publics

    this.sendMovePublics = function (token, square) {
        this.tokenJsonDeToken;
        this.jsonDeSquare;
    };

    this.getMovePublics = function () {
        this.jsonDeToken;
        this.jsonDeSquare;
    };

    this.sendBuildPublics = function () {
        this.token;
        this.square;
    };

    this.getBuildPublics = function () {
        this.jsonDeSquare;
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
