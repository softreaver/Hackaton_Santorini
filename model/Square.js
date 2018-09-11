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

    this.getToken = function (token) {
        return token;
    }

    // Setter
    this.setX = function (newX) {
        x = newX;
    }
    this.setY = function (newY) {
        y = newY;
    }

    // Methodes

    this.build = function () {
        building.build();
    }

}