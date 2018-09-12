"use strict";

function Token(id) {

    let player = null;
    let square = null;
    let imageUrl = "";
    const ID = id;

    // Getter

    this.getPlayer = function () {
        return player;
    }

    this.getSquare = function () {
        return square;
    }

    this.getImageUrl = function () {
        return imageUrl;
    }

    this.getID = function () {
        return ID;
    }

    // Setter

    this.setPlayer = function (newPlayer) {
        player = newPlayer;
    }

    this.setSquare = function (newSquare) {
        square = newSquare;
    }

    this.setImageUrl = function(newUrl) {
        imageUrl = newUrl;
    }

    // Methode 
    this.move = function (newSquare) {
        if (square !== null)
            square.setToken(null);

        square = newSquare;

        square.setToken(this);
    }

    // Parse un objet 
    this.parse = function (token) {
        let newToken = new Token(token.ID);
        newToken.setPlayer(token.player);
        newToken.setSquare(token.square);
        newToken.setImageUrl(token.imageUrl);

        return newToken;
    }

    // Serialiser un objet en JSON
    this.stringify = function (token) {
        let newToken = {
            ID: token.getID(),
            player: token.getPlayer(),
            square: token.getSquare(),
            imageUrl: token.getImageUrl(),
        }

        return JSON.stringify(newsquare);
    }
}

// Parse un objet 
Token.parse = function (token) {
    let newToken = new Token(token.ID);
    newToken.setPlayer(token.player);
    newToken.setSquare(token.square);
    newToken.setImageUrl(token.imageUrl);

    return newToken;
}

// Serialiser un objet en JSON
Token.stringify = function (token) {
    let newToken = {
        ID: token.getID(),
        player: token.getPlayer(),
        square: token.getSquare(),
        imageUrl: token.getImageUrl(),
    }

    return JSON.stringify(newToken);
}

if (typeof window === "undefined") {
    module.exports = Token;
}