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