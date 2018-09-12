"use strict";

function SocketIoUtils() {

    let socket = io({
            autoConnect: false
        });

    this.isConnected = function() {
        return socket.connected;
    }

    this.connect = function(address, port) {
         address = address || '';
         port = port || '';

         port = (port !== '') ? ':' + port : port;
        socket.open(address + port);
    }

    // si le client est déconnecté du serveur
    socket.on('disconnect', () => {

    });

    // La conneciton au serveur échoue
    socket.on('connect_error', error => {
        console.log(error);
    });

    // envoi une demande de mouvement au serveur
    this.sendMoveToken = function (token, square) {
        let tokenJson = JSON.stringify(token);
        let squareJson = JSON.stringify(square);

        socket.emit('moveToken', tokenJson, squareJson);
    };

    // envoi d'une demande de construction au serveur
    this.sendBuild = function (token, square) {
        let tokenJson = JSON.stringify(token);
        let squareJson = JSON.stringify(square);

        socket.emit('build', tokenJson, squareJson);
    }

    // Démarre une partie sur le serveur
    this.sendInitGame = function(board) {
        boardJson = JSON.stringify(board);

        socket.emit('initGame', boardJson);
    }

    // Déplacement d'un pion
    socket.on('moveToken', (tokenJson, squareJson) => {
        
    });

    // Construction ou amélioration d'un bâtiment
    socket.on('build', (tokenJson, squareJson) => {

    });

    // Positionnement d'un pion
    socket.on('positionToken', (tokenJson, squareJson) => {

    });

    // Connection d'un joueur
    socket.on('playerConnect', playerJson => {

    });

    // Déconnection d'un joueur
    socket.on('playerLeave', playerJson => {

    });

    // Début du tour d'un joueur
    socket.on('turnOf', playerJson => {

    });

    // Victoir d'un joueur
    socket.on('victory', playerJson => {

    });

}

