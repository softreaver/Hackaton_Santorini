
function BoardServer() {
    let activePlayer = [];
    let listPlayers = [];
    let tokens = [];
    let square = [];
    let building = [];


    this.moveToken = function (tokens, square) {
        // Condition si le token n'est pas null
        if (tokens !== null) {
            if (square !== null) {
                if ("le deplacement est null") {
                    console.log(`There is a problem with your deplacement null`);
                } else {
                    if ("Le deplacement est au dessus de 2 - condition +1 -1") {
                        console.log(`You can't move more 1 squares`);
                    } else {
                        console.log(`You're new position is .... `);
                    }

                }
            }
            else {
                console.log(`There is a problem with the square`);
            }
        } else {
            console.log(`There is a problem with the token`);
        }
    }


}
