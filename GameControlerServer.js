"use strict";

// Import des modules node.js

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

// Session pour express
var session = require("express-session")({
    secret: "santorini-secret",
    resave: true,
    saveUninitialized: true
});
var sharedSession = require("express-socket.io-session");

var BoardServer = require('./BoardServer');

var boardServer = null;

// On attache la session à express
app.use(session);

// On va écouter sur le port 80
server.listen(8080);

// Route, mappage
// Ajout d'une route a Express ? 
app.get("/", (req, resp) => {
    let ip = req.connection.remoteAddress;
    console.log(`[${ip}] asked for index.html.`);
    fs.readFile(`views/game.html`, `utf-8`, function (error, content) {
        if (error !== null) {
            console.log(error.message);
            resp.writeHead(500, { "Content-Type": "text/plain" });
            resp.end(error.message);
        } else {
            resp.writeHead(200, { "Content-Type": "text/html" });
            resp.end(content);
        }
    });
});

// Récupere les fichiers Js
app.get('/client/:fileName', (req, resp) => {
    let ip = req.connection.remoteAddress;
    let fileName = req.params.fileName;
    console.log(`[${ip}] asked for ${fileName}.`);
    resp.sendFile(__dirname + '/client/' + fileName);
});

// Récupère les fichiers Css 
app.get('/css/:fileName', (req, resp) => {
    let ip = req.connection.remoteAddress;
    let fileName = req.params.fileName;
    console.log(`[${ip}] asked for ${fileName}.`);
    resp.sendFile(__dirname + '/css/' + fileName);
});

// Récupère les fichiers dans le dossier images
app.get('/img/:fileName', (req, resp) => {
    let ip = req.connection.remoteAddress;
    let fileName = req.params.fileName;
    console.log(`[${ip}] asked for ${fileName}.`);
    resp.sendFile(__dirname + '/img/' + fileName);
});

// Récupere les fichiers dans le dossier Model
app.get('/model/:fileName', (req, resp) => {
    let ip = req.connection.remoteAddress;
    let fileName = req.params.fileName;
    console.log(`[${ip}] asked for ${fileName}.`);
    resp.sendFile(__dirname + '/model/' + fileName);
});

// -------------------------------------------------------------------------

// WebSocket

// On attache la session à socket.io
io.use(sharedSession(session));

