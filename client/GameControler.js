
var GameControler = GameControler || {};

(function (publics) {
    let privates = {};

    publics.maMethode = function () {

    };

    privates.maMethodePrive = function () {
        return privates.att2;
    };

    publics.att1 = 'salut';

    privates.att2 = 'salut';


}(GameControler));