"use strict";

var GameControler = GameControler || {};

window.onload = () => GameControler.initGame();

(function (publics) {

    let privates = {};
    privates.board = null;

    publics.initGame = function () {
        // Connexion socket au serveur
        SocketIoUtils.connect();

        //Création de deux joueurs fictifs
        let PlayersList = [];
        let squaresList = [];

        //Création des cases de la grille
        for(let x = 1; x < 6; x++) {
            for(let y = 1; y < 6; y++) {
                let newSquare = new Square();
                newSquare.setX(x);
                newSquare.setY(y);
                squaresList.push(newSquare);
            }
        }

        // Création du plateau de jeu
        privates.board = new Board(squaresList, PlayersList);

        privates.board.setActivePlayer(PlayersList[0]);

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
    let squaresListElt = document.querySelectorAll(".squares")
    squaresListElt.forEach(element => {
        element.addEventListener('click', function (e){
            let getIdSquare = e.currentTarget.id ;
            let childElt = document.querySelector(`#${getIdSquare}`).firstChild;

            if(childElt !== null) {
                let hasToken = false;
                childElt.classList.forEach(className => {
                    if(className.toLowerCase().indexOf('pion') !== -1)
                        hasToken = true;
                });

                if(hasToken) {
                    squaresListElt.forEach(element =>{
                        element.removeEventListener('Click');

                        let xDiff = (Number.parseInt(getIdSquare.substr(0,1))) - (Number.parseInt(element.id.substr(0,1)));
                        let yDiff = (Number.parseInt(getIdSquare.substr(2))) - (Number.parseInt(element.id.substr(2)));

                        if(xDiff >= -1 && xDiff <= 1 && yDiff >=1 && yDiff <= 1) {
                            privates.board.sendMove(childElt.id, element.id);
                        }
                    })
                }
            }
        });
    });

    publics.sendMove = function(tokenId, squareId) {
        privates.board.sendMove(tokenId, squareId);
    }

    publics.sendBuild = function(tokenId, squareId) {
        privates.board.sendBuild(tokenId, squareId);
    }

    publics.positionToken = function(tokenId, squareId) {
        privates.board.sendPositionToken(tokenId, squareId);
    }

}(GameControler));
