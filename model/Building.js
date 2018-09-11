"use strict";

function Building() {

    let level;
    let square = null;
    const IMAGE_URL = "../img/buildingLvl";

    // Getter
    this.getLevel = function () {
        return level;
    }

    this.getSquare = function () {
        return square;
    }

    this.getImageUrl = function () {
        return IMAGE_URL;
    }

    // Setter
    this.setLevel = function (newLevel) {
        level = newLevel;
    }

    this.setSquare = function (newSquare) {
        square = newSquare;
    }

    // Methodes
    this.build = function () {
        level++;
    }

}