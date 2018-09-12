"use strict";

var SocketIoUtils = SocketIoUtils || {};

(function (publics) {

    let privates = {};

    privates.socket = io({
        autoConnect: false
    });

    publics.isConnected = function() {
        return socket.connected;
    }

    publics.connect = function(address, port) {
         address = address || '';
         port = port || '';

         port = (port !== '') ? ':' + port : port;
         privates.socket.open(address + port);
    }

    // si le client est déconnecté du serveur
    privates.socket.on('disconnect', () => {

    });

    // La conneciton au serveur échoue
    privates.socket.on('connect_error', error => {
        console.log(error);
    });

    // envoi une demande de mouvement au serveur
    publics.sendMoveToken = function (token, square) {
        let tokenJson = JSON.stringify(token);
        let squareJson = JSON.stringify(square);

        privates.socket.emit('moveToken', tokenJson, squareJson);
    };

    // envoi d'une demande de construction au serveur
    publics.sendBuild = function (token, square) {
        let tokenJson = JSON.stringify(token);
        let squareJson = JSON.stringify(square);

        privates.socket.emit('build', tokenJson, squareJson);
    }

    // Démarre une partie sur le serveur
    publics.sendInitGame = function(board) {
        boardJson = JSON.stringify(board);

        privates.socket.emit('initGame', boardJson);
    }

    // Déplacement d'un pion
    privates.socket.on('moveToken', (tokenJson, squareJson) => {
        
    });

    // Construction ou amélioration d'un bâtiment
    privates.socket.on('build', (tokenJson, squareJson) => {

    });

    // Positionnement d'un pion
    privates.socket.on('positionToken', (tokenJson, squareJson) => {

    });

    // Connection d'un joueur
    privates.socket.on('playerConnect', playerJson => {

    });

    // Déconnection d'un joueur
    privates.socket.on('playerLeave', playerJson => {

    });

    // Début du tour d'un joueur
    privates.socket.on('turnOf', playerJson => {

    });

    // Victoir d'un joueur
    privates.socket.on('victory', playerJson => {

    });


}(SocketIoUtils));
