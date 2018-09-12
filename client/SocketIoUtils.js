"use strict";

var SocketIoUtils = SocketIoUtils || {};

(function (publics) {

    let privates = privates || {
        socket: io.connect()
    };

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


<<<<<<< Updated upstream
}(SocketIoUtils));
=======
    let socket = io('http://localhost');
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });


    let socket = io.connect('http//localhost');
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });




    //  Un client se connecte
    let http = require('http');
    let fs = require('fs');

    // Chargement du fichier index.html affiché au client
    let server = http.createServer(function (req, res) {
        fs.readFile('./views/game.html', 'utf-8', function (error, content) {
            res.writeHead(200, { "content-type": "text/html" });
            res.end(content);
        });
    });

    // //Chargement de socket.io
    // let io = require('socket.io').listen(server);

    // // Quant un client se connecte, on le note dans la console
    // io.sockets.on('connection', function (socket) {
    //     console.log('Un client est connecté !');
    // });

    // SocketIoUtils.listen(8080);

    // let socket = io.connect('http://localhost:8080');

    // socket.emit('message', { content: 'Vous êtes bien connecté !', importance: '1' });

    // Le client veut envoyer un 
}
>>>>>>> Stashed changes
