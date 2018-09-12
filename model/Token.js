"use strict";

function Token(id) {

    let player = null;
    let square = null;
    const IMAGE_URL = "";
    const ID = id;

    // Getter

    this.getPlayer = function () {
        return player;
    }

    this.square = function () {
        return square;
    }

    this.getImageUrl = function () {
        return IMAGE_URL;
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

    // Methode 
    this.move = function (newSquare) {
        if (square !== null)
            square.setToken(null);

        square = newSquare;

        square.setToken(this);
    }
}

if (typeof window === "undefined") {
    module.exports = Token;
}