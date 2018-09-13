"use strict";

function Token(id) {

    let playerID = null;
    let squareID = null;
    let imageUrl = "";
    const ID = id;

    // Getter

    this.getPlayerID = function () {
        return playerID;
    }

    this.getSquareID = function () {
        return squareID;
    }

    this.getImageUrl = function () {
        return imageUrl;
    }

    this.getID = function () {
        return ID;
    }

    // Setter

    this.setPlayerID = function (newPlayerID) {
        playerID = newPlayerID;
    }

    this.setSquareID = function (newSquareID) {
        squareID = newSquareID;
    }

    this.setImageUrl = function(newUrl) {
        imageUrl = newUrl;
    }

}

// Parse un objet 
Token.parse = function (token) {
    let newToken = new Token(token.ID);
    newToken.setPlayerID(token.playerID);
    newToken.setSquareID(token.squareID);
    newToken.setImageUrl(token.imageUrl);

    return newToken;
}

// Serialiser un objet en JSON
Token.stringify = function (token) {
    let newToken = {
        ID: token.getID(),
        playerID: token.getPlayerID(),
        squareID: token.getSquareID(),
        imageUrl: token.getImageUrl(),
    }

    return JSON.stringify(newToken);
}

if (typeof window === "undefined") {
    module.exports = Token;
}