"use strict";

// Import des modules node.js

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var BoardServer = require('./BoardServer');

var boardServer = new BoardServer();

// On va écouter sur le port 80
server.listen(80);

// Route, mappage
// Ajout d'une route a Express ? 
app.get("/", (req, resp) => {
    let ip = req.connection.remoteAddress;
    console.log(`[${ip}] asked for index.html.`);
    fs.readFile(`views/test.html`, `utf-8`, function (error, content) {
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

// Evenement pour la méthode de Connection
io.on('connection', function (socket) {
    console.log(`An user just connect `);

    // Evenement pour la méthode moveToken
    socket.on('moveToken', function (tokenJson, squareJson, ret) {
        console.log(`[Move token] => token = ` + tokenJson + ' square = ' + squareJson);

        let parsedToken = JSON.parse(tokenJson);
        let parsedSquare = JSON.parse(squareJson);

        try {
            boardServer.moveToken(parsedToken, parsedSquare);
            socket.broadcast.emit('moveToken', tokenJson, squareJson);
            console.log('[OK]');
            ret('ok', {tokenJson: tokenJson, squareJson: squareJson});
        } catch (error) {
            console.error('[ERROR] => ' + error.message);
            ret('error', error.messageIhm);
        }
    });
    // Positionnementd'un pion
    socket.on('positionToken', (tokenJson, squareJson, ret) => {
        console.log("[Position token] => token = " + tokenJson + " square = " + squareJson);

        let parsedToken = JSON.parse(tokenJson);
        let parsedSquare = JSON.parse(squareJson);

        try {
            boardServer.positionToken(parsedToken, parsedSquare);
            socket.broadcast.emit('positionToken', tokenJson, squareJson);
            console.log('[OK]');
            ret('ok', {tokenJson: tokenJson, squareJson: squareJson});
        } catch (error) {
            console.error('[ERROR] => ' + error.message);
            ret('error', error.messageIhm);
        }
    });
    // Evenement pour la méthode build
    socket.on('build', function (tokenJson, squareJson, ret) {
        console.log("[Build] => token = " + tokenJson + " square = " + squareJson);

        let parsedToken = JSON.parse(tokenJson);
        let parsedSquare = JSON.parse(squareJson);

        try {
            boardServer.build(parsedToken, parsedSquare);
            socket.broadcast.emit('positionToken', tokenJson, squareJson);
            console.log('[OK]');
            ret('ok', {tokenJson: tokenJson, squareJson: squareJson});
        } catch (error) {
            console.error('[ERROR] => ' + error.message);
            ret('error', error.messageIhm);
        }
    });
    // Evènement pour l'initialisation du jeu
    socket.on('initGame', function (boardJson) {
        console.log(`[Init game] => board = ` + boardJson);

        boardServer = BoardServer.parse(JSON.parse(boardJson));
    })
});

console.log('Server online ...');
