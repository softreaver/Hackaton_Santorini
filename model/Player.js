"use strict";

if (typeof window === "undefined") {
    var Token = require("./Token");
}

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

    this.getTokenById = function (tokenId) {
        return tokensList.find(token => token.getID() === tokenId) || null;
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

    this.findTokenById = function (tokenId) {
        return tokensList.find(token => tokenId == token.getID()) || null;
    }


    // Methode 
    this.addToken = function (token) {
        tokensList.push(token);
        token.setPlayerID(ID);
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
    newPlayer.setPseudo(player.pseudo);
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