// Evenement pour la méthode de Connection
io.on('connection', function (socket) {
    console.log(`An user just connect `);

    if (typeof socket.handshake.session.userPseudo === "undefined") {
        if(boardServer) {
            socket.emit('whoareyou', pseudo => {
                try {
                    boardServer.addPlayer(socket.id, pseudo);
                    socket.handshake.session.userPseudo = boardServer.findPlayerByPseudo(pseudo).getPseudo();
                    socket.broadcast.emit('message', pseudo + ' a rejoint la partie.');
                    socket.handshake.session.save();
                    console.log("SESSION ENREGISTREE ===>> " + socket.handshake.session.userPseudo);
                    if (boardServer)
                        if(boardServer.gameFull() && !boardServer.hasGameStarted()) 
                            startGame();
                } catch (error) {
                    console.error('[ERROR] => ' + error.message);
                    socket.emit('message', error.messageIhm);
                    socket.disconnect(true);
                }
            });
        }
    } else {
        console.log("SESSION ==>> " + socket.handshake.session.userPseudo);
        socket.emit('message', 'bon retour dans la partie ' + socket.handshake.session.userPseudo);
    }

    // Evenement pour la méthode moveToken
    socket.on('moveToken', function (tokenJson, squareJson, ret) {
        console.log(`[Move token] => token = ` + tokenJson + ' square = ' + squareJson);

        if(boardServer.getStep() === 1) {
            let parsedToken = JSON.parse(tokenJson);
            let parsedSquare = JSON.parse(squareJson);

            try {
                boardServer.moveToken(parsedToken, parsedSquare);
                socket.broadcast.emit('moveToken', tokenJson, squareJson);
                console.log('[OK]');
                ret('ok', {tokenJson: tokenJson, squareJson: squareJson});

                boardServer.advanceStep();
                sendTurnSignal();
            } catch (error) {
                console.error('[ERROR] => ' + error.message);
                ret('error', error.messageIhm);
            }
        } else {
            console.log('[ERROR] => It is not move step.');
            sendTurnSignal(socket);
        }  
    });
    // Positionnementd'un pion
    socket.on('positionToken', (tokenJson, squareJson, ret) => {
        console.log("[Position token] => token = " + tokenJson + " square = " + squareJson);

        if(boardServer.getStep() === 0) {
            let parsedToken = JSON.parse(tokenJson);
            let parsedSquare = JSON.parse(squareJson);
    
            try {
                boardServer.positionToken(parsedToken, parsedSquare);
                socket.broadcast.emit('positionToken', tokenJson, squareJson);
                console.log('[OK]');
                ret('ok', {tokenJson: tokenJson, squareJson: squareJson});

                boardServer.setActivePlayer(boardServer.findOtherPlayer());
                if (boardServer.allTokensArePositionned()) {
                    boardServer.advanceStep();
                }
                sendTurnSignal();
            } catch (error) {
                console.error('[ERROR] => ' + error.message);
                ret('error', error.messageIhm);
            }
        } else {
            console.log('[ERROR] => It is not position step.');
            sendTurnSignal(socket);
        }        
    });
    // Evenement pour la méthode build
    socket.on('build', function (tokenJson, squareJson, ret) {
        console.log("[Build] => token = " + tokenJson + " square = " + squareJson);

        if(boardServer.getStep() === 2) {
            let parsedToken = JSON.parse(tokenJson);
            let parsedSquare = JSON.parse(squareJson);

            try {
                boardServer.build(parsedToken, parsedSquare);
                socket.broadcast.emit('positionToken', tokenJson, squareJson);
                console.log('[OK]');
                ret('ok', {tokenJson: tokenJson, squareJson: squareJson});

                boardServer.setActivePlayer(boardServer.findOtherPlayer());
                boardServer.advanceStep();
                sendTurnSignal();
            } catch (error) {
                console.error('[ERROR] => ' + error.message);
                ret('error', error.messageIhm);
            }
        } else {
            console.log('[ERROR] => It is not buid step.');
            sendTurnSignal(socket);
        }   
    });
    // Evènement pour l'initialisation du jeu
    socket.on('initGame', function (boardJson) {
        if(!boardServer) {
            console.log(`[Init game] => board = ` + boardJson);

            boardServer = BoardServer.parse(JSON.parse(boardJson));
            socket.emit('whoareyou', pseudo => {
                try {
                    boardServer.addPlayer(socket.id, pseudo);
                    socket.handshake.session.userPseudo = boardServer.findPlayerByPseudo(pseudo).getPseudo();
                    socket.broadcast.emit('message', pseudo + ' a rejoint la partie.');
                    socket.handshake.session.save();
                    console.log("SESSION ENREGISTREE ===>> " + socket.handshake.session.userPseudo);
                    if (boardServer)
                        if(boardServer.gameFull() && !boardServer.hasGameStarted())
                            startGame();
                } catch (error) {
                    console.error('[ERROR] => ' + error.message);
                    socket.emit('message', error.messageIhm);
                    socket.disconnect(true);
                }
            });
        }
    })

});

console.log('Server online ...');

function startGame() {
    console.log('La partie commence !');

    // Sans paramètre le joueur actif sera le premier de la liste (donc le créateur de la partie)
    boardServer.setActivePlayer();
    boardServer.setGameStarted(true);

    // Envoyer le signal de tour aux joueurs
    sendTurnSignal();
}

function sendTurnSignal(socket = null) {
    console.log(boardServer.findOtherPlayer().getPseudo());
    io.sockets.connected[boardServer.getActivePlayer().getID()].emit('yourTurn');
    io.sockets.connected[boardServer.findOtherPlayer().getID()].emit('OpponentTurn');

    switch(boardServer.getStep()) {
        case 0:
            if(socket === null)
                io.sockets.emit('positionStep');
            else
                socket.emit('positionStep');
            break;

        case 1:
            if(socket === null)
                io.sockets.emit('moveStep');
            else
                socket.emit('moveStep');
            break;

        case 2:
            if(socket === null)
                io.sockets.emit('buildStep');
            else
                socket.emit('buildStep');
            break;
    }
}
