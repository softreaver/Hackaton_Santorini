"use strict";

function Building() {

    let level = 1;
    let square = null;
    let imageUrl = "../img/buildingLvl";

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

    this.setImageUrl = function(newUrl) {
        imageUrl = newUrl;
    }

    // Methodes
    this.build = function () {
        level++;
    }

}

// Parse un objet 
Building.parse = function (building) {
    let newBuilding = new Building();
    newBuilding.setLevel(building.level);
    newBuilding.setSquare(Square.parse(building.square));
    newBuilding.setImageUrl(building.imageUrl);

    return newBuilding;
}

// Serialiser un objet en JSON
Building.stringify = function (building) {
    let newBuilding = {
        level: building.getLevel(),
        square: building.getSquare(),
        imageUrl: building.getImageUrl()
    }

    return JSON.stringify(newBuilding);
}


if (typeof window === "undefined") {
    module.exports = Building;
}