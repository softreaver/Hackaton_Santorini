"use strict";

var GameControler = GameControler || {};

window.onload = () => GameControler.initGame();

(function (publics) {

    let privates = {};
    privates.board = null;

    publics.setBoard = function(board) {
        privates.board = board;
    }

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

    publics.victory = function () {

    };

    publics.playerConnect = function () {

    };

    publics.playerLeave = function () { 

    };

    publics.positionStep = function () {
        privates.board.setStep(0);
    }

    publics.moveStep = function () {
        privates.board.setStep(1);
    }

    publics.buildStep = function () {
        privates.board.setStep(2);
    }

    publics.yourTurn = function () {
        let squaresListElt = document.querySelectorAll(".squares");
        squaresListElt.forEach(element => {
            element.addEventListener('click', function (e){
                privates.click(e.currentTarget.id);
            });
        });
     };

    publics.opponentTurn = function () {
        let squaresListElt = document.querySelectorAll(".squares");
        squaresListElt.forEach(element => {
            let elClone = element.cloneNode(true);
            element.parentNode.replaceChild(elClone, element);
        });
    };

    
/*
    // On écoute les evennements de l'IHM
    let squaresListElt = document.querySelectorAll(".squares");
    squaresListElt.forEach(element => {
        element.addEventListener('click', function (e){
            let getIdSquare = e.currentTarget.id ;
            let childElt = e.currentTarget.firstElementChild;



            if(childElt !== null) {
                let hasToken = false;
                childElt.classList.forEach(className => {
                    if(className.toLowerCase().indexOf('pion') !== -1)
                        hasToken = true;
                });

                if(hasToken) {
                    squaresListElt.forEach(element =>{
                        let elClone = element.cloneNode(true);
                        element.parentNode.replaceChild(elClone, element);

                        let xDiff = (Number.parseInt(getIdSquare.substr(0,1))) - (Number.parseInt(element.id.substr(0,1)));
                        let yDiff = (Number.parseInt(getIdSquare.substr(2))) - (Number.parseInt(element.id.substr(2)));

                        if(xDiff >= -1 && xDiff <= 1 && yDiff >=1 && yDiff <= 1) {

                            element.addEventListener('click', () => {
                                privates.board.sendMove(childElt.id, element.id);
                            });      
                        }
                    })
                }
            }
        });
    });
    */

    privates.click = function (squareId, tokenId) {
        switch(privates.board.getStep()) {
            case 0:
                privates.positionToken(squareId)
                break;

            case 1:
            privates.sendMove(tokenId, squareId);
                break;

            case 2:
                privates.sendBuild(tokenId, squareId); 
                break;
        }
    }

    privates.sendMove = function(tokenId, squareId) {
        privates.board.sendMove(tokenId, squareId);
    }

    privates.sendBuild = function(tokenId, squareId) {
        privates.board.sendBuild(tokenId, squareId);
    }

    privates.positionToken = function(tokenId, squareId) {
        privates.board.sendPositionToken(tokenId, squareId);
    }

}(GameControler));
