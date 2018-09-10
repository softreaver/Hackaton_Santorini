"use strict";
function SocketIoUtils() {
    let socket = io.connect();

    socket.on('connect_error', error => {
        console.log(error);
    });

    socket.on('moveToken', (tokenJson, squareJson) => {

    });

}
