"use strict";

function moveException(message) {
    this.message = message;
}


function BoardServer() {
    let activePlayer = null;
    let playersList = [];
    let squaresList = [];

    // Méthodes : 

    this.checkIfEquals = function (object1, object2) {
        for (let key in object1) {
            if (object1[key] !== object2[key]) {
                return false;
            }
        }

        return true;
    }

    this.getSquare = function (square) {
        let ret = null;
        squaresList.forEach(value => {
            if (BoardServer.checkIfEquals(value, square))
                ret = value;
        });
        return ret;
    }

    this.moveToken = function (parsedToken, parsedSquare) {
        // Vérifier qu'il y a un joueur courant
        if (activePlayer === null)
            throw new moveException("ActivePlayer is null");

        // Récupérer le token du joueur courant
        let token = activePlayer.getToken(parsedToken);

        // Récupérer le square du plateau
        let square = getSquare(parsedSquare);

        // Condition si le token n'est pas null
        if (token !== null) {
            if (square !== null) {
                if (checkMove) {
                    token.move(square);
                } else {
                    throw new moveException('The deplacement isn\'t correct ');
                }
            }
            else {
                console.log(`There is a problem with the square`);
                throw new moveException("Square is null ");
            }
        } else {
            console.log(`There is a problem with the token`);
            throw new moveException("Token is null");
        }
    }


    let checkMove = function (token, square) {
        if (BoardServer.checkIfEquals(square, element)) {
            // Verifier que le pion soit adjacent a la case
            let xDiff = token.getSquare().getX() - square.getX();
            let yDiff = token.getSquare().getY() - square.getY();
            if (
                (xDiff >= -1 && xDiff <= 1) &&
                (yDiff >= -1 && yDiff <= 1)
            ) {
                // Verifier que le niveau de la case de destination soit inférieur ou ne soit pas suppérieur a plus de 1
                let tokenLevel;
                if (token.getSquare().getBuilding() === null)
                    tokenLevel = 0;
                else
                    tokenLevel = token.getSquare().getBuilding().getLevel();

                let squareLevel;
                if (square.getSquare().getBuilding() === null)
                    squareLevel = 0;
                else
                    squareLevel = square.getSquare().getBuilding().getLevel();

                if (
                    (squareLevel < tokenLevel) ||
                    (squareLevel - tokenLevel <= 1)
                ) {
                    return true;
                }
            }
        }
        return false;
    }


    this.build = function (parsedToken, parseSquare) {
        // Vérifier qu'il y a un joueur courant
        if (activePlayer === null)
            throw new moveException("ActivePlayer is null");

        // Récupérer le token du joueur courant
        let token = activePlayer.getToken(parsedToken);

        // Récupérer le square du plateau
        let square = getSquare(parsedSquare);

        // Vérifier s'il existe un bâtiment sur la case
        if (square.getBuilding() === null) {
            square.setBuilding(new Building());
        } else {
            // Vérifier que l'emplacement n'est pas a la hauteur maximal ( dome ) 
            if (square.getBuilding().getLevel() < 4) {

                // Vérifier que le joueur soit adjacent à la case 
                let xDiff = token.getSquare().getX() - square.getX();
                let yDiff = token.getSquare().getY() - square.getY();
                if (
                    (xDiff >= -1 && xDiff <= 1) &&
                    (yDiff >= -1 && yDiff <= 1)
                ) {
                    square.build();
                }
            }
        }
    }


    this.checkVictory = function () {

        // Vérifier si le joueur courant rencontre les conditions de victoire 
        activePlayer.getTokensList().forEach(token => {

            if (token.getSquare().getBuilding().getLevel() == 3) {
                return true;
            }
            else if (findOtherPlayer() != null) {
                let canMove = false;
                findOtherPlayer().getTokensList().forEach(tokenOtherPlayer => {
                    let adjacentSquaresList = getAdjacentSquares(tokenOtherPlayer.getSquare());

                    adjacentSquaresList.forEach(square => {
                        if (square.getToken() === null) {
                            canMove = true;
                        } else if (square.getBuilding() !== null) {
                            let tokenLevel;
                            if (tokenOtherPlayer.getSquare().getBuilding() === null)
                                tokenLevel = 0;
                            else
                                tokenLevel = tokenOtherPlayer.getSquare().getBuilding().getLevel();
                            if (square.getBuilding().getLevel() <= tokenLevel + 1) {
                                canMove = true;
                            }
                        } else {
                            canMove = true;
                        }
                    });
                });

                return !canMove;

            } else {
                return false;
            }
        });
    }

    let findOtherPlayer = function () {
        playersList.forEach(player => {
            if (activePlayer != player)
                return player;
        });
        return null;
    };

    let getAdjacentSquares = function (square) {
        let adjacentSquaresList = []
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                squaresList.forEach(elem => {
                    if (elem.getX() === x && elem.getY() === y)
                        adjacentSquaresList.push(elem);
                });
            }
        }

        return adjacentSquaresList;
    };


}



