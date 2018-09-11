"use strict";

// Import des modules node.js

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
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
    resp.sendfile(__dirname + '/client/' + fileName);
});

// Récupère les fichiers Css 
app.get('/css/:fileName', (req, resp) => {
    let ip = req.connection.remoteAddress;
    let fileName = req.params.fileName;
    console.log(`[${ip}] asked for ${fileName}.`);
    resp.sendfile(__dirname + '/css/' + fileName);
});

// Récupère les fichiers dans le dossier images
app.get('/img/:fileName', (req, resp) => {
    let ip = req.connection.remoteAddress;
    let fileName = req.params.fileName;
    console.log(`[${ip}] asked for ${fileName}.`);
    resp.sendfile(__dirname + '/img/' + fileName);
});

// Récupere les fichiers dans le dossier Model
app.get('/model/:fileName', (req, resp) => {
    let ip = req.connection.remoteAddress;
    let fileName = req.params.fileName;
    console.log(`[${ip}] asked for ${fileName}.`);
    resp.sendfile(__dirname + '/model/' + fileName);
});

// -------------------------------------------------------------------------


// WebSocket

// Evenement pour la méthode de Connection
io.on('connection', function (socket) {
    console.log(`An user just connect `);
    socket.emit(`hello`, 'You have been connected !');

    // Evenement pour la méthode moveToken
    socket.on('moveToken', function (tokenJson, squareJson) {
        console.log(`MoveToken => token = ` + tokenJson + ' square = ' + squareJson);

        let token = JSON.parse(tokenJson);
        let square = JSON.parse(squareJson);

        boardServer.moveToken(token, square);
    });
    // Evenement pour la méthode build
    socket.on('build', function (TokenJson, squareJson) {
        console.log(`Ask for building`);
        // En attente du BoardServer
    });
});

console.log('Server online ...');
