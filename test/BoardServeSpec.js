var assert = require('assert');
var BoardServer = require('../BoardServer');

describe('BoardServer', function(){

    describe('checkIfEquals', function(){

        it("should return a boolean telling if the objects given have the same properties values", function() {
            lObj = {att1: 1, att2: 2};
            lObj2 = {att1: 1, att2: 3};
            obj = new (function (){this.att1 = 1; this.att2 = 2;})();
            console.log(typeof lObj + ' / ' + typeof obj);
            assert.equal(BoardServer.checkIfEquals(lObj, lObj), true);
            assert.equal(BoardServer.checkIfEquals(lObj, lObj2), true);
            assert.equal(BoardServer.checkIfEquals(lObj, obj), true);
        });

    });

});