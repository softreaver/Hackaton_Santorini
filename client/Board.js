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

}
