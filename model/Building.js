"use strict";

function Building() {

    let level = 1;
    let squareID = null;
    let imageUrl = "../img/buildingLvl";

    // Getter
    this.getLevel = function () {
        return level;
    }

    this.getSquareID = function () {
        return squareID;
    }

    this.getImageUrl = function () {
        return IMAGE_URL;
    }

    // Setter
    this.setLevel = function (newLevel) {
        level = newLevel;
    }

    this.setSquareID = function (newSquareID) {
        squareID = newSquareID;
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
    newBuilding.setSquareID(building.squareID);
    newBuilding.setImageUrl(building.imageUrl);

    return newBuilding;
}

// Serialiser un objet en JSON
Building.stringify = function (building) {
    let newBuilding = {
        level: building.getLevel(),
        squareID: building.getSquare().getX() + '-' + building.getSquare().getY(),
        imageUrl: building.getImageUrl()
    }

    return JSON.stringify(newBuilding);
}

if (typeof window === "undefined") {
    module.exports = Building;
}