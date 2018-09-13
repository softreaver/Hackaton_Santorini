"use strict";

function Square() {

    let x;
    let y;
    let token = null;
    let building = null;

    // Getter
    this.getX = function () {
        return x;
    }
    this.getY = function () {
        return y;
    }

    this.getToken = function () {
        return token;
    }

    this.getBuilding = function() {
        return building;
    }

    this.getID = function() {
        return x + '-' + y;
    }

    // Setter
    this.setX = function (newX) {
        x = newX;
    }

    this.setY = function (newY) {
        y = newY;
    }

    this.setToken = function(newToken) {
        token = newToken;
    }

    this.setBuilding = function(newBuilding) {
        building = newBuilding;
    }

    // Methodes

    this.build = function () {
        building.build();
    }
}

// Parse un objet 
Square.parse = function (square) {
    let newSquare = new Square();
    newSquare.setX(square.x);
    newSquare.setY(square.y);
    newSquare.setToken(square.token);        
    newSquare.setBuilding(square.building);

    return newSquare;
}

// Serialiser un objet en JSON
Square.stringify = function (square) {
    let newsquare = {
        x: square.getX(),
        y: square.getY(),
        token: square.getToken(),
        building: square.getBuilding()
    }

    return JSON.stringify(newsquare);
}

if (typeof window === "undefined") {
    module.exports = Square;
}