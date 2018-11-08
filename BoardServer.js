"use strict";

var Building = require('./model/Building');
var Player = require('./model/Player');
var Square = require('./model/Square');
var Token = require('./model/Token');

function BoardServerException(message, messageIhm) {
    this.message = message;
    this.messageIhm = messageIhm;
}


function BoardServer(initSquaresList, initPlayersList) {
    let activePlayer = null;
    let playersList = initPlayersList;
    let squaresList = initSquaresList;

    // Méthodes : 
    this.setActivePlayer = function(player = null) {
        if(player === null)
            activePlayer = playersList[0];
        else
            activePlayer = player;
    }

    this.gameFull = function() {
        return (playersList.length === 2);
    }

    this.getSquare = function (parsedSquare) {
        return squaresList.find(square => {
            return (
                (square.getX() === parsedSquare.x) &&
                (square.getY() === parsedSquare.y)
            )
        }) || null;
    }

    this.getSquareById = function(squareId) {
        return squaresList.find(square => square.getID() === squareId) || null;
    }

    this.moveToken = function (parsedToken, parsedSquare) {
        // Vérifier qu'il y a un joueur courant
        if (activePlayer === null)
            throw new BoardServerException("ActivePlayer is null");

        // Récupérer le token du joueur courant
        let token = activePlayer.getTokenById(parsedToken.ID);

        // Récupérer le square du plateau
        let square = this.getSquare(parsedSquare);

        // Condition si le token n'est pas null
        if (token !== null) {
            if (square !== null) {
                // Véfifier que le pion soit positionné sur le plateau
                if(this.getSquareById(token.getSquareID()) !== null) {
                    // Vérifier que la case ne contient pas déjà un pion
                    if(square.getToken() === null) {
                        // Vérifier que le déplacement respecte les règles du jeu
                        let oldSquare = this.getSquareById(token.getSquareID());
                        if (checkMove(oldSquare, square)) { 
                            oldSquare.setToken(null);               
                            square.setToken(token);
                            token.setSquareID(square.getID());
                        } else {
                            throw new BoardServerException('The deplacement isn\'t correct', "Le déplacement n'est pas autorisé.");
                        }
                    } else {
                        throw new BoardServerException('The selected square has already a token', "Un pion est déjà présent sur la case selectionnée.");
                    }
                } else {
                    throw new BoardServerException('The token has no square', "Le pion doit être positionné sur le plateau.");
                }
            } else {
                throw new BoardServerException("Square is null", "La case n'existe pas.");
            }
        } else {
            throw new BoardServerException("Token is null", "Le pion n'existe pas.");
        }
    }

    this.build = function (parsedToken, parsedSquare) {
        // Vérifier qu'il y a un joueur courant
        if (activePlayer === null)
            throw new BoardServerException("ActivePlayer is null");

        // Récupérer le token du joueur courant
        let token = activePlayer.getTokenById(parsedToken.ID);

        // Récupérer le square du plateau
        let square = this.getSquare(parsedSquare);

        // Condition si le token n'est pas null
        if (token !== null) {
            if (square !== null) {
                // Vérifier que la case ne contient pas déjà un pion
                if(square.getToken() === null) {
                    // Vérifier que le pion soit bien placé sur le plateau
                    if(this.getSquareById(token.getSquareID()) !== null) {

                        // Vérifier que le joueur soit adjacent à la case 
                        let xDiff = this.getSquareById(token.getSquareID()).getX() - square.getX();
                        let yDiff = this.getSquareById(token.getSquareID()).getY() - square.getY();
                        if (
                            (xDiff >= -1 && xDiff <= 1) &&
                            (yDiff >= -1 && yDiff <= 1)
                        ) {
                            // Vérifier s'il existe un bâtiment sur la case
                            if (square.getBuilding() === null) {
                                square.setBuilding(new Building());
                            } else {
                                // Vérifier que l'emplacement n'est pas a la hauteur maximal ( dome ) 
                                if (square.getBuilding().getLevel() < 4) {
                                    square.build();
                                } else {
                                    throw new BoardServerException('Building is at max level', "Le bâtiment ne peux plus être amélioré.");
                                }
                            }
                            console.log(square.getBuilding().getLevel());
                        } else {
                            throw new BoardServerException('Square is not adjacent', "Le pion n'est pas adjacent à la case pour construire.");
                        }
                    } else {
                        throw new BoardServerException('The token has no square', "Le pion doit être positionné sur le plateau.");
                    }
                } else {
                    throw new BoardServerException("A token is already present in the square", "Placement impossible, un pion est déjà présent sur la case.");
                }
            } else {
                throw new BoardServerException("Square is null", "La case n'existe pas.");
            }
        } else {
            throw new BoardServerException("Token is null", "Le pion n'existe pas.");
        }
    }

    this.positionToken = function(parsedToken, parsedSquare) {
        // Vérifier qu'il y a un joueur courant
        if (activePlayer === null)
            throw new BoardServerException("ActivePlayer is null");

        // Récupérer le token du joueur courant
        let token = activePlayer.getTokenById(parsedToken.ID);

        // Récupérer le square du plateau
        let square = this.getSquare(parsedSquare);

        // Condition si le token n'est pas null
        if (token !== null) {
            if (square !== null) {
                // Vérifier que la case ne contient pas déjà un pion
                if(square.getToken() === null) {
                    // Vérifier que le pion ne soit pas déjà positionné sur le plateau
                    if(token.getSquareID() === null) {
                        square.setToken(token);
                        token.setSquareID(square.getID());
                    } else {
                        throw new BoardServerException("The token is already on the board", "Placement impossible, le pion a déjà été placé sur le plateau.");
                    }
                } else {
                    throw new BoardServerException("A token is already present in the square", "Placement impossible, un pion est déjà présent sur la case.");
                }
            }
            else {
                throw new BoardServerException("Square is null", "La case n'existe pas.");
            }
        } else {
            throw new BoardServerException("Token is null", "Le pion n'existe pas.");
        }
    }

    this.addPlayer = function(socketId, pseudo) {
        try {
            if(this.findPlayerByPseudo(socketId) === null) {
                let playerToAdd = new Player(socketId);
                playerToAdd.setPseudo(pseudo);
                // Vérifier qu'il y ai une place libre pour rejoindre la partie
                if (playersList.length < 2) {
                    playersList.push(playerToAdd);
                    // Ajout de deux pions par joueur
                    playersList[playersList.length - 1].addToken(new Token(1));
                    playersList[playersList.length - 1].addToken(new Token(2));
                } else
                    throw new BoardServerException("No space available", "La partie est pleine.");
            }
        } catch(error) {
            throw new BoardServerException(error.message, "Impossible de vous ajouter à la partie. " + error.messageIhm);
        }
    }

    this.findPlayerByPseudo = function (pseudo) {
        let playerFound = null;
        playersList.forEach(player => {
            if (player.getPseudo() === pseudo) {
                playerFound = player;
            }
        });

        return playerFound;
    }

    this.checkVictory = function () {

        let oldSquare = this.getSquareById(token.getSquareID());
        if (oldSquare !== null) {
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

                }
            });
        } 
        return false
    }

    let checkMove = function (oldSquare, square) {
        if (oldSquare !== null) {
            // Verifier que le pion soit adjacent a la case
            let xDiff = oldSquare.getX() - square.getX();
            let yDiff = oldSquare.getY() - square.getY();
            if (
                (xDiff >= -1 && xDiff <= 1) &&
                (yDiff >= -1 && yDiff <= 1)
            ) {
                // Verifier que le niveau de la case de destination soit inférieur ou ne soit pas suppérieur a plus de 1
                let tokenLevel;
                if (oldSquare.getBuilding() === null)
                    tokenLevel = 0;
                else
                    tokenLevel = oldSquare.getBuilding().getLevel();

                let squareLevel;
                if (square.getBuilding() === null)
                    squareLevel = 0;
                else
                    squareLevel = square.getBuilding().getLevel();

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

    let findOtherPlayer = function () {
        return playersList.find(player => player !== activePlayer) || null;
    };

    let getAdjacentSquares = function () {
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

// Parse un objet 
BoardServer.parse = function (board) {
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

    let newBoard = new BoardServer(squaresList, playersList);
    newBoard.setActivePlayer(null);

    return newBoard;
}

// Serialiser un objet en JSON
BoardServer.stringify = function (board) {
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
        activePlayer: board.getActivePlayer(),
        playersList: playersObjList,
        squaresList: squaresObjList
    }

    return JSON.stringify(newBoard);
}

BoardServer.checkIfEquals = function (object1, object2) {
    for (let key in object1) {
        if (object1[key] !== object2[key]) {
            return false;
        }
    }

    return true;
}

module.exports = BoardServer;

