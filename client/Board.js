"use strict";

<<<<<<< HEAD
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

    this.getMovePublics = function (token, square) {
        this.tokenJson;
        this.squareJson;
    };

    this.sendBuildPublics = function (token, square) { };

    this.getBuildPublics = function (square) {
        this.squareJson;
    }

=======
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
>>>>>>> abc7ed605ac54adc28468f5f1ddab4a030569ddf

    this.getPlayersList = function () {
        return playersList;
    }

<<<<<<< HEAD
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


=======
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
>>>>>>> abc7ed605ac54adc28468f5f1ddab4a030569ddf

    this.addPlayer = function (player) {
        playersList.push(player);
    }

<<<<<<< HEAD



    this.removePlayer = function (player) {

    }
=======
    this.removePlayer = function (player) {

    }

    $("canvas").on('mouseleave', function () { Player });

    server.on('close', function () {
        // Faire quelque chose quand le serveur est arrêté
    })

    let http = require('http');

    let server = http.createServer(function (req, res) {
        res.writeHead(200);
        res.end('Hello Everybody !');
    });

    server.on('close', function () { // On écoute l'évènement close
        console.log('Bye bye !');
    })

    server.listen(8080); // Démarre le serveur

    server.close(); // Arrête le serveur. Déclenche l'événement close






    let EventEmitter = require('events').EventEmitter;
    let game = new EventEmitter();
    game.on('gameover', function (message) {
        console.log(message);
    });

    game.emit('gameover', 'Vous avez perdu !');

>>>>>>> abc7ed605ac54adc28468f5f1ddab4a030569ddf
}
