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
