"use strict";

function Player(id) {

    let pseudo;
    let tokensList = [];
    const ID = id;

    // Getter
    this.getPseudo = function () {
        return pseudo;
    }

    this.getTokensList = function () {
        return tokensList;
    }

    this.getToken = function (token) {
        let ret = null;
        tokensList.forEach(value => {
            if (BoardServer.checkIfEquals(value, token))
                ret = value;
        });
        return ret;
    }

    this.getID = function () {
        return ID;
    }

    // Setter 
    this.setPseudo = function (newPseudo) {
        pseudo = newPseudo;
    }

    this.setTokensList = function (newToken) {
        tokensList = newToken;
    }


    // Methode 
    this.addToken = function (token) {
        tokensList.push(token);
        token.setPlayer(this);
    }

    this.removeToken = function (token) {
        for (let i = 0; i < tokensList.length; i++) {
            if (BoardServer.checkIfEquals(tokensList[i], token)) {
                tokensList.splice(i, 1);
                break;
            }
        }
    }
}

// Parse un objet 
Player.parse = function (player) {
    let newPlayer = new Player(player.ID);
    newPlayer.setPseudo(building.level);
    for(let token of player.tokensList){
        newPlayer.addToken(Token.parse(token));
    }

    return newPlayer;
}

// Serialiser un objet en JSON
Player.stringify = function (player) {
    let tokensObjList = [];
    let tokens = player.getTokensList();

    for(let token of tokens) {
        tokensObjList.push(JSON.parse(Token.stringify(token)));
    }

    let newPlayer = {
        ID: player.getID(),
        pseudo: player.getPseudo(),
        tokensList: tokensObjList
    }

    return JSON.stringify(newPlayer);
}

if (typeof window === "undefined") {
    module.exports = Player;
}