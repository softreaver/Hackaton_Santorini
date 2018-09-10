"use strict";
function SocketIoUtils() {
    let socket = io.connect();

    socket.on('connect_error', error => {
        console.log(error);
    });

    socket.on('moveToken', (tokenJson, squareJson) => {
    });

    this.sendMoveTokenPublics = function (token) {
        this.Token;
    };

    this.sendBuildPublics = function (square) {
        this.square;
    }

    socket.on('Build', (squareJson) => {
    });

    this.playerConnectPublics = function (playerJson) { }
    this.playerLeavePublics = function (playerJson) { }
    this.turnOfPublics = function (playerJson) { }
    this.victoryPublics = function (playerJson) { }

}
