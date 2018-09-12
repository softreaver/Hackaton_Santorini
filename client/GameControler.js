"use strict";

var GameControler = GameControler || {};

window.onload = () => console.log(GameControler);

(function (publics) {

    let privates = {};
    privates.socketIoUtils = new SocketIoUtils();
    privates.board = null;

    publics.initGame = function () {
        // Connexion socket au serveur
        SocketIoUtils.connect('192.168.10.105');

        //Création de deux joueurs fictifs
        let PlayersList = [];
        PlayersList.push(new Player(1));
        PlayersList.push(new Player(2));

        // Ajout de deux pions par joueur
        PlayersList[0].addToken(new Token(1));
        PlayersList[0].addToken(new Token(2));
        PlayersList[1].addToken(new Token(3));
        PlayersList[1].addToken(new Token(4));

        let squaresList = [];

        //Création des cases de la grille
        for(let x = 1; x < 7; x++) {
            for(let y = 1; y < 7; y++) {
                let newSquare = new Square();
                newSquare.setX(x);
                newSquare.setY(y);
                squaresList.push(newSquare);
            }
        }

        // Création du plateau de jeu
        privates.board = new Board(squaresList, PlayersList);

        privates.board.sendInitGame();

        console.log("Jeu initialisé.")
    };

    publics.moveToken = function () {

    };

    publics.build = function () {

    };

    publics.victory = function () {

    };

    publics.playerConnect = function () {

     };

    publics.playerLeave = function () { 

    };

    publics.yourTurn = function () {

     };

    publics.opponentTurn = function () {

    };

    // On écoute les evennements de l'IHM


    publics.sendMove = function(token, square) {
        privates.board.sendMove(token, square);
    }

    publics.sendBuild = function(token, square) {
        privates.board.sendBuild(token, square);
    }

    publics.positionToken = function(token, square) {

    }
    
    console.log('boum')

}(GameControler));